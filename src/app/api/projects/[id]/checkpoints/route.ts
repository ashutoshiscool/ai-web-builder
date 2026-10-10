import { NextResponse } from "next/server";
import { getProject, saveProject } from "@/lib/storage/project-store";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ checkpoints: project.checkpoints });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const { action, name, description, checkpointId } = await req.json();

    if (action === "restore") {
      const target = project.checkpoints.find((c) => c.id === checkpointId);
      if (!target) {
        return NextResponse.json({ error: "Checkpoint not found" }, { status: 404 });
      }

      project.files = { ...target.files };
      saveProject(project);

      return NextResponse.json({
        success: true,
        restoredCheckpoint: target.name,
        filesCount: Object.keys(project.files).length,
      });
    }

    // Default: create checkpoint
    const newCp = {
      id: uuidv4().slice(0, 8),
      name: name || `Checkpoint ${project.checkpoints.length + 1}`,
      timestamp: new Date().toISOString(),
      description: description || "User snapshot",
      files: { ...project.files },
    };

    project.checkpoints.unshift(newCp);
    saveProject(project);

    return NextResponse.json({ checkpoint: newCp }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
