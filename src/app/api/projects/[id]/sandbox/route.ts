import { NextResponse } from "next/server";
import { getProject, getSandboxStatus, setSandboxStatus, clearProjectLogs, getProjectLogs, addProjectLog } from "@/lib/storage/project-store";

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

    const status = getSandboxStatus(id);
    const logs = getProjectLogs(id, 50);

    return NextResponse.json({
      projectId: id,
      status,
      isRunning: status === "running",
      lastRestarted: project.lastSandboxRestart || null,
      logsCount: logs.length,
      errorsCount: logs.filter((l) => l.level === "error").length,
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
    const action = body.action || "restart";

    if (action === "stop") {
      setSandboxStatus(id, "stopped");
      addProjectLog(id, {
        level: "warn",
        message: "Sandbox environment stopped / execution paused.",
        source: "browser",
      });
      return NextResponse.json({ success: true, action: "stop", status: "stopped" });
    }

    if (action === "start") {
      setSandboxStatus(id, "running");
      addProjectLog(id, {
        level: "info",
        message: "Sandbox environment started / resumed.",
        source: "browser",
      });
      return NextResponse.json({ success: true, action: "start", status: "running" });
    }

    if (action === "restart") {
      setSandboxStatus(id, "running");
      addProjectLog(id, {
        level: "info",
        message: "Sandbox environment restarted and recompiled.",
        source: "browser",
      });
      return NextResponse.json({
        success: true,
        action: "restart",
        status: "running",
        restartedAt: new Date().toISOString(),
      });
    }

    if (action === "clear_logs") {
      clearProjectLogs(id);
      return NextResponse.json({ success: true, action: "clear_logs" });
    }

    return NextResponse.json({ error: `Unknown sandbox action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
