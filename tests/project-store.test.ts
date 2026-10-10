import { describe, it, expect } from "vitest";
import { createProject, getProject, saveProject, deleteProject } from "../src/lib/storage/project-store";

describe("Project Store Service", () => {
  it("should create a new project with default files and checkpoints", () => {
    const project = createProject({
      name: "Test SaaS App",
      description: "A test project",
      framework: "react-vite",
    });

    expect(project).toBeDefined();
    expect(project.id).toBeTruthy();
    expect(project.name).toBe("Test SaaS App");
    expect(project.files["src/App.tsx"]).toContain("Test SaaS App");
    expect(project.checkpoints.length).toBeGreaterThanOrEqual(1);
    expect(project.checkpoints[0].name).toBe("Initial scaffold");
  });

  it("should retrieve and update project correctly", () => {
    const project = createProject({ name: "Update Test" });
    project.files["src/utils.ts"] = "export const add = (a: number, b: number) => a + b;";
    saveProject(project);

    const fetched = getProject(project.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.files["src/utils.ts"]).toBe("export const add = (a: number, b: number) => a + b;");
  });

  it("should delete project properly", () => {
    const project = createProject({ name: "To Delete" });
    const success = deleteProject(project.id);
    expect(success).toBe(true);

    const check = getProject(project.id);
    expect(check).toBeNull();
  });
});
