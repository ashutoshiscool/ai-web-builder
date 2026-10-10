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
    <header className="h-11 bg-[#181818] border-b border-[#2b2b2b] px-3 flex items-center justify-between z-30 select-none font-sans text-xs">
      {/* Left: Brand, Workspace Switcher & Project Switcher */}
      <div className="flex items-center gap-2.5">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-[#007acc] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1085de] transition-colors">
            <Zap className="w-3.5 h-3.5 fill-white" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-white hidden sm:inline font-mono">
            NOVAFORGE
          </span>
        </a>

        <div className="h-3.5 w-[1px] bg-[#2b2b2b] hidden sm:block" />

        {/* Workspace Switcher Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setShowWorkspaceDropdown(!showWorkspaceDropdown);
              setShowProjectDropdown(false);
            }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#252526] border border-[#333333] hover:border-slate-500 text-[11px] text-slate-300 hover:text-white transition-all font-mono"
          >
            <Users className="w-3 h-3 text-[#007acc]" />
            <span className="font-medium truncate max-w-[120px]">{activeWorkspace}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showWorkspaceDropdown && (
            <div className="absolute left-0 top-8 w-52 bg-[#1f1f1f] border border-[#333333] rounded p-1 shadow-2xl z-50 text-xs space-y-0.5 font-mono">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Workspace
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws.name);
                    setShowWorkspaceDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors text-[11px] ${
                    activeWorkspace === ws.name ? "bg-[#007acc] text-white font-semibold" : "text-slate-300 hover:bg-[#2d2d2d]"
                  }`}
                >
                  <span>{ws.name}</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-black/40 text-slate-400">{ws.badge}</span>
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
              className="bg-[#252526] border border-[#007acc] rounded px-2 py-0.5 text-xs text-white focus:outline-none font-mono"
            />
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setShowProjectDropdown(!showProjectDropdown);
                  setShowWorkspaceDropdown(false);
                }}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[#252526] text-xs text-slate-200 transition-colors font-mono"
                title="Switch project"
              >
                <FolderKanban className="w-3.5 h-3.5 text-[#007acc]" />
                <span className="truncate max-w-[130px]">{projectName}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          )}

          {showProjectDropdown && (
            <div className="absolute left-0 top-8 w-60 bg-[#1f1f1f] border border-[#333333] rounded p-1 shadow-2xl z-50 text-xs space-y-0.5 font-mono">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Projects</span>
                <span className="text-[#007acc]">{allProjects.length}</span>
              </div>
              <div className="max-h-52 overflow-y-auto space-y-0.5">
                {allProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setShowProjectDropdown(false);
                      router.push(`/workspace/${p.id}`);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors text-[11px] ${
                      p.id === project.id ? "bg-[#007acc] text-white font-semibold" : "text-slate-300 hover:bg-[#2d2d2d]"
                    }`}
                  >
                    <span className="truncate max-w-[170px]">{p.name}</span>
                    <span className="text-[10px] text-slate-400">{p.framework}</span>
                  </button>
                ))}
              </div>
              <div className="pt-1 border-t border-[#2b2b2b]">
                <button
                  onClick={() => {
                    setShowProjectDropdown(false);
                    onNewProject();
                  }}
                  className="w-full py-1 px-2 bg-[#252526] hover:bg-[#2d2d2d] text-[#007acc] hover:text-white rounded text-center font-medium text-[11px] transition-colors"
                >
                  + New Project
                </button>
              </div>
            </div>
          )}

          {isSaving && (
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <RefreshCw className="w-3 h-3 animate-spin text-[#007acc]" />
              Saving...
            </span>
          )}
        </div>
      </div>

      {/* Center: Layout View Mode Controls */}
      <div className="hidden lg:flex items-center gap-0.5 bg-[#141414] p-0.5 rounded border border-[#2b2b2b] text-[11px] font-mono">
        <button
          onClick={() => setLayoutMode("three-panel")}
          className={`px-2 py-1 rounded flex items-center gap-1.5 transition-all ${
            layoutMode === "three-panel" ? "bg-[#007acc] text-white font-medium" : "text-slate-400 hover:text-white"
          }`}
          title="3-Panel: Agent + Preview + Editor"
        >
          <Columns className="w-3 h-3" />
          <span>Full Studio</span>
        </button>

        <button
          onClick={() => setLayoutMode("agent-preview")}
          className={`px-2 py-1 rounded flex items-center gap-1.5 transition-all ${
            layoutMode === "agent-preview" ? "bg-[#007acc] text-white font-medium" : "text-slate-400 hover:text-white"
          }`}
          title="Agent + Live Preview"
        >
          <Sparkles className="w-3 h-3" />
          <span>AI + Preview</span>
        </button>

        <button
          onClick={() => setLayoutMode("code-preview")}
          className={`px-2 py-1 rounded flex items-center gap-1.5 transition-all ${
            layoutMode === "code-preview" ? "bg-[#007acc] text-white font-medium" : "text-slate-400 hover:text-white"
          }`}
          title="Editor + Live Preview"
        >
          <Code2 className="w-3 h-3" />
          <span>Code + Preview</span>
        </button>

        <button
          onClick={() => setLayoutMode("full-preview")}
          className={`px-2 py-1 rounded flex items-center gap-1.5 transition-all ${
            layoutMode === "full-preview" ? "bg-[#007acc] text-white font-medium" : "text-slate-400 hover:text-white"
          }`}
          title="Full Preview Only"
        >
          <Eye className="w-3 h-3" />
          <span>Preview</span>
        </button>
      </div>

      {/* Right: Actions (New, Share, GitHub, Export, Deploy, Settings) */}
      <div className="flex items-center gap-1.5 font-mono text-[11px]">
        <button
          onClick={onNewProject}
          className="px-2 py-1 rounded bg-[#252526] border border-[#333333] hover:bg-[#2d2d2d] text-slate-300 hover:text-white flex items-center gap-1 transition-all"
          title="Create New Project"
        >
          <Plus className="w-3 h-3" />
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Share Live Link Button */}
        <button
          onClick={onOpenShare}
          className="px-2 py-1 rounded bg-[#1e2430] border border-[#007acc]/40 hover:bg-[#263045] text-blue-300 hover:text-white flex items-center gap-1 transition-all"
          title="Share Preview URL & Multi-User Testing (Zero Port Req)"
        >
          <Share2 className="w-3 h-3 text-[#007acc]" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={onExportZip}
          className="px-2 py-1 rounded bg-[#252526] border border-[#333333] hover:bg-[#2d2d2d] text-slate-300 hover:text-white flex items-center gap-1 transition-all"
          title="Export Source as ZIP"
        >
          <Download className="w-3 h-3 text-slate-400" />
          <span className="hidden sm:inline">ZIP</span>
        </button>

        <button
          onClick={onOpenGithub}
          className="px-2 py-1 rounded bg-[#252526] border border-[#333333] hover:bg-[#2d2d2d] text-slate-300 hover:text-white flex items-center gap-1 transition-all"
          title="Sync to GitHub"
        >
          <GithubIcon className="w-3 h-3 text-slate-400" />
          <span className="hidden md:inline">GitHub</span>
        </button>

        <button
          onClick={onOpenDeploy}
          className="px-2.5 py-1 rounded bg-[#007acc] hover:bg-[#0062a3] text-white font-medium flex items-center gap-1 shadow-sm transition-all active:scale-95"
          title="Deploy to Cloud (Vercel / Netlify)"
        >
          <Rocket className="w-3 h-3" />
          <span>Deploy</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1 rounded bg-[#252526] border border-[#333333] hover:bg-[#2d2d2d] text-slate-400 hover:text-white transition-all"
          title="AI & Provider Settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
