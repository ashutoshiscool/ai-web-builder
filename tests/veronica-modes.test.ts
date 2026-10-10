import { describe, it, expect } from "vitest";
import { VERONICA_MODES } from "../src/lib/agent/coding-agent";
import { createProject, getProject } from "../src/lib/storage/project-store";

describe("Veronica 5 Modes & Personas", () => {
  it("should define exactly the 5 requested modes", () => {
    const modeKeys = Object.keys(VERONICA_MODES);
    expect(modeKeys.sort()).toEqual(["architect", "ask", "code", "debug", "orchestrator"].sort());
    expect(modeKeys).toHaveLength(5);
  });

  it("should have correct persona prompt for architect mode", () => {
    const architect = VERONICA_MODES.architect;
    expect(architect.personaPrompt).toBe(
      "You are veronica, the world's elite Frontend Website Architect and UI/UX Lead Engineer. Your mission is to conceptualize and immediately engineer stunning, complete, responsive, production-ready frontend websites and web applications."
    );
  });

  it("should have correct persona prompt for code mode", () => {
    const code = VERONICA_MODES.code;
    expect(code.personaPrompt).toBe(
      "You are veronica, a world-class Frontend Engineer specializing in crafting modern, high-performance web applications using React 19, TypeScript, Tailwind CSS, and Lucide React."
    );
  });

  it("should have correct persona prompt for ask mode", () => {
    const ask = VERONICA_MODES.ask;
    expect(ask.personaPrompt).toBe(
      "You are veronica, an expert Frontend Technical Specialist answering questions about modern web architecture, React 19, Tailwind CSS, component patterns, and UI design."
    );
  });

  it("should have correct persona prompt for debug mode", () => {
    const debug = VERONICA_MODES.debug;
    expect(debug.personaPrompt).toBe(
      "You are veronica, an expert Frontend Runtime & Console Debugger specializing in zero-error React web applications."
    );
  });

  it("should have correct persona prompt for orchestrator mode", () => {
    const orchestrator = VERONICA_MODES.orchestrator;
    expect(orchestrator.personaPrompt).toBe(
      "You are veronica, a strategic Frontend Systems Orchestrator coordinating complex multi-page and multi-feature web application development."
    );
  });

  it("should initialize new project with architect mode as default", () => {
    const project = createProject({ name: "Modes Verification App" });
    expect(project.settings.agentMode).toBe("architect");
    expect(project.conversations[0].content).toContain("veronica");
  });
});
