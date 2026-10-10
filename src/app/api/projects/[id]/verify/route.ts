import { NextResponse } from "next/server";
import { getProject } from "@/lib/storage/project-store";
import { verifyPreviewWithPlaywright } from "@/lib/testing/playwright-verifier";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const project = getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const baseUrl = searchParams.get("baseUrl") || "http://localhost:3000";

    const result = await verifyPreviewWithPlaywright(id, baseUrl);
    return NextResponse.json({
      projectId: id,
      projectName: project.name,
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

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
    const baseUrl = body.baseUrl || "http://localhost:3000";

    const result = await verifyPreviewWithPlaywright(id, baseUrl);
    return NextResponse.json({
      projectId: id,
      projectName: project.name,
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
