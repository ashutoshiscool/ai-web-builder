import { describe, it, expect } from "vitest";
import { createProject } from "../src/lib/storage/project-store";
import { CodingAgent } from "../src/lib/agent/coding-agent";

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
});
