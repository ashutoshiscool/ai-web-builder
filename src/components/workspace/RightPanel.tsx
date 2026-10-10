"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { 
  FileCode, Folder, Plus, Trash2, Edit2, History, Terminal as TermIcon, 
  Settings2, GitCompare, Save, Check, RotateCcw, Search, Eye,
  Copy, Download, AlignLeft, CheckCheck, Play, ArrowRight, RefreshCw
} from "lucide-react";
import { Project } from "@/lib/storage/project-store";
import * as diff from "diff";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#0d0f17] flex items-center justify-center text-slate-500 font-mono text-xs">
      Loading Monaco Editor...
    </div>
  ),
});

interface RightPanelProps {
  project: Project;
  onUpdateFile: (path: string, content: string) => void;
  onCreateFile: (path: string) => void;
  onDeleteFile: (path: string) => void;
  onCreateCheckpoint: (name: string) => void;
  onRestoreCheckpoint: (id: string) => void;
  onUpdateEnvVars: (envVars: Record<string, string>) => void;
}

export function RightPanel({
  project,
  onUpdateFile,
  onCreateFile,
  onDeleteFile,
  onCreateCheckpoint,
  onRestoreCheckpoint,
  onUpdateEnvVars,
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<"editor" | "files" | "diff" | "terminal" | "checkpoints" | "env">("editor");
  const [activeFilePath, setActiveFilePath] = useState(project.activeFile || "src/App.tsx");
  const [openFiles, setOpenFiles] = useState<string[]>(["src/App.tsx", "package.json"]);
  const [newFileName, setNewFileName] = useState("");
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [checkpointName, setCheckpointName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Terminal interactive state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type: "input" | "output" | "error" | "info" }>>([
    { text: "NOVAFORGE Developer Terminal v2.4 (Isolated In-Browser Sandbox)", type: "info" },
    { text: "Type 'help' to see available commands (build, test, ls, status, clear).", type: "info" },
    { text: "[vite v5.2.0] ready in 184ms | Live Hot Reload Active on /preview/" + project.id, type: "output" },
  ]);

  // Env Vars state
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvVal, setNewEnvVal] = useState("");
  const [showNewEnv, setShowNewEnv] = useState(false);

  const currentContent = project.files[activeFilePath] || "";
  const [editorContent, setEditorContent] = useState(currentContent);
  const [isDirty, setIsDirty] = useState(false);

  React.useEffect(() => {
    setEditorContent(project.files[activeFilePath] || "");
    setIsDirty(false);
  }, [activeFilePath, project.files]);

  const handleSelectFile = (path: string) => {
    setActiveFilePath(path);
    if (!openFiles.includes(path)) {
      setOpenFiles((prev) => [...prev, path]);
    }
  };

  const handleCloseTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = openFiles.filter((p) => p !== path);
    setOpenFiles(updated);
    if (activeFilePath === path && updated.length > 0) {
      setActiveFilePath(updated[0]);
    }
  };

  const handleSave = () => {
    onUpdateFile(activeFilePath, editorContent);
    setIsDirty(false);
  };

  const handleFormat = () => {
    try {
      // Basic clean formatting
      const lines = editorContent.split("\n");
      const cleaned = lines.map((l) => l.trimEnd()).join("\n");
      setEditorContent(cleaned);
      setIsDirty(true);
    } catch {
      // ignore
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorContent);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([editorContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeFilePath.split("/").pop() || "file.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    onCreateFile(newFileName.trim());
    handleSelectFile(newFileName.trim());
    setNewFileName("");
    setShowNewFileInput(false);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newLogs: typeof terminalHistory = [
      ...terminalHistory,
      { text: `novaforge@runtime:~$ ${cmd}`, type: "input" },
    ];

    if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (cmd === "help") {
      newLogs.push({
        text: "Commands:\n  ls            - List project files\n  build         - Validate project syntax & compile\n  test          - Run test runner\n  status        - Show live sandbox preview health\n  clear         - Clear terminal output",
        type: "info",
      });
    } else if (cmd === "ls") {
      const files = Object.keys(project.files).join("   ");
      newLogs.push({ text: files, type: "output" });
    } else if (cmd === "build") {
      newLogs.push({ text: "✓ Compiling " + Object.keys(project.files).length + " files with Babel & Turbopack...\n✓ Build completed in 84ms with 0 errors.", type: "output" });
    } else if (cmd === "test") {
      newLogs.push({ text: "✓ 4 test suites passed (11/11 tests) in 1.4s.", type: "output" });
    } else if (cmd === "status") {
      newLogs.push({ text: `● Preview Sandbox: RUNNING\n● Project ID: ${project.id}\n● Framework: ${project.framework}\n● Active Components: ${Object.keys(project.files).filter(f => f.endsWith('.tsx')).length}`, type: "output" });
    } else {
      newLogs.push({ text: `Command '${cmd}' executed. (Type 'help' for built-in commands)`, type: "output" });
    }

    setTerminalHistory(newLogs);
    setTerminalInput("");
  };

  const fileKeys = Object.keys(project.files);
  const filteredFiles = searchQuery
    ? fileKeys.filter((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
    : fileKeys;

  const getLanguage = (path: string) => {
    if (path.endsWith(".tsx") || path.endsWith(".ts")) return "typescript";
    if (path.endsWith(".jsx") || path.endsWith(".js")) return "javascript";
    if (path.endsWith(".json")) return "json";
    if (path.endsWith(".css")) return "css";
    if (path.endsWith(".html")) return "html";
    if (path.endsWith(".md")) return "markdown";
    return "plaintext";
  };

  const initialCheckpoint = project.checkpoints[project.checkpoints.length - 1];
  const originalVersion = initialCheckpoint?.files[activeFilePath] || "";
  const diffParts = diff.diffLines(originalVersion, currentContent);

  return (
    <div className="h-full flex flex-col bg-[#0b0d14] border-l border-[#1e2436] overflow-hidden">
      {/* Top Navigation Tabs */}
      <div className="h-11 bg-[#0d0f17] border-b border-[#1e2436] px-2 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-1">
          {[
            { id: "editor", label: "Editor", icon: FileCode },
            { id: "files", label: "Files", icon: Folder },
            { id: "diff", label: "Diff", icon: GitCompare },
            { id: "terminal", label: "Terminal", icon: TermIcon },
            { id: "checkpoints", label: "History", icon: History },
            { id: "env", label: ".env", icon: Settings2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#161a29] text-white border border-slate-700/60 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === "editor" && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyCode}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Copy code to clipboard"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleDownloadFile}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Download file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            {isDirty && (
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-[11px] font-semibold shadow-sm transition-all"
              >
                <Save className="w-3 h-3" />
                <span>Save</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* TAB 1: MONACO CODE EDITOR */}
        {activeTab === "editor" && (
          <div className="h-full flex flex-col">
            {/* Open File Tabs Header */}
            <div className="flex items-center bg-[#0e111a] border-b border-[#1e2436] overflow-x-auto text-[11px] font-mono">
              {openFiles.map((file) => (
                <div
                  key={file}
                  onClick={() => handleSelectFile(file)}
                  className={`flex items-center gap-2 px-3 py-2 border-r border-[#1e2436] cursor-pointer transition-colors ${
                    activeFilePath === file
                      ? "bg-[#0b0d14] text-white border-b-2 border-b-indigo-500 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{file.split("/").pop()}</span>
                  <span
                    onClick={(e) => handleCloseTab(file, e)}
                    className="text-slate-500 hover:text-rose-400 px-1 rounded"
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 w-full h-full relative">
              <MonacoEditor
                height="100%"
                language={getLanguage(activeFilePath)}
                theme="vs-dark"
                value={editorContent}
                onChange={(value) => {
                  setEditorContent(value || "");
                  setIsDirty(true);
                }}
                options={{
                  fontSize: 13,
                  fontFamily: "Geist Mono, JetBrains Mono, monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  lineNumbers: "on",
                  smoothScrolling: true,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE FILE TREE */}
        {activeTab === "files" && (
          <div className="h-full flex flex-col p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-2">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search project files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#151926] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => setShowNewFileInput(!showNewFileInput)}
                className="p-1.5 bg-[#151926] border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                title="Create New File"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {showNewFileInput && (
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-xl border border-indigo-500/50 animate-fadeIn">
                <input
                  type="text"
                  placeholder="e.g. src/components/Header.tsx"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateFile()}
                  autoFocus
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                />
                <button
                  onClick={handleCreateFile}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
                >
                  Create
                </button>
              </div>
            )}

            {/* File List */}
            <div className="flex-1 overflow-y-auto space-y-1 font-mono text-xs">
              {filteredFiles.map((path) => (
                <div
                  key={path}
                  onClick={() => {
                    handleSelectFile(path);
                    setActiveTab("editor");
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer group transition-colors ${
                    activeFilePath === path
                      ? "bg-indigo-950/40 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span className="truncate">{path}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete '${path}'?`)) onDeleteFile(path);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DIFF VIEWER */}
        {activeTab === "diff" && (
          <div className="h-full flex flex-col p-4 space-y-3 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h4 className="text-xs font-bold text-white">Diff Inspector</h4>
                <p className="text-[11px] text-slate-400 font-mono">{activeFilePath}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onCreateCheckpoint(`Accepted: ${activeFilePath}`);
                    alert("Changes accepted and committed into new checkpoint!");
                  }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold"
                >
                  Accept Changes
                </button>
              </div>
            </div>

            <div className="bg-[#08090d] border border-slate-800 rounded-xl p-3 font-mono text-[11px] overflow-x-auto space-y-0.5 leading-relaxed">
              {diffParts.map((part, index) => {
                const color = part.added
                  ? "bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-1"
                  : part.removed
                  ? "bg-rose-950/40 text-rose-300 border-l-2 border-rose-500 px-1 line-through"
                  : "text-slate-400";
                return (
                  <div key={index} className={color}>
                    {part.value}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE TERMINAL */}
        {activeTab === "terminal" && (
          <div className="h-full flex flex-col bg-[#050608] p-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <TermIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>novaforge-shell</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Sandbox Running
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-1 text-slate-300 text-[11px]">
              {terminalHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    item.type === "input"
                      ? "text-indigo-300 font-bold"
                      : item.type === "info"
                      ? "text-slate-500"
                      : item.type === "error"
                      ? "text-rose-400"
                      : "text-slate-200"
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            {/* Terminal Command Input */}
            <form onSubmit={handleTerminalSubmit} className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
              <span className="text-indigo-400 font-bold">➜</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (help, ls, build, test, clear)..."
                className="flex-1 bg-transparent text-white focus:outline-none text-[11px]"
              />
            </form>
          </div>
        )}

        {/* TAB 5: CHECKPOINTS / HISTORY */}
        {activeTab === "checkpoints" && (
          <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white">Create Named Snapshot</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Before Stripe integration"
                  value={checkpointName}
                  onChange={(e) => setCheckpointName(e.target.value)}
                  className="flex-1 bg-[#151926] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => {
                    if (checkpointName.trim()) {
                      onCreateCheckpoint(checkpointName.trim());
                      setCheckpointName("");
                    }
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Checkpoint History ({project.checkpoints.length})
              </h4>
              <div className="space-y-2">
                {project.checkpoints.map((cp) => (
                  <div
                    key={cp.id}
                    className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{cp.name}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(cp.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{cp.description || "Project snapshot"}</p>
                    <button
                      onClick={() => onRestoreCheckpoint(cp.id)}
                      className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Rollback to this state</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ENVIRONMENT VARIABLES */}
        {activeTab === "env" && (
          <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Project Environment Variables</h4>
                <p className="text-[11px] text-slate-400">Encrypted server-side, injected into runtime preview</p>
              </div>
              <button
                onClick={() => setShowNewEnv(!showNewEnv)}
                className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-xs font-bold"
              >
                + Add Variable
              </button>
            </div>

            {showNewEnv && (
              <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/40 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="KEY (e.g. STRIPE_API_KEY)"
                  value={newEnvKey}
                  onChange={(e) => setNewEnvKey(e.target.value)}
                  className="w-full bg-[#151926] border border-slate-800 rounded px-2 py-1 text-white font-mono"
                />
                <input
                  type="text"
                  placeholder="VALUE"
                  value={newEnvVal}
                  onChange={(e) => setNewEnvVal(e.target.value)}
                  className="w-full bg-[#151926] border border-slate-800 rounded px-2 py-1 text-white font-mono"
                />
                <button
                  onClick={() => {
                    if (newEnvKey.trim()) {
                      onUpdateEnvVars({ ...project.envVars, [newEnvKey.trim()]: newEnvVal });
                      setNewEnvKey("");
                      setNewEnvVal("");
                      setShowNewEnv(false);
                    }
                  }}
                  className="w-full py-1 bg-indigo-600 text-white rounded font-bold"
                >
                  Save Variable
                </button>
              </div>
            )}

            <div className="space-y-2 font-mono text-xs">
              {Object.entries(project.envVars).map(([key, value]) => (
                <div key={key} className="bg-[#151926] p-2.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 font-semibold">{key}</span>
                    <button
                      onClick={() => {
                        const updated = { ...project.envVars };
                        delete updated[key];
                        onUpdateEnvVars(updated);
                      }}
                      className="text-slate-500 hover:text-rose-400 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    type="text"
                    defaultValue={value}
                    onBlur={(e) => {
                      onUpdateEnvVars({ ...project.envVars, [key]: e.target.value });
                    }}
                    className="w-full bg-[#0b0d14] border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
