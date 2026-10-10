import { NextResponse } from "next/server";
import { AVAILABLE_MODELS } from "@/lib/providers/ai-gateway";

export async function GET() {
  return NextResponse.json({
    models: AVAILABLE_MODELS,
    count: AVAILABLE_MODELS.length,
    geminiCount: AVAILABLE_MODELS.filter((m) => m.category === "Google Gemini").length,
  });
}
