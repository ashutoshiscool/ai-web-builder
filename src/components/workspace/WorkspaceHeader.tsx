"use client";

import React, { useState, useEffect } from "react";
import { 
  Zap, Plus, Download, Rocket, Settings, 
  Columns, LayoutTemplate, Eye, Code2, ChevronDown, Check,
  FolderOpen, Sparkles, RefreshCw, Share2, Users, FolderKanban
} from "lucide-react";
import { Project } from "@/lib/storage/project-store";
import { useRouter } from "next/navigation";

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
  onOpenShare: () => void;
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
  onOpenShare,
  onExportZip,
  isSaving,
}: WorkspaceHeaderProps) {
  const router = useRouter();
  const [isRenaming, setIsRenaming] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

  // Dropdown states
  const [activeWorkspace, setActiveWorkspace] = useState("Personal Workspace");
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) setAllProjects(data.projects);
      })
      .catch(() => {});
  }, [project.id]);

  const workspaces = [
    { id: "personal", name: "Personal Workspace", badge: "Free" },
    { id: "team", name: "Team Alpha (Collaboration)", badge: "Pro" },
    { id: "enterprise", name: "Production Cloud VPC", badge: "Enterprise" },
  ];

  return (
    <header className="h-13 bg-[#0d0f17] border-b border-[#1e2436] px-4 flex items-center justify-between z-30 select-none">
      {/* Left: Brand, Workspace Switcher & Project Switcher */}
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

        {/* Workspace Switcher Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setShowWorkspaceDropdown(!showWorkspaceDropdown);
              setShowProjectDropdown(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium truncate max-w-[130px]">{activeWorkspace}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showWorkspaceDropdown && (
            <div className="absolute left-0 top-9 w-56 bg-[#0e111a] border border-[#1e2436] rounded-xl p-1.5 shadow-2xl z-50 text-xs space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Switch Workspace
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws.name);
                    setShowWorkspaceDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeWorkspace === ws.name ? "bg-indigo-600 text-white font-bold" : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span>{ws.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 opacity-80">{ws.badge}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Selector Dropdown / Rename */}
        <div className="relative flex items-center gap-1.5">
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
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setShowProjectDropdown(!showProjectDropdown);
                  setShowWorkspaceDropdown(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-slate-800/60 text-xs font-semibold text-slate-200 transition-colors"
                title="Switch project"
              >
                <FolderKanban className="w-3.5 h-3.5 text-indigo-400" />
                <span className="truncate max-w-[140px]">{projectName}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          )}

          {showProjectDropdown && (
            <div className="absolute left-0 top-9 w-64 bg-[#0e111a] border border-[#1e2436] rounded-xl p-1.5 shadow-2xl z-50 text-xs space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Recent Projects</span>
                <span className="text-indigo-400">{allProjects.length}</span>
              </div>
              <div className="max-h-56 overflow-y-auto space-y-0.5">
                {allProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setShowProjectDropdown(false);
                      router.push(`/workspace/${p.id}`);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                      p.id === project.id ? "bg-indigo-950/60 text-indigo-300 font-bold border border-indigo-500/30" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    {p.id === project.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowProjectDropdown(false);
                    onNewProject();
                  }}
                  className="w-full py-1.5 px-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-center font-bold text-[11px] transition-all"
                >
                  + Create New Project
                </button>
              </div>
            </div>
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

      {/* Right: Actions (New, Share, GitHub, Export, Deploy, Settings) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewProject}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          title="Create New Project"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Share Live Link Button */}
        <button
          onClick={onOpenShare}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/40 hover:bg-indigo-900/60 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          title="Share Preview URL & Multi-User Testing (Zero Port Req)"
        >
          <Share2 className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Share Live</span>
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
