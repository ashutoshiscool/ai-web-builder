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
import { Project } from "@/lib/storage/project-store";
import { useRouter } from "next/navigation";
import { Bot, Eye, Code2 } from "lucide-react";

export default function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          const eventMatch = trimmed.match(/^event:\s*(\w+)/);
          const dataMatch = trimmed.match(/data:\s*([\s\S]+)$/);

          if (eventMatch && dataMatch) {
            const eventType = eventMatch[1];
            try {
              const payload = JSON.parse(dataMatch[1]);

              if (eventType === "status") {
                setCurrentStatus(payload);
              } else if (eventType === "plan") {
                setCurrentPlan(payload.steps);
              } else if (eventType === "tool_call") {
                setActiveToolCalls((prev) => [...prev, { ...payload, status: "running" }]);
              } else if (eventType === "tool_result") {
                setActiveToolCalls((prev) =>
                  prev.map((t) => (t.id === payload.id ? { ...t, status: "completed", result: payload.result } : t))
                );
              } else if (eventType === "file_changed") {
                // Update file in project state live!
                setProject((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    files: { ...prev.files, [payload.path]: payload.content },
                  };
                });
                setRefreshTrigger((k) => k + 1);
              } else if (eventType === "chunk") {
                setStreamingText((prev) => prev + payload.text);
              } else if (eventType === "complete") {
                // Append assistant message
                setProject((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    conversations: [
                      ...prev.conversations,
                      {
                        id: Math.random().toString(),
                        role: "assistant",
                        content: payload.summary,
                        timestamp: new Date().toISOString(),
                      },
                    ],
                  };
                });
              } else if (eventType === "error") {
                alert("Agent notice: " + payload.message);
              }
            } catch (e) {
              // ignore parse errors
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Stream error:", err);
      alert("Agent error: " + err.message);
    } finally {
      setIsGenerating(false);
      setStreamingText("");
      setCurrentStatus(undefined);
      setRefreshTrigger((k) => k + 1);
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
      // Reload project
      const freshRes = await fetch(`/api/projects/${project.id}`);
      const freshData = await freshRes.json();
      setProject(freshData.project);
      setRefreshTrigger((k) => k + 1);
    }
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
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
          <span>Initializing NOVAFORGE isolated workspace...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center font-mono text-xs text-rose-400">
        <div>Error loading project: {error || "Not found"}</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#08090d] text-slate-100 overflow-hidden font-sans">
      {/* Top Header */}
      <WorkspaceHeader
        project={project}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        onNewProject={() => setIsNewProjectOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDeploy={() => setIsDeployOpen(true)}
        onOpenGithub={() => setIsGithubOpen(true)}
        onExportZip={handleExportZip}
      />

      {/* Main Workspace Panels */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* DESKTOP RESPONSIVE MULTI-PANEL LAYOUT */}
        <div className="hidden lg:flex w-full h-full overflow-hidden">
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
                onAskAgentToFix={(err) => handleSendMessage(`Diagnose and repair this runtime error:\n\n${err}`, "debugger", project.settings.model)}
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
        <div className="lg:hidden w-full h-full flex flex-col">
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
              />
            )}
            {mobileTab === "preview" && (
              <CenterPanel
                project={project}
                onAskAgentToFix={(err) => handleSendMessage(`Diagnose and repair runtime error:\n\n${err}`, "debugger", project.settings.model)}
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
          <div className="h-12 bg-[#0e111a] border-t border-slate-800 flex items-center justify-around text-xs">
            <button
              onClick={() => setMobileTab("agent")}
              className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-medium ${
                mobileTab === "agent" ? "text-indigo-400 bg-indigo-500/10 font-bold" : "text-slate-400"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Agent</span>
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-medium ${
                mobileTab === "preview" ? "text-indigo-400 bg-indigo-500/10 font-bold" : "text-slate-400"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setMobileTab("code")}
              className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-medium ${
                mobileTab === "code" ? "text-indigo-400 bg-indigo-500/10 font-bold" : "text-slate-400"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Code</span>
            </button>
          </div>
        </div>
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
    </div>
  );
}
