"use client";

import React, { useState } from "react";
import { 
  Zap, Plus, Download, Rocket, Settings, 
  Columns, LayoutTemplate, Eye, Code2, ChevronDown, Check,
  FolderOpen, Sparkles, RefreshCw
} from "lucide-react";
import { Project } from "@/lib/storage/project-store";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface WorkspaceHeaderProps {
  project: Project;
  layoutMode: "three-panel" | "agent-preview" | "code-preview" | "full-preview" | "full-code";
  setLayoutMode: (mode: "three-panel" | "agent-preview" | "code-preview" | "full-preview" | "full-code") => void;
  onNewProject: () => void;
  onOpenSettings: () => void;
  onOpenDeploy: () => void;
  onOpenGithub: () => void;
  onExportZip: () => void;
  isSaving?: boolean;
}

export function WorkspaceHeader({
  project,
  layoutMode,
  setLayoutMode,
  onNewProject,
  onOpenSettings,
  onOpenDeploy,
  onOpenGithub,
  onExportZip,
  isSaving,
}: WorkspaceHeaderProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

  return (
    <header className="h-13 bg-[#0d0f17] border-b border-[#1e2436] px-4 flex items-center justify-between z-30 select-none">
      {/* Left: Brand & Project Name */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">
            NOVAFORGE
          </span>
        </a>

        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

        {/* Project Selector / Rename */}
        <div className="flex items-center gap-2">
          {isRenaming ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setIsRenaming(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsRenaming(false)}
              autoFocus
              className="bg-slate-900 border border-indigo-500/50 rounded px-2 py-0.5 text-xs text-white focus:outline-none"
            />
          ) : (
            <button
              onClick={() => setIsRenaming(true)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-800/60 text-xs font-semibold text-slate-200 transition-colors"
              title="Click to rename project"
            >
              <span>{projectName}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase font-mono">
                {project.framework === "react-vite" ? "React 19" : project.framework}
              </span>
            </button>
          )}

          {isSaving && (
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
              Saving...
            </span>
          )}
        </div>
      </div>

      {/* Center: Layout View Mode Controls */}
      <div className="hidden lg:flex items-center gap-1 bg-[#151926] p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setLayoutMode("three-panel")}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            layoutMode === "three-panel" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
          title="3-Panel: Agent + Preview + Editor"
        >
          <Columns className="w-3.5 h-3.5" />
          <span>Full Studio</span>
        </button>

        <button
          onClick={() => setLayoutMode("agent-preview")}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            layoutMode === "agent-preview" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
          title="Agent + Live Preview"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI + Preview</span>
        </button>

        <button
          onClick={() => setLayoutMode("code-preview")}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            layoutMode === "code-preview" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
          title="Editor + Live Preview"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Code + Preview</span>
        </button>

        <button
          onClick={() => setLayoutMode("full-preview")}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            layoutMode === "full-preview" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
          title="Full Preview Only"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>
      </div>

      {/* Right: Actions (New, GitHub, Export, Deploy, Settings) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewProject}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          title="Create New Project"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New</span>
        </button>

        <button
          onClick={onExportZip}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          title="Export Source as ZIP"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Export ZIP</span>
        </button>

        <button
          onClick={onOpenGithub}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          title="Sync to GitHub"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span className="hidden md:inline">GitHub</span>
        </button>

        <button
          onClick={onOpenDeploy}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all active:scale-95"
          title="Deploy to Cloud (Vercel / Netlify)"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Deploy</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          title="AI & Provider Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
