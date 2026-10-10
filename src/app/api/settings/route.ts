import { NextResponse } from "next/server";
import { AVAILABLE_MODELS, aiGateway } from "@/lib/providers/ai-gateway";

export async function GET() {
  return NextResponse.json({
    models: AVAILABLE_MODELS,
    providers: [
      { id: "local-proxy", name: "NOVAFORGE Built-in Gateway (High Speed)", status: "connected" },
      { id: "openai", name: "OpenAI Official (GPT-4o, o3)", status: "available" },
      { id: "anthropic", name: "Anthropic Claude (Sonnet 3.7)", status: "available" },
      { id: "gemini", name: "Google Gemini (Flash, Pro)", status: "available" },
      { id: "openrouter", name: "OpenRouter Unified Gateway", status: "available" },
      { id: "ollama", name: "Ollama Local (Offline)", status: "available" },
    ],
  });
}

export async function POST(req: Request) {
  try {
    const { action, provider, apiKey, baseUrl } = await req.json();

    if (action === "test-connection") {
      const result = await aiGateway.testConnection(provider, apiKey, baseUrl);
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
