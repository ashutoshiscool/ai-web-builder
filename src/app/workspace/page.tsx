import { getAllProjects, createProject } from "@/lib/storage/project-store";
import { TEMPLATES } from "@/lib/templates/template-registry";
import { redirect } from "next/navigation";

export default async function WorkspaceRedirectPage() {
  const projects = getAllProjects();

  if (projects.length > 0) {
    redirect(`/workspace/${projects[0].id}`);
  }

  // Create flagship default project if none exist
  const saasTemplate = TEMPLATES.find((t) => t.id === "saas-dashboard");
  const newProj = createProject({
    name: "PulseSaaS Analytics & Billing",
    description: saasTemplate?.description || "Built with NOVAFORGE",
    framework: "react-vite",
    files: saasTemplate?.files,
    dependencies: saasTemplate?.dependencies,
  });

  redirect(`/workspace/${newProj.id}`);
}
