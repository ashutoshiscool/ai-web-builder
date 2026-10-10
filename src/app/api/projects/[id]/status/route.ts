import { NextResponse } from "next/server";
import { getProject } from "@/lib/storage/project-store";
import { validateCode } from "@/lib/agent/coding-agent";

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

    const files = project.files || {};
    const fileStats: Array<{
      path: string;
      sizeBytes: number;
      lines: number;
      valid: boolean;
      error?: string;
    }> = [];

    const syntaxErrors: string[] = [];

    for (const [filePath, content] of Object.entries(files)) {
      const lines = content.split("\n").length;
      const sizeBytes = Buffer.byteLength(content, "utf8");
      const check = validateCode(content, filePath);

      if (!check.valid) {
        syntaxErrors.push(`${filePath}:${check.line || 1}:${check.column || 1} - ${check.error}`);
      }

      fileStats.push({
        path: filePath,
        sizeBytes,
        lines,
        valid: check.valid,
        error: check.error,
      });
    }

    const allFilesValid = syntaxErrors.length === 0;
    const errorLogsCount = (project.logs || []).filter((l) => l.level === "error").length;

    return NextResponse.json({
      projectId: project.id,
      name: project.name,
      description: project.description,
      framework: project.framework,
      activeFile: project.activeFile,
      updatedAt: project.updatedAt,
      allFilesValid,
      syntaxErrors,
      files: fileStats,
      totalFiles: fileStats.length,
      checkpointsCount: project.checkpoints?.length || 0,
      conversationsCount: project.conversations?.length || 0,
      logsCount: project.logs?.length || 0,
      errorLogsCount,
      settings: project.settings,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
