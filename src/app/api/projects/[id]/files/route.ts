import { NextResponse } from "next/server";
import { getProject, saveProject } from "@/lib/storage/project-store";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");

  if (filePath) {
    const content = project.files[filePath];
    if (content === undefined) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    return NextResponse.json({ path: filePath, content });
  }

  return NextResponse.json({
    files: Object.keys(project.files).map((p) => ({
      path: p,
      sizeBytes: Buffer.byteLength(project.files[p], "utf8"),
    })),
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const { path: filePath, content } = await req.json();

    if (!filePath || content === undefined) {
      return NextResponse.json({ error: "path and content are required" }, { status: 400 });
    }

    // Path traversal check
    if (filePath.includes("..") || filePath.startsWith("/")) {
      return NextResponse.json({ error: "Invalid path: Path traversal prohibited" }, { status: 400 });
    }

    project.files[filePath] = content;
    project.activeFile = filePath;
    saveProject(project);

    return NextResponse.json({ success: true, path: filePath });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "path query parameter is required" }, { status: 400 });
  }

  if (project.files[filePath] === undefined) {
    return NextResponse.json({ error: "File does not exist" }, { status: 404 });
  }

  delete project.files[filePath];
  saveProject(project);

  return NextResponse.json({ success: true, deletedPath: filePath });
}
