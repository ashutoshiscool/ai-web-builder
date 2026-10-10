"use client";

import React, { useState, useEffect, use } from "react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { LeftPanel } from "@/components/workspace/LeftPanel";
import { CenterPanel } from "@/components/workspace/CenterPanel";
import { RightPanel } from "@/components/workspace/RightPanel";
import { NewProjectModal } from "@/components/workspace/NewProjectModal";
import { SettingsModal } from "@/components/workspace/SettingsModal";
import { DeployModal } from "@/components/workspace/DeployModal";
import { GitHubModal } from "@/components/workspace/GitHubModal";
import { ShareModal } from "@/components/workspace/ShareModal";
import { Project } from "@/lib/storage/project-store";
import { useRouter } from "next/navigation";
import { Bot, Eye, Code2, Sparkles } from "lucide-react";

export function WorkspaceClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Layout mode
  const [layoutMode, setLayoutMode] = useState<"three-panel" | "agent-preview" | "code-preview" | "full-preview" | "full-code">("three-panel");
  const [mobileTab, setMobileTab] = useState<"agent" | "preview" | "code">("preview");

  // AI Agent Streaming State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<{ step: string; message: string } | undefined>(undefined);
  const [currentPlan, setCurrentPlan] = useState<string[] | undefined>(undefined);
  const [streamingText, setStreamingText] = useState("");
  const [activeToolCalls, setActiveToolCalls] = useState<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modals state
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Fetch project data
  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setProject(data.project);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  // Handle sending a message to the AI Coding Agent
  const handleSendMessage = async (userPrompt: string, mode: string, modelId: string) => {
    if (!project || isGenerating) return;

    setIsGenerating(true);
    setStreamingText("");
    setCurrentStatus({ step: "understanding", message: "Analyzing prompt and project dependencies..." });
    setCurrentPlan(undefined);
    setActiveToolCalls([]);

    // Optimistically update conversation
    const userMsg = {
      id: Math.random().toString(),
      role: "user" as const,
      content: userPrompt,
      timestamp: new Date().toISOString(),
    };
    setProject((prev) => prev ? { ...prev, conversations: [...prev.conversations, userMsg] } : null);

    try {
      const response = await fetch("/api/agent/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          prompt: userPrompt,
          agentMode: mode,
          model: modelId,
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to agent stream");
      if (!response.body) throw new Error("Response body is empty");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      let fullAccumulatedResponse = "";
      let assistantMessageCommitted = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() || "";

        for (const block of blocks) {
          const trimmed = block.trim();
          if (!trimmed) continue;

          const eventLine = trimmed.split(/\r?\n/).find((l) => l.startsWith("event:"));
          const eventType = eventLine ? eventLine.replace(/^event:\s*/, "").trim() : "chunk";
          
          const dataLines = trimmed.split(/\r?\n/).filter((l) => l.startsWith("data:"));
          const dataStr = dataLines.map((l) => l.replace(/^data:\s*/, "")).join("\n");

          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);

              if (eventType === "status") {
                setCurrentStatus({ step: data.step, message: data.message });
              } else if (eventType === "plan") {
                setCurrentPlan(data.plan);
              } else if (eventType === "chunk") {
                fullAccumulatedResponse += data.text || "";
                setStreamingText(fullAccumulatedResponse);
              } else if (eventType === "tool_call") {
                const callId = data.id || data.toolCallId || data.toolCall?.id || Math.random().toString();
                const callName = data.name || data.toolCall?.name || "tool";
                const callArgs = data.args || data.toolCall?.args || {};
                const toolItem = {
                  id: callId,
                  name: callName,
                  args: callArgs,
                  status: "running",
                };
                setActiveToolCalls((prev) => [...(Array.isArray(prev) ? prev.filter(Boolean) : []), toolItem]);
              } else if (eventType === "tool_result") {
                const resultId = data.id || data.toolCallId || data.toolCall?.id;
                setActiveToolCalls((prev) =>
                  (Array.isArray(prev) ? prev : [])
                    .filter(Boolean)
                    .map((tc) =>
                      tc && tc.id === resultId
                        ? { ...tc, status: "completed", result: data.result }
                        : tc
                    )
                );
              } else if (eventType === "file_changed") {
                if (data.path && typeof data.content === "string") {
                  setProject((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      files: {
                        ...prev.files,
                        [data.path]: data.content,
                      },
                    };
                  });
                  setRefreshTrigger((k) => k + 1);
                }
              } else if (eventType === "checkpoint") {
                setProject((prev) =>
                  prev
                    ? {
                        ...prev,
                        checkpoints: [data.checkpoint, ...prev.checkpoints],
                      }
                    : null
                );
              } else if (eventType === "complete") {
                if (data.project) {
                  setProject(data.project);
                }
                if (data.finalMessage && !assistantMessageCommitted) {
                  assistantMessageCommitted = true;
                  const finalMsg = {
                    id: Math.random().toString(),
                    role: "assistant" as const,
                    content: data.finalMessage,
                    timestamp: new Date().toISOString(),
                  };
                  setProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          conversations: [...prev.conversations, finalMsg],
                        }
                      : null
                  );
                }
                setRefreshTrigger((k) => k + 1);
              } else if (eventType === "error") {
                setCurrentStatus({ step: "error", message: data.error || "Agent generation error" });
              }
            } catch (e) {
              console.error("Failed to parse SSE line", dataStr, e);
            }
          }
        }
      }

      // If finished stream and complete was not sent with message
      if (!assistantMessageCommitted && fullAccumulatedResponse) {
        const finalAssistantMsg = {
          id: Math.random().toString(),
          role: "assistant" as const,
          content: fullAccumulatedResponse,
          timestamp: new Date().toISOString(),
        };
        setProject((prev) =>
          prev
            ? {
                ...prev,
                conversations: [...prev.conversations, finalAssistantMsg],
              }
            : null
        );
      }

    } catch (err: any) {
      console.error("Streaming error:", err);
      setCurrentStatus({ step: "error", message: err.message });
    } finally {
      setIsGenerating(false);
      setStreamingText("");
      setCurrentStatus(undefined);
      setRefreshTrigger((k) => k + 1);
      // Guarantee full project synchronization with backend
      try {
        const freshRes = await fetch(`/api/projects/${project.id}`);
        if (freshRes.ok) {
          const freshData = await freshRes.json();
          if (freshData.project) {
            setProject(freshData.project);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch fresh project state:", err);
      }
    }
  };

  const handleUpdateFile = async (path: string, content: string) => {
    if (!project) return;
    setProject((prev) => prev ? { ...prev, files: { ...prev.files, [path]: content } } : null);
    setRefreshTrigger((k) => k + 1);

    await fetch(`/api/projects/${project.id}/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, content }),
    });
  };

  const handleCreateFile = async (path: string) => {
    if (!project) return;
    const initialContent = path.endsWith(".tsx")
      ? `import React from 'react';\n\nexport default function Component() {\n  return <div>New Component</div>;\n}\n`
      : "";
    await handleUpdateFile(path, initialContent);
  };

  const handleDeleteFile = async (path: string) => {
    if (!project) return;
    const updated = { ...project.files };
    delete updated[path];
    setProject((prev) => prev ? { ...prev, files: updated } : null);

    await fetch(`/api/projects/${project.id}/files?path=${encodeURIComponent(path)}`, {
      method: "DELETE",
    });
  };

  const handleCreateCheckpoint = async (name: string) => {
    if (!project) return;
    const res = await fetch(`/api/projects/${project.id}/checkpoints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (data.checkpoint) {
      setProject((prev) => prev ? { ...prev, checkpoints: [data.checkpoint, ...prev.checkpoints] } : null);
    }
  };

  const handleRestoreCheckpoint = async (checkpointId: string) => {
    if (!project) return;
    const res = await fetch(`/api/projects/${project.id}/checkpoints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "restore", checkpointId }),
    });
    if (res.ok) {
      const freshRes = await fetch(`/api/projects/${project.id}`);
      const freshData = await freshRes.json();
      setProject(freshData.project);
      setRefreshTrigger((k) => k + 1);
    }
  };

  const handleAskAgentToFix = (err: string) => {
    if (!project) return;
    if (layoutMode === "full-preview") {
      setLayoutMode("three-panel");
    }
    setMobileTab("agent");
    setProject((prev) => prev ? {
      ...prev,
      settings: { ...prev.settings, agentMode: "debug" }
    } : null);
    handleSendMessage(`Diagnose and repair runtime error:\n\n${err}`, "debug", project.settings.model);
  };

  const handleExportZip = () => {
    if (!project) return;
    window.location.href = `/api/projects/${project.id}?action=export-zip`;
  };

  const handleCreateNewProject = async (data: { name: string; description?: string; templateId?: string; initialPrompt?: string }) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.project) {
      router.push(`/workspace/${result.project.id}`);
    }
  };

  if (loading) {
    return (
      <div 
        suppressHydrationWarning
        className="min-h-screen bg-[#08090d] flex items-center justify-center font-mono text-xs text-slate-400"
      >
        <div suppressHydrationWarning className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
          <span>Initializing NOVAFORGE isolated workspace...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div 
        suppressHydrationWarning
        className="min-h-screen bg-[#08090d] flex items-center justify-center font-mono text-xs text-rose-400"
      >
        <div>Error loading project: {error || "Not found"}</div>
      </div>
    );
  }

  return (
    <div 
      suppressHydrationWarning
      className="h-screen w-screen flex flex-col bg-[#08090d] text-slate-100 overflow-hidden font-sans"
    >
      {/* Top Header */}
      <WorkspaceHeader
        project={project}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        onNewProject={() => setIsNewProjectOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDeploy={() => setIsDeployOpen(true)}
        onOpenGithub={() => setIsGithubOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onExportZip={handleExportZip}
      />

      {/* Main Workspace Panels */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* DESKTOP RESPONSIVE MULTI-PANEL LAYOUT */}
        <div className="hidden lg:flex w-full flex-1 overflow-hidden">
          {/* Left Panel: AI Agent */}
          {(layoutMode === "three-panel" || layoutMode === "agent-preview") && (
            <div
              className={`${
                layoutMode === "three-panel" ? "w-[30%] min-w-[340px]" : "w-[42%] min-w-[380px]"
              } h-full transition-all duration-200`}
            >
              <LeftPanel
                project={project}
                onSendMessage={handleSendMessage}
                isGenerating={isGenerating}
                onStopGeneration={() => setIsGenerating(false)}
                currentStatus={currentStatus}
                currentPlan={currentPlan}
                streamingText={streamingText}
                activeToolCalls={activeToolCalls}
                onApplyCode={handleUpdateFile}
              />
            </div>
          )}

          {/* Center Panel: Live Preview */}
          {(layoutMode === "three-panel" ||
            layoutMode === "agent-preview" ||
            layoutMode === "code-preview" ||
            layoutMode === "full-preview") && (
            <div className="flex-1 h-full min-w-[360px] transition-all duration-200">
              <CenterPanel
                project={project}
                onAskAgentToFix={handleAskAgentToFix}
                refreshTrigger={refreshTrigger}
              />
            </div>
          )}

          {/* Right Panel: Developer Tools & Editor */}
          {(layoutMode === "three-panel" || layoutMode === "code-preview" || layoutMode === "full-code") && (
            <div
              className={`${
                layoutMode === "three-panel"
                  ? "w-[32%] min-w-[360px]"
                  : layoutMode === "code-preview"
                  ? "w-[48%] min-w-[420px]"
                  : "w-full"
              } h-full transition-all duration-200`}
            >
              <RightPanel
                project={project}
                onUpdateFile={handleUpdateFile}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onCreateCheckpoint={handleCreateCheckpoint}
                onRestoreCheckpoint={handleRestoreCheckpoint}
                onUpdateEnvVars={(envVars) => setProject((prev) => prev ? { ...prev, envVars } : null)}
              />
            </div>
          )}
        </div>

        {/* TABLET & MOBILE TABBED INTERFACE */}
        <div className="lg:hidden w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {mobileTab === "agent" && (
              <LeftPanel
                project={project}
                onSendMessage={handleSendMessage}
                isGenerating={isGenerating}
                onStopGeneration={() => setIsGenerating(false)}
                currentStatus={currentStatus}
                currentPlan={currentPlan}
                streamingText={streamingText}
                activeToolCalls={activeToolCalls}
                onApplyCode={handleUpdateFile}
              />
            )}
            {mobileTab === "preview" && (
              <CenterPanel
                project={project}
                onAskAgentToFix={handleAskAgentToFix}
                refreshTrigger={refreshTrigger}
              />
            )}
            {mobileTab === "code" && (
              <RightPanel
                project={project}
                onUpdateFile={handleUpdateFile}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onCreateCheckpoint={handleCreateCheckpoint}
                onRestoreCheckpoint={handleRestoreCheckpoint}
                onUpdateEnvVars={(envVars) => setProject((prev) => prev ? { ...prev, envVars } : null)}
              />
            )}
          </div>

          {/* Mobile Bottom Tab Bar */}
          <div className="h-12 bg-[#181818] border-t border-[#2b2b2b] flex items-center justify-around text-xs">
            <button
              onClick={() => setMobileTab("agent")}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-medium ${
                mobileTab === "agent" ? "text-[#007acc] bg-[#252526] font-bold" : "text-slate-400"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Agent</span>
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-medium ${
                mobileTab === "preview" ? "text-[#007acc] bg-[#252526] font-bold" : "text-slate-400"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setMobileTab("code")}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-medium ${
                mobileTab === "code" ? "text-[#007acc] bg-[#252526] font-bold" : "text-slate-400"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Code</span>
            </button>
          </div>
        </div>

        {/* VS Code Bottom Status Bar (Desktop) */}
        <footer className="hidden lg:flex h-6 bg-[#181818] border-t border-[#2b2b2b] px-3 items-center justify-between text-[11px] font-mono text-[#858585] select-none z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer transition-colors">
              <svg className="w-3.5 h-3.5 text-[#007acc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9" />
              </svg>
              <span>main*</span>
            </div>

            <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
              <span>⨂ 0</span>
              <span>⚠ 0</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero-Port Sandbox: Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isGenerating ? (
              <div className="flex items-center gap-1.5 text-[#007acc] animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007acc]" />
                <span>{project.settings.model || "gemini-3.8-flash"} (Compiling)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                <Sparkles className="w-3 h-3 text-[#007acc]" />
                <span>{project.settings.model || "gemini-3.8-flash"}</span>
              </div>
            )}

            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span className="text-slate-300 hover:text-white cursor-pointer transition-colors">TypeScript JSX</span>
          </div>
        </footer>
      </div>

      {/* Global Modals */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateProject={handleCreateNewProject}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        project={project}
      />
      <GitHubModal
        isOpen={isGithubOpen}
        onClose={() => setIsGithubOpen(false)}
        project={project}
      />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        project={project}
      />
    </div>
  );
}
