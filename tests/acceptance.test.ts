import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { createProject } from "../src/lib/storage/project-store";
import { CodingAgent, validateCode } from "../src/lib/agent/coding-agent";

describe("Rule 9: Final Acceptance Test Sequence (A through K)", () => {
  let project: ReturnType<typeof createProject>;
  let agent: CodingAgent;
  let diskPath: string;

  it("A. Create a new project", () => {
    project = createProject({
      name: "Acceptance Test App",
      description: "Automated Acceptance Verification Project for Lovable/Bolt AI Builder",
    });
    agent = new CodingAgent(project);
    diskPath = path.join(process.cwd(), "storage/projects", project.id, "src/App.tsx");

    console.log(`[STEP A] Project created with ID: ${project.id}, Name: ${project.name}`);
    expect(project.id).toBeTruthy();
    expect(fs.existsSync(path.join(process.cwd(), "storage/projects", project.id))).toBe(true);
  });

  it("B. Ask the builder to generate a simple working React application", async () => {
    const events: any[] = [];
    const prompt = "Create a modern Counter and Todo React application with interactive buttons and a clear heading 'NovaForge Task Master'.";
    
    console.log(`[STEP B] Sending prompt to agent in 'code' mode: "${prompt}"`);
    const startTime = Date.now();
    const genResponse = await agent.runAgentLoop(
      prompt,
      (e) => {
        events.push(e);
        if (e.type === "status") {
          console.log(`  [Agent Status]: ${e.payload.step} - ${e.payload.message}`);
        }
      },
      "code"
    );
    const duration = Date.now() - startTime;
    console.log(`[STEP B] Generation finished in ${duration}ms. Response characters: ${genResponse.length}`);

    expect(genResponse.length).toBeGreaterThan(50);
    const completeEvent = events.find((e) => e.type === "complete");
    expect(completeEvent).toBeDefined();
    expect(completeEvent.payload.isHealthy).toBe(true);
  }, 90000);

  it("C. Verify that real source files were created on disk", () => {
    const fileExists = fs.existsSync(diskPath);
    console.log(`[STEP C] Checking disk path: ${diskPath}`);
    console.log(`[STEP C] File exists on disk: ${fileExists}`);
    expect(fileExists).toBe(true);

    const diskCode = fs.readFileSync(diskPath, "utf8");
    console.log(`[STEP C] Disk code size: ${diskCode.length} bytes`);
    expect(diskCode.length).toBeGreaterThan(50);

    const validation = validateCode(diskCode, "src/App.tsx");
    console.log(`[STEP C] Syntax validation valid: ${validation.valid}, error: ${validation.error || "none"}`);
    expect(validation.valid).toBe(true);
  });

  it("D & E. Verify dev server is running and preview displays the application", async () => {
    const previewUrl = `http://localhost:3000/preview/${project.id}`;
    console.log(`[STEP D & E] Fetching preview from ${previewUrl}`);

    const res = await fetch(previewUrl);
    console.log(`[STEP D & E] Preview HTTP Status: ${res.status} ${res.statusText}`);
    expect(res.status).toBe(200);

    const html = await res.text();
    console.log(`[STEP D & E] Preview HTML size: ${html.length} bytes`);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("App.tsx");
    expect(html).toContain("Preview");
  });

  it("F & G. Ask the builder to change a visible heading & verify source file changes", async () => {
    const targetHeading = "ACCEPTANCE TEST HEADING V2";
    const prompt = `Change the main heading to '${targetHeading}' and keep all existing counters and features intact.`;
    
    console.log(`[STEP F] Asking agent to update heading: "${prompt}"`);
    await agent.runAgentLoop(
      prompt,
      (e) => {
        if (e.type === "status") {
          console.log(`  [Agent Status]: ${e.payload.step} - ${e.payload.message}`);
        }
      },
      "code"
    );

    console.log(`[STEP G] Reading updated code from disk: ${diskPath}`);
    const updatedDiskCode = fs.readFileSync(diskPath, "utf8");
    const containsNewHeading = updatedDiskCode.includes(targetHeading);
    console.log(`[STEP G] Disk code contains '${targetHeading}': ${containsNewHeading}`);
    expect(containsNewHeading).toBe(true);

    const validation = validateCode(updatedDiskCode, "src/App.tsx");
    expect(validation.valid).toBe(true);
  }, 45000);

  it("H. Verify that the preview reflects the new heading", async () => {
    const previewUrl = `http://localhost:3000/preview/${project.id}?t=${Date.now()}`;
    console.log(`[STEP H] Fetching preview with timestamp cache-buster: ${previewUrl}`);

    const res = await fetch(previewUrl);
    console.log(`[STEP H] HTTP Status: ${res.status}`);
    expect(res.status).toBe(200);

    const html = await res.text();
    const hasHeadingInHtml = html.includes("ACCEPTANCE TEST HEADING V2");
    console.log(`[STEP H] Preview HTML contains 'ACCEPTANCE TEST HEADING V2': ${hasHeadingInHtml}`);
    expect(hasHeadingInHtml).toBe(true);
  });

  it("I. Introduce a small, controlled syntax error in a test project", () => {
    const brokenCode = `import React from 'react';\nexport default function App() {\n  return <div><h1>Broken Header<;\n}`;
    console.log("[STEP I] Writing deliberately broken syntax to project App.tsx");
    agent.executeTool("write_file", { path: "src/App.tsx", content: brokenCode });

    const status = agent.executeTool("get_preview_status", {});
    console.log(`[STEP I] get_preview_status: healthy=${status.result.healthy}, error="${status.result.error}"`);
    expect(status.result.healthy).toBe(false);
    expect(status.result.status).toBe("error");
    expect(status.result.error).toBeDefined();
  });

  it("J. Ask the builder to repair it (Self-Repair in debug mode)", async () => {
    const previewStatus = agent.executeTool("get_preview_status", {});
    const repairPrompt = `Diagnose and repair runtime syntax error in src/App.tsx: ${previewStatus.result.error} at line ${previewStatus.result.line}`;

    console.log(`[STEP J] Triggering self-repair with prompt: "${repairPrompt}"`);
    const events: any[] = [];
    await agent.runAgentLoop(
      repairPrompt,
      (e) => {
        events.push(e);
        if (e.type === "status") {
          console.log(`  [Agent Repair Status]: ${e.payload.step} - ${e.payload.message}`);
        }
      },
      "debug"
    );

    const readyEvent = events.find((e) => e.type === "status" && e.payload.step === "ready");
    console.log(`[STEP J] Agent emitted 'ready' event: ${Boolean(readyEvent)}`);
    expect(readyEvent).toBeDefined();
  }, 90000);

  it("K. Verify that the error disappears and the application runs again", async () => {
    console.log("[STEP K] Verifying post-repair status");
    const postRepairStatus = agent.executeTool("get_preview_status", {});
    console.log(`[STEP K] Preview status healthy: ${postRepairStatus.result.healthy}`);
    expect(postRepairStatus.result.healthy).toBe(true);
    expect(postRepairStatus.result.status).toBe("running");

    const repairedDiskCode = fs.readFileSync(diskPath, "utf8");
    const valK = validateCode(repairedDiskCode, "src/App.tsx");
    console.log(`[STEP K] Disk code syntax valid: ${valK.valid}, error: ${valK.error || "none"}`);
    expect(valK.valid).toBe(true);

    const previewRes = await fetch(`http://localhost:3000/preview/${project.id}?t=${Date.now()}`);
    console.log(`[STEP K] Final preview HTTP Status: ${previewRes.status}`);
    expect(previewRes.status).toBe(200);

    console.log(">>> FINAL ACCEPTANCE TEST: ALL STEPS A THROUGH K COMPLETED SUCCESSFULLY <<<");
  });
});
