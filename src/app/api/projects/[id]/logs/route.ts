import { NextResponse } from "next/server";
import { getProject, getProjectLogs, addProjectLog, clearProjectLogs } from "@/lib/storage/project-store";

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
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const level = searchParams.get("level");

    let logs = getProjectLogs(id, limit);
    if (level) {
      logs = logs.filter((l) => l.level === level);
    }

    return NextResponse.json({
      projectId: id,
      count: logs.length,
      logs,
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

    const body = await req.json();
    const { level, message, source, timestamp } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const createdLog = addProjectLog(id, {
      level: level || "info",
      message: String(message),
      source: source || "browser",
      timestamp: timestamp || new Date().toISOString(),
    });

    return NextResponse.json({ success: true, log: createdLog }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const cleared = clearProjectLogs(id);
    return NextResponse.json({ success: cleared });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
