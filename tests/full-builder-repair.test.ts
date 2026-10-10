import { describe, it, expect, vi } from "vitest";
import fs from "fs";
import path from "path";
import { createProject, getProject } from "../src/lib/storage/project-store";
import { CodingAgent, validateCode } from "../src/lib/agent/coding-agent";
import { aiGateway } from "../src/lib/providers/ai-gateway";

describe("Critical Builder Verification & Self-Repair Loop (RULE 8)", () => {
  // 1. The configured AI provider returns a real response
  it("1. Configured AI provider returns real response", async () => {
    const reply = await aiGateway.chatCompletionSync({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: "Reply with 'PROVIDER_ACTIVE'" }],
    });
    expect(reply).toBeTruthy();
    expect(typeof reply).toBe("string");
    expect(reply.length).toBeGreaterThan(0);
  }, 20000);

  // 2. An agent tool call can read a project file
  it("2. Agent tool call can read a project file", () => {
    const project = createProject({ name: "Tool Read App" });
    const agent = new CodingAgent(project);

    const readRes = agent.executeTool("read_file", { path: "src/App.tsx" });
    expect(readRes.result).toBeTruthy();
    expect(typeof readRes.result).toBe("string");
    expect(readRes.result).toContain("export default function App()");
  });

  // 3. An agent tool call can modify a project file
  it("3. Agent tool call can modify a project file", () => {
    const project = createProject({ name: "Tool Modify App" });
    const agent = new CodingAgent(project);

    const newCode = `import React from 'react';\nexport default function App() { return <h1>Modified Header</h1>; }`;
    const writeRes = agent.executeTool("write_file", {
      path: "src/App.tsx",
      content: newCode,
    });

    expect(writeRes.filesModified).toContain("src/App.tsx");
    expect(project.files["src/App.tsx"]).toBe(newCode);
  });

  // 4. The modification persists on disk
  it("4. The modification persists on disk", () => {
    const project = createProject({ name: "Disk Persistence App" });
    const agent = new CodingAgent(project);

    const newCode = `import React from 'react';\nexport default function App() { return <div id="persisted">Persisted Code</div>; }`;
    agent.executeTool("write_file", {
      path: "src/App.tsx",
      content: newCode,
    });

    const diskPath = path.join(process.cwd(), "storage/projects", project.id, "src/App.tsx");
    expect(fs.existsSync(diskPath)).toBe(true);
    const diskContent = fs.readFileSync(diskPath, "utf8");
    expect(diskContent).toBe(newCode);

    // Also verify getProject reloads directly from disk
    const reloaded = getProject(project.id);
    expect(reloaded?.files["src/App.tsx"]).toBe(newCode);
  });

  // 5. A valid starter application starts successfully
  it("5. A valid starter application has clean syntax and valid entrypoint", () => {
    const project = createProject({ name: "Starter App" });
    const starterCode = project.files["src/App.tsx"];
    expect(starterCode).toBeTruthy();

    const validation = validateCode(starterCode, "src/App.tsx");
    expect(validation.valid).toBe(true);
    expect(validation.error).toBeUndefined();
  });

  // 6. The preview URL returns a successful response
  it("6. The preview URL returns a successful HTTP response", async () => {
    const project = createProject({ name: "Preview HTTP App" });
    const res = await fetch(`http://localhost:3000/preview/${project.id}`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Preview");
    expect(html).toContain("<!DOCTYPE html>");
  });

  // 7. A deliberately introduced syntax error is detected
  it("7. A deliberately introduced syntax error is detected", () => {
    const brokenCode = `import React from 'react';\nexport default function App() { return <div>Unclosed Tag;\n}`;
    const validation = validateCode(brokenCode, "src/App.tsx");
    expect(validation.valid).toBe(false);
    expect(validation.error).toBeDefined();
    expect(typeof validation.line).toBe("number");
  });

  // 8. The agent receives that actual error
  it("8. The agent tools detect the actual error and report failure", () => {
    const project = createProject({ name: "Error Detection App" });
    const agent = new CodingAgent(project);

    // Inject broken code
    const brokenCode = `import React from 'react';\nexport default function App() {\n  return <h1>Broken Code<;\n}`;
    agent.executeTool("write_file", { path: "src/App.tsx", content: brokenCode });

    // get_preview_status must detect failure
    const previewStatus = agent.executeTool("get_preview_status", {});
    expect(previewStatus.result.healthy).toBe(false);
    expect(previewStatus.result.status).toBe("error");
    expect(previewStatus.result.error).toBeDefined();

    // run_command must report exit code 1
    const runRes = agent.executeTool("run_command", { command: "check" });
    expect(runRes.result).toContain("Diagnostic check failed with exit code 1");
  });

  // 9 & 10. The agent repairs the syntax error and the application becomes runnable
  it("9 & 10. The agent repairs the syntax error and application becomes runnable", async () => {
    const project = createProject({ name: "Self Repair App" });
    const agent = new CodingAgent(project);

    // Initial broken code
    const brokenCode = `import React, { useState } from 'react';\nexport default function App() {\n  return <div><h1 className="text-xl">Repair Me</h1>;\n}`;
    agent.executeTool("write_file", { path: "src/App.tsx", content: brokenCode });

    // Initial check: broken
    const initialStatus = agent.executeTool("get_preview_status", {});
    expect(initialStatus.result.healthy).toBe(false);

    // Ask agent to repair in debug mode
    const events: any[] = [];
    await agent.runAgentLoop(
      `Diagnose and repair runtime syntax error in src/App.tsx: Unexpected token, expected "}"`,
      (e) => events.push(e),
      "debug"
    );

    // Check that repaired code is valid and runnable
    const repairedCode = project.files["src/App.tsx"];
    const validation = validateCode(repairedCode, "src/App.tsx");
    expect(validation.valid).toBe(true);

    const postStatus = agent.executeTool("get_preview_status", {});
    expect(postStatus.result.healthy).toBe(true);
    expect(postStatus.result.status).toBe("running");

    // Verify ready status was emitted
    const readyEvent = events.find((e) => e.type === "status" && e.payload.step === "ready");
    expect(readyEvent).toBeDefined();
  }, 60000);

  // 11. A failed provider request is shown as an error
  it("11. A failed provider request is surfaced as an error without fake success", async () => {
    const project = createProject({ name: "Fail Test App" });
    const agent = new CodingAgent(project);

    // Mock provider to simulate complete network failure
    vi.spyOn(aiGateway, "chatCompletionStream").mockRejectedValue(new Error("Network connection refused"));
    vi.spyOn(aiGateway, "chatCompletionSync").mockRejectedValue(new Error("Network connection refused"));

    await expect(
      agent.runAgentLoop(
        "Build a feature",
        () => {},
        "code"
      )
    ).rejects.toThrow(/AI Provider Error/);
  });

  // 12. The agent does not report success when verification fails
  it("12. The agent does not report success when verification fails", async () => {
    const project = createProject({ name: "Fail Verification App" });
    const agent = new CodingAgent(project);

    // Mock stream to generate permanently broken code that cannot be parsed
    vi.spyOn(aiGateway, "chatCompletionStream").mockImplementation(async ({ onChunk }) => {
      const brokenText = "```tsx:src/App.tsx\nexport default function App() { return <div>Broken<<<\n```";
      onChunk(brokenText);
      return { fullText: brokenText, tokensEstimated: 10 };
    });
    vi.spyOn(aiGateway, "chatCompletionSync").mockImplementation(async () => {
      return "```tsx:src/App.tsx\nexport default function App() { return <div>Still Broken<<<\n```";
    });

    const events: any[] = [];
    await agent.runAgentLoop(
      "Build a broken component",
      (e) => events.push(e),
      "code"
    );

    // Check complete event: isHealthy must be false
    const completeEvent = events.find((e) => e.type === "complete");
    expect(completeEvent).toBeDefined();
    expect(completeEvent.payload.isHealthy).toBe(false);

    // Check error status event was emitted
    const errorStatus = events.find((e) => e.type === "status" && e.payload.step === "error");
    expect(errorStatus).toBeDefined();

    // Must NOT have a ready event
    const readyEvent = events.find((e) => e.type === "status" && e.payload.step === "ready");
    expect(readyEvent).toBeUndefined();
  }, 45000);
});
