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

export type AgentMode = "architect" | "code" | "ask" | "debug" | "orchestrator";

export interface ProjectSettings {
  model: string;
  provider: string;
  agentMode: AgentMode;
  autoApply: boolean;
  theme: "dark" | "system";
}

export interface ProjectLog {
  id: string;
  level: "info" | "warn" | "error" | "log";
  message: string;
  source?: "browser" | "compiler" | "agent" | "playwright";
  timestamp: string;
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
  logs?: ProjectLog[];
  sandboxStatus?: "running" | "stopped" | "paused";
  lastSandboxRestart?: string;
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

function sanitizeMode(mode?: string): AgentMode {
  if (mode === "architect" || mode === "code" || mode === "ask" || mode === "debug" || mode === "orchestrator") {
    return mode;
  }
  if (mode === "debugger") return "debug";
  if (mode === "fast" || mode === "refactor") return "code";
  return "architect";
}

function loadProjectsFromDisk(): Record<string, Project> {
  ensureStorageDirs();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    for (const id in parsed) {
      if (parsed[id]?.settings) {
        parsed[id].settings.agentMode = sanitizeMode(parsed[id].settings.agentMode);
      }
    }
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
  projectsCache = loadProjectsFromDisk();
  return Object.values(projectsCache || {})
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b?.updatedAt || 0).getTime() - new Date(a?.updatedAt || 0).getTime()
    );
}

export function getProject(id: string): Project | null {
  if (!id || typeof id !== "string") return null;
  projectsCache = loadProjectsFromDisk();
  const project = projectsCache[id] || null;
  if (project) {
    if (!project.files) project.files = {};
    const projectDir = path.join(PROJECTS_DIR, id);
    if (fs.existsSync(projectDir)) {
      try {
        const readFilesRecursively = (dir: string, base: string = "") => {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const relPath = base ? `${base}/${entry.name}` : entry.name;
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              readFilesRecursively(fullPath, relPath);
            } else if (entry.isFile()) {
              project.files[relPath] = fs.readFileSync(fullPath, "utf8");
            }
          }
        };
        readFilesRecursively(projectDir);
      } catch (e) {
        console.error("Error reading project files from disk:", e);
      }
    }
  }
  return project;
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
            content: `👋 Hello! I am **veronica**, your AI technical lead and engineering copilot.\n\nI have initialized your project **${params.name}** and can assist you across 5 specialized modes:\n- **Architect**: Inquisitive technical leader creating plans for your approval\n- **Code**: Highly skilled engineer producing clean, modular code\n- **Ask**: Knowledgeable technical assistant answering questions\n- **Debug**: Expert debugger for systematic problem diagnosis & repair\n- **Orchestrator**: Strategic workflow coordinator delegating tasks to specialized modes\n\nWhat would you like to plan or build first?`,
            timestamp: now,
          },
        ],
    settings: {
      model: "gemini-2.5-flash",
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

export function addProjectLog(
  projectId: string,
  log: {
    level: "info" | "warn" | "error" | "log";
    message: string;
    source?: "browser" | "compiler" | "agent" | "playwright";
    timestamp?: string;
  }
): ProjectLog | null {
  const project = getProject(projectId);
  if (!project) return null;

  if (!project.logs) {
    project.logs = [];
  }

  const newLog: ProjectLog = {
    id: uuidv4().slice(0, 8),
    level: log.level,
    message: log.message,
    source: log.source || "browser",
    timestamp: log.timestamp || new Date().toISOString(),
  };

  project.logs.push(newLog);

  // Keep last 500 logs to prevent unbounded growth
  if (project.logs.length > 500) {
    project.logs = project.logs.slice(-500);
  }

  saveProject(project);
  return newLog;
}

export function getProjectLogs(projectId: string, limit: number = 100): ProjectLog[] {
  const project = getProject(projectId);
  if (!project || !project.logs) return [];
  return project.logs.slice(-limit);
}

export function clearProjectLogs(projectId: string): boolean {
  const project = getProject(projectId);
  if (!project) return false;
  project.logs = [];
  saveProject(project);
  return true;
}

export function setSandboxStatus(projectId: string, status: "running" | "stopped" | "paused"): boolean {
  const project = getProject(projectId);
  if (!project) return false;
  project.sandboxStatus = status;
  if (status === "running") {
    project.lastSandboxRestart = new Date().toISOString();
  }
  saveProject(project);
  return true;
}

export function getSandboxStatus(projectId: string): "running" | "stopped" | "paused" {
  const project = getProject(projectId);
  return project?.sandboxStatus || "running";
}

