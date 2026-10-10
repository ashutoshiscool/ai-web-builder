import { NextResponse } from "next/server";
import { getProject, saveProject, deleteProject, duplicateProject } from "@/lib/storage/project-store";
import JSZip from "jszip";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    if (body.name !== undefined) project.name = body.name;
    if (body.description !== undefined) project.description = body.description;
    if (body.activeFile !== undefined) project.activeFile = body.activeFile;
    if (body.settings !== undefined) project.settings = { ...project.settings, ...body.settings };
    if (body.envVars !== undefined) project.envVars = { ...project.envVars, ...body.envVars };
    if (body.dependencies !== undefined) project.dependencies = { ...project.dependencies, ...body.dependencies };
    if (body.files !== undefined) project.files = { ...project.files, ...body.files };

    const updated = saveProject(project);
    return NextResponse.json({ project: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const success = deleteProject(id);

  if (!success) {
    return NextResponse.json({ error: "Project not found or could not delete" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || "export-zip";

    if (action === "duplicate") {
      const copy = duplicateProject(id);
      return NextResponse.json({ project: copy });
    }

    if (action === "export-zip") {
      const zip = new JSZip();

      for (const [filePath, content] of Object.entries(project.files)) {
        zip.file(filePath, content);
      }

      // Add a README.md if not present
      if (!project.files["README.md"]) {
        zip.file(
          "README.md",
          `# ${project.name}\n\n${project.description}\n\nBuilt with NOVAFORGE AI Website & App Builder.\n\n## Running locally\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`
        );
      }

      const zipBlob = await zip.generateAsync({ type: "nodebuffer" });

      return new NextResponse(zipBlob as any, {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename="${project.name.toLowerCase().replace(/\s+/g, "-")}.zip"`,
        },
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
