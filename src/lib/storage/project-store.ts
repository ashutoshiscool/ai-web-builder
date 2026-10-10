import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export interface ProjectFile {
  path: string;
  content: string;
  updatedAt: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  timestamp: string;
  description?: string;
  files: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  timestamp: string;
  toolCalls?: Array<{
    id: string;
    name: string;
    args: Record<string, any>;
    status?: "running" | "completed" | "error";
    result?: string;
  }>;
  plan?: string[];
  status?: string;
  tokens?: { prompt: number; completion: number; total: number };
}

export interface ProjectSettings {
  model: string;
  provider: string;
  agentMode: "architect" | "fast" | "debugger" | "refactor";
  autoApply: boolean;
  theme: "dark" | "system";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  framework: "react-vite" | "nextjs" | "vanilla-html";
  createdAt: string;
  updatedAt: string;
  files: Record<string, string>;
  activeFile: string;
  checkpoints: Checkpoint[];
  envVars: Record<string, string>;
  dependencies: Record<string, string>;
  conversations: ChatMessage[];
  settings: ProjectSettings;
  deployedUrl?: string;
  githubRepo?: string;
}

const STORAGE_ROOT = path.join(process.cwd(), "storage");
const PROJECTS_FILE = path.join(STORAGE_ROOT, "projects.json");
const PROJECTS_DIR = path.join(STORAGE_ROOT, "projects");

function ensureStorageDirs() {
  if (!fs.existsSync(STORAGE_ROOT)) {
    fs.mkdirSync(STORAGE_ROOT, { recursive: true });
  }
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify({}, null, 2), "utf8");
  }
}

// In-memory cache for ultra-fast access
let projectsCache: Record<string, Project> | null = null;

function loadProjectsFromDisk(): Record<string, Project> {
  ensureStorageDirs();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (e) {
    console.error("Error reading projects.json, resetting:", e);
    return {};
  }
}

function saveProjectsToDisk(projects: Record<string, Project>) {
  ensureStorageDirs();
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf8");
}

export function syncProjectFilesToDisk(projectId: string, files: Record<string, string>) {
  ensureStorageDirs();
  const projectDir = path.join(PROJECTS_DIR, projectId);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  for (const [filePath, content] of Object.entries(files)) {
    const normalized = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
    const fullPath = path.join(projectDir, normalized);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, "utf8");
  }
}

export function getAllProjects(): Project[] {
  if (!projectsCache) {
    projectsCache = loadProjectsFromDisk();
  }
  return Object.values(projectsCache).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getProject(id: string): Project | null {
  if (!projectsCache) {
    projectsCache = loadProjectsFromDisk();
  }
  return projectsCache[id] || null;
}

export function saveProject(project: Project): Project {
  if (!projectsCache) {
    projectsCache = loadProjectsFromDisk();
  }
  project.updatedAt = new Date().toISOString();
  projectsCache[project.id] = project;
  saveProjectsToDisk(projectsCache);
  syncProjectFilesToDisk(project.id, project.files);
  return project;
}

export function createProject(params: {
  name: string;
  description?: string;
  framework?: "react-vite" | "nextjs" | "vanilla-html";
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  initialPrompt?: string;
}): Project {
  ensureStorageDirs();
  const id = uuidv4().slice(0, 8);
  const now = new Date().toISOString();

  const files = params.files || {
    "src/App.tsx": `import React, { useState } from 'react';
import { Sparkles, ArrowRight, Code2 } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome to ${params.name}</h1>
        <p className="text-slate-400 text-sm mb-6">
          ${params.description || "Describe what you want to build in the AI Agent panel."}
        </p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-white font-medium text-sm rounded-lg shadow-lg shadow-indigo-500/20"
        >
          <span>Interactions: {count}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}`,
    "src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;`,
    "package.json": JSON.stringify(
      {
        name: params.name.toLowerCase().replace(/\s+/g, "-"),
        version: "0.1.0",
        private: true,
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          "lucide-react": "^0.470.0",
          ...(params.dependencies || {}),
        },
      },
      null,
      2
    ),
  };

  const project: Project = {
    id,
    name: params.name,
    description: params.description || "Generated by NOVAFORGE AI",
    framework: params.framework || "react-vite",
    createdAt: now,
    updatedAt: now,
    files,
    activeFile: "src/App.tsx",
    checkpoints: [
      {
        id: uuidv4().slice(0, 8),
        name: "Initial scaffold",
        timestamp: now,
        description: "Project initialized",
        files: { ...files },
      },
    ],
    envVars: {
      VITE_API_URL: "https://api.novaforge.dev",
      VITE_APP_ENV: "development",
    },
    dependencies: params.dependencies || {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^0.470.0",
    },
    conversations: params.initialPrompt
      ? [
          {
            id: uuidv4().slice(0, 8),
            role: "user",
            content: params.initialPrompt,
            timestamp: now,
          },
        ]
      : [
          {
            id: uuidv4().slice(0, 8),
            role: "assistant",
            content: `👋 Hello! I am your **NOVAFORGE Coding Agent**.\n\nI have initialized your project **${params.name}**. You can ask me to build components, write full applications, install packages, integrate APIs, or fix any bugs.\n\nWhat would you like to build first?`,
            timestamp: now,
          },
        ],
    settings: {
      model: "gemini-3.8-flash",
      provider: "local-proxy",
      agentMode: "architect",
      autoApply: true,
      theme: "dark",
    },
  };

  saveProject(project);
  return project;
}

export function deleteProject(id: string): boolean {
  if (!projectsCache) {
    projectsCache = loadProjectsFromDisk();
  }
  if (!projectsCache[id]) return false;

  delete projectsCache[id];
  saveProjectsToDisk(projectsCache);

  const projectDir = path.join(PROJECTS_DIR, id);
  if (fs.existsSync(projectDir)) {
    try {
      fs.rmSync(projectDir, { recursive: true, force: true });
    } catch (e) {
      console.warn("Could not remove project dir:", e);
    }
  }
  return true;
}

export function duplicateProject(id: string): Project | null {
  const source = getProject(id);
  if (!source) return null;

  const copy = createProject({
    name: `${source.name} (Copy)`,
    description: source.description,
    framework: source.framework,
    files: { ...source.files },
    dependencies: { ...source.dependencies },
  });
  return copy;
}
