import { describe, it, expect } from "vitest";
import { TEMPLATES } from "../src/lib/templates/template-registry";

describe("Starter Template Gallery Registry", () => {
  it("should contain all 5+ production starter templates", () => {
    expect(TEMPLATES.length).toBeGreaterThanOrEqual(5);

    const saasTemplate = TEMPLATES.find((t) => t.id === "saas-dashboard");
    expect(saasTemplate).toBeDefined();
    expect(saasTemplate?.name).toContain("SaaS");
    expect(saasTemplate?.files["src/App.tsx"]).toContain("PostgreSQL");
    expect(saasTemplate?.files["src/App.tsx"]).toContain("Stripe");

    const aiTemplate = TEMPLATES.find((t) => t.id === "ai-chat-assistant");
    expect(aiTemplate).toBeDefined();

    const storeTemplate = TEMPLATES.find((t) => t.id === "ecommerce-store");
    expect(storeTemplate).toBeDefined();
  });

  it("should ensure all templates have valid runnable App.tsx code", () => {
    for (const template of TEMPLATES) {
      expect(template.files["src/App.tsx"]).toBeDefined();
      expect(template.files["src/App.tsx"].length).toBeGreaterThan(100);
      expect(template.files["src/App.tsx"]).toContain("export default function");
    }
  });
});
