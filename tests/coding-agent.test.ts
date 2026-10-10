import { describe, it, expect, vi } from "vitest";
import { createProject } from "../src/lib/storage/project-store";
import { CodingAgent } from "../src/lib/agent/coding-agent";
import { aiGateway } from "../src/lib/providers/ai-gateway";

describe("Coding Agent & Structured Tool Execution", () => {
  it("should execute list_files and inspect_project tools", () => {
    const project = createProject({ name: "Tool Test App" });
    const agent = new CodingAgent(project);

    const inspectRes = agent.executeTool("inspect_project", {});
    expect(inspectRes.result.name).toBe("Tool Test App");
    expect(inspectRes.result.totalFiles).toBeGreaterThan(0);

    const listRes = agent.executeTool("list_files", {});
    expect(Array.isArray(listRes.result)).toBe(true);
    expect(listRes.result.some((f: any) => f.path === "src/App.tsx")).toBe(true);
  });

  it("should write files and apply targeted surgical patches", () => {
    const project = createProject({ name: "Patch Test App" });
    const agent = new CodingAgent(project);

    // 1. Write file
    const writeRes = agent.executeTool("write_file", {
      path: "src/components/Banner.tsx",
      content: "export function Banner() { return <div>Hello World</div>; }",
    });
    expect(writeRes.filesModified).toContain("src/components/Banner.tsx");
    expect(project.files["src/components/Banner.tsx"]).toContain("Hello World");

    // 2. Apply patch
    const patchRes = agent.executeTool("apply_patch", {
      path: "src/components/Banner.tsx",
      targetText: "Hello World",
      replacementText: "Hello NOVAFORGE",
    });
    expect(patchRes.filesModified).toContain("src/components/Banner.tsx");
    expect(project.files["src/components/Banner.tsx"]).toContain("Hello NOVAFORGE");
  });

  it("should create and restore checkpoints", () => {
    const project = createProject({ name: "Checkpoint Test App" });
    const agent = new CodingAgent(project);

    // Create checkpoint
    const cpRes = agent.executeTool("create_checkpoint", {
      name: "Pre-Refactor Checkpoint",
      description: "Saved before large modifications",
    });
    expect(cpRes.result).toContain("Pre-Refactor Checkpoint");

    const checkpointId = project.checkpoints[0].id;

    // Mutate file
    project.files["src/App.tsx"] = "// mutated code";

    // Restore checkpoint
    const restoreRes = agent.executeTool("restore_checkpoint", {
      checkpointId,
    });
    expect(restoreRes.result).toContain("Restored project");
    expect(project.files["src/App.tsx"]).not.toBe("// mutated code");
  });

  it("should extract code files across all header formats and line endings", () => {
    const project = createProject({ name: "Extractor Test App" });
    const agent = new CodingAgent(project);

    // 1. Colon format with CRLF
    const text1 = "```tsx:src/components/Modal.tsx\r\nexport function Modal() { return <div>Modal</div>; }\r\n```";
    const res1 = agent.extractCodeFiles(text1);
    expect(res1).toHaveLength(1);
    expect(res1[0].path).toBe("src/components/Modal.tsx");
    expect(res1[0].content).toContain("Modal");

    // 2. Space format and filename attribute
    const text2 = '```tsx filename="src/components/Badge.tsx"\nexport function Badge() { return <span>Gold</span>; }\n```';
    const res2 = agent.extractCodeFiles(text2);
    expect(res2).toHaveLength(1);
    expect(res2[0].path).toBe("src/components/Badge.tsx");

    // 3. Comment inside code block
    const text3 = "```tsx\n// File: src/components/Card.tsx\nexport function Card() { return <div>Card</div>; }\n```";
    const res3 = agent.extractCodeFiles(text3);
    expect(res3).toHaveLength(1);
    expect(res3[0].path).toBe("src/components/Card.tsx");

    // 4. Generic tsx block mapping to active file (src/App.tsx)
    const text4 = "Here is the code:\n```tsx\nimport React from 'react';\nexport default function App() {\n  return <div>App</div>;\n}\n```";
    const res4 = agent.extractCodeFiles(text4);
    expect(res4).toHaveLength(1);
    expect(res4[0].path).toBe("src/App.tsx");
    expect(res4[0].content).toContain("return <div>App</div>");

    // 5. Generic CSS block mapping to index.css in Vite project
    const text5 = "```css\n.custom-class { color: red; }\n```";
    const res5 = agent.extractCodeFiles(text5);
    expect(res5).toHaveLength(1);
    expect(res5[0].path).toBe("src/index.css");
  });

  it("should automatically update project files when runAgentLoop processes code", async () => {
    const project = createProject({ name: "Auto Apply App" });
    const agent = new CodingAgent(project);
    const initialAppCode = project.files["src/App.tsx"];

    // Mock chatCompletionStream to test agent loop integration deterministically
    vi.spyOn(aiGateway, "chatCompletionStream").mockImplementationOnce(async ({ onChunk }) => {
      const codeChunk = "I have updated the application.\n\n```tsx:src/App.tsx\nexport default function App() { return <div>NovaForge SaaS Active</div>; }\n```";
      onChunk(codeChunk);
      return { fullText: codeChunk, tokensEstimated: 45 };
    });

    const events: any[] = [];
    await agent.runAgentLoop(
      "Build a modern SaaS dashboard with PostgreSQL & Stripe",
      (event) => events.push(event),
      "code"
    );

    // Verify file_changed event was fired
    const fileChangedEvents = events.filter((e) => e.type === "file_changed");
    expect(fileChangedEvents.length).toBeGreaterThan(0);
    expect(fileChangedEvents[0].payload.path).toBe("src/App.tsx");

    // Verify complete event has updated project
    const completeEvent = events.find((e) => e.type === "complete");
    expect(completeEvent).toBeDefined();
    expect(completeEvent.payload.project).toBeDefined();

    // Verify project.files['src/App.tsx'] was directly updated
    expect(project.files["src/App.tsx"]).not.toBe(initialAppCode);
    expect(project.files["src/App.tsx"]).toContain("NovaForge SaaS Active");
  });
});
