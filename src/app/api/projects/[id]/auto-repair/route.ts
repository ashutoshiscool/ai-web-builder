import { NextResponse } from "next/server";
import { getProject } from "@/lib/storage/project-store";
import { runAutonomousPlaywrightRepair } from "@/lib/agent/auto-repair";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const project = getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const maxIterations = typeof body.maxIterations === "number" ? body.maxIterations : 5;
    const baseUrl = body.baseUrl || "http://localhost:3000";

    const repairResult = await runAutonomousPlaywrightRepair({
      projectId: id,
      maxIterations,
      baseUrl,
    });

    return NextResponse.json({
      projectId: id,
      projectName: project.name,
      ...repairResult,
    });
  } catch (err: any) {
    console.error("Auto-repair error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
