import { NextResponse } from "next/server";
import { TEMPLATES } from "@/lib/templates/template-registry";
import { createProject } from "@/lib/storage/project-store";

export async function GET() {
  const templatesSummary = TEMPLATES.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    category: t.category,
    framework: t.framework,
    tags: t.tags,
    features: t.features,
    fileCount: Object.keys(t.files).length,
  }));

  return NextResponse.json({ templates: templatesSummary });
}

export async function POST(req: Request) {
  try {
    const { templateId, name } = await req.json();

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const project = createProject({
      name: name || template.name,
      description: template.description,
      framework: template.framework,
      files: template.files,
      dependencies: template.dependencies,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
