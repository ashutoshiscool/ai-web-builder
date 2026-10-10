import { NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/storage/project-store";
import { TEMPLATES } from "@/lib/templates/template-registry";

export async function GET() {
  const projects = getAllProjects();
  
  // If no projects exist yet, auto-populate with the flagship SaaS Dashboard project!
  if (projects.length === 0) {
    const saasTemplate = TEMPLATES.find((t) => t.id === "saas-dashboard");
    if (saasTemplate) {
      const initialProject = createProject({
        name: "PulseSaaS Analytics & Billing",
        description: saasTemplate.description,
        framework: saasTemplate.framework,
        files: saasTemplate.files,
        dependencies: saasTemplate.dependencies,
      });
      return NextResponse.json({ projects: [initialProject] });
    }
  }

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, framework, templateId, initialPrompt } = body;

    let initialFiles: Record<string, string> | undefined;
    let initialDeps: Record<string, string> | undefined;

    if (templateId) {
      const template = TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        initialFiles = template.files;
        initialDeps = template.dependencies;
      }
    }

    const project = createProject({
      name: name || "Untitled Application",
      description: description || "Built with NOVAFORGE",
      framework: framework || "react-vite",
      files: initialFiles,
      dependencies: initialDeps,
      initialPrompt,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
