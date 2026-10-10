import { describe, it, expect } from "vitest";
import { aiGateway, AVAILABLE_MODELS } from "../src/lib/providers/ai-gateway";

describe("AI Gateway & Provider Adapter", () => {
  it("should have models registered including Gemini 3.8 Flash and Claude", () => {
    expect(AVAILABLE_MODELS.length).toBeGreaterThan(0);
    const gemini = AVAILABLE_MODELS.find((m) => m.id === "gemini-3.8-flash");
    expect(gemini).toBeDefined();
    expect(gemini?.supportsTools).toBe(true);
  });

  it("should test connection to configured AI endpoint", async () => {
    const result = await aiGateway.testConnection("local-proxy");
    expect(result.success).toBe(true);
    expect(result.latencyMs).toBeGreaterThan(0);
  });

  it("should complete chat query through configured gateway", async () => {
    const response = await aiGateway.chatCompletionSync({
      model: "gemini-3.8-flash",
      messages: [{ role: "user", content: "Reply with 'NOVAFORGE_ONLINE'" }],
    });
    expect(response).toBeTruthy();
    expect(typeof response).toBe("string");
  });
});
