"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  Bot, User, Sparkles, Send, Square, Play, RefreshCw, 
  Terminal, CheckCircle2, ChevronRight, ChevronDown, 
  Sliders, Layers, Zap, AlertCircle, Wrench, FileCode, Check,
  Cpu, ArrowRight, Copy, CheckCheck, Code2, ArrowUpRight
} from "lucide-react";
import { Project, ChatMessage, AgentMode } from "@/lib/storage/project-store";
import { AVAILABLE_MODELS } from "@/lib/providers/ai-gateway";

interface LeftPanelProps {
  project: Project;
  onSendMessage: (prompt: string, mode: string, model: string) => void;
  isGenerating: boolean;
  onStopGeneration: () => void;
  currentStatus?: { step: string; message: string };
  currentPlan?: string[];
  streamingText?: string;
  activeToolCalls?: Array<{ id: string; name: string; args: any; status: string; result?: string }>;
  onApplyCode?: (filename: string, code: string) => void;
}

// Minimalist VS Code-style Code Block with Line Numbers & 1-Click Copy / Apply
function CodeBlockViewer({ 
  code, 
  language, 
  filename,
  isStreaming,
  onApply,
}: { 
  code: string; 
  language: string; 
  filename?: string;
  isStreaming?: boolean;
  onApply?: (filename: string, code: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const targetFile = filename || (
    language.includes("tsx") || language.includes("jsx") || language.includes("react")
      ? "src/App.tsx"
      : language.includes("css")
      ? "src/app/globals.css"
      : language.includes("json")
      ? "package.json"
      : language.includes("html")
      ? "index.html"
      : "src/App.tsx"
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (onApply) {
      onApply(targetFile, code);
      setApplied(true);
      setTimeout(() => setApplied(false), 2500);
    }
  };

  const lines = useMemo(() => code.split("\n"), [code]);
  const displayFilename = filename || targetFile;

  return (
    <div className="my-2.5 rounded border border-[#2b2b2b] bg-[#141414] overflow-hidden text-xs font-mono shadow-md">
      {/* VS Code Code Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#1f1f1f] border-b border-[#2b2b2b] text-[11px] select-none">
        <div className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-[#007acc]" />
          <span className="font-semibold text-slate-200">{displayFilename}</span>
          {isStreaming ? (
            <span className="flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded border border-blue-500/20 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Streaming
            </span>
          ) : (
            <span className="text-[10px] text-slate-500 uppercase">{language || "text"}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">


          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-[#2d2d2d] transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-2.5 overflow-x-auto text-[11.5px] leading-relaxed text-slate-300 max-h-96 overflow-y-auto flex font-mono bg-[#181818]">
        {/* Line Numbers */}
        <div className="pr-3 border-r border-[#2b2b2b] text-[#5c5c5c] select-none text-right font-mono text-[10px] leading-relaxed">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div className="pl-3 flex-1 overflow-x-auto">
          <pre className="whitespace-pre">{code}</pre>
        </div>
      </div>
    </div>
  );
}

// Robust Markdown Parser that handles BOTH closed AND currently streaming unclosed code blocks
function MessageContent({ 
  text, 
  isStreaming,
  onApply,
}: { 
  text: string; 
  isStreaming?: boolean;
  onApply?: (filename: string, code: string) => void;
}) {
  const parts: React.ReactNode[] = [];
  const codeBlockStartRegex = /```([a-zA-Z0-9_\-+]*)(?:[:\s]+(?:filename=|file=)?["'\(]?([a-zA-Z0-9_.\-\/]+\.[a-zA-Z0-9]+)["'\)]?)?\r?\n/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let blockIndex = 0;

  while ((match = codeBlockStartRegex.exec(text)) !== null) {
    const startIndex = match.index;
    const lang = match[1] || "";
    let filename = match[2] || "";
    const codeStartIndex = startIndex + match[0].length;

    // Preceding text before code block
    if (startIndex > lastIndex) {
      const plainText = text.substring(lastIndex, startIndex);
      parts.push(
        <div key={`text-${lastIndex}`} className="whitespace-pre-line leading-relaxed text-slate-300">
          {plainText}
        </div>
      );
    }

    // Find closing triple backtick
    const closingIndex = text.indexOf("```", codeStartIndex);

    if (closingIndex !== -1) {
      // Completed closed code block
      const code = text.substring(codeStartIndex, closingIndex);

      if (!filename) {
        const firstLineMatch = /^(?:\/\/\s*(?:file(?:path)?:?|\b)\s*|\/\*\s*(?:file(?:path)?:?|\b)\s*)([a-zA-Z0-9_.\-\/]+\.[a-zA-Z0-9]+)/i.exec(code.trimStart());
        if (firstLineMatch) {
          filename = firstLineMatch[1];
        }
      }

      parts.push(
        <CodeBlockViewer
          key={`code-${blockIndex++}`}
          code={code}
          language={lang}
          filename={filename}
          isStreaming={false}
          onApply={onApply}
        />
      );
      lastIndex = closingIndex + 3;
      codeBlockStartRegex.lastIndex = lastIndex;
    } else {
      // Unclosed code block (currently streaming in progress!)
      const code = text.substring(codeStartIndex);
      parts.push(
        <CodeBlockViewer
          key={`code-streaming-${blockIndex++}`}
          code={code}
          language={lang}
          filename={filename}
          isStreaming={isStreaming || true}
          onApply={onApply}
        />
      );
      lastIndex = text.length;
      break;
    }
  }

  // Trailing text after last code block
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    parts.push(
      <div key={`text-remaining-${lastIndex}`} className="whitespace-pre-line leading-relaxed text-slate-300">
        {remaining}
      </div>
    );
  }

  return <div className="space-y-1.5">{parts}</div>;
}

export function LeftPanel({
  project,
  onSendMessage,
  isGenerating,
  onStopGeneration,
  currentStatus,
  currentPlan,
  streamingText,
  activeToolCalls,
  onApplyCode,
}: LeftPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [agentMode, setAgentMode] = useState<AgentMode>(
    project.settings.agentMode || "architect"
  );
  const [model, setModel] = useState(project.settings.model || "gemini-2.5-flash");

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on conversation or streaming updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [project.conversations, streamingText, currentStatus, activeToolCalls]);

  // Sync mode if changed externally (e.g. Ask Agent to Fix button in preview)
  useEffect(() => {
    if (project.settings.agentMode && project.settings.agentMode !== agentMode) {
      setAgentMode(project.settings.agentMode);
    }
  }, [project.settings.agentMode]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onSendMessage(prompt.trim(), agentMode, model);
    setPrompt("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const categories = [
    "Google Gemini",
    "Anthropic Claude",
    "OpenAI",
    "DeepSeek",
    "xAI Grok",
    "Moonshot Kimi",
    "Qwen & Open Weights"
  ] as const;

  const suggestions = [
    "Add interactive dark mode toggle",
    "Add responsive mobile navigation drawer",
    "Add live search and category filter",
    "Add CSV export and analytics chart",
    "Add authentication modal and JWT state",
    "Add real-time KPI metrics and sparklines",
  ];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] border-r border-[#2b2b2b] overflow-hidden select-text font-sans">
      {/* Top Controls: Veronica Header & Model Selector */}
      <div className="p-2.5 border-b border-[#2b2b2b] bg-[#181818] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-[#007acc]" />
            <span className="font-mono text-[11px] tracking-wide text-slate-300">VERONICA COPILOT</span>
          </div>

          {/* Model Selector with All Flagship Models */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={isGenerating}
            className="bg-[#252526] border border-[#3c3c3c] hover:border-slate-500 text-[11px] rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-[#007acc] font-mono max-w-[210px] transition-colors"
          >
            {categories.map((cat) => (
              <optgroup key={cat} label={cat} className="bg-[#181818] text-[#007acc] font-bold">
                {AVAILABLE_MODELS.filter((m) => m.category === cat).map((m) => (
                  <option key={m.id} value={m.id} className="text-slate-200 bg-[#1e1e1e]">
                    {m.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* 5 Modes Selector Tabs */}
        <div className="grid grid-cols-5 gap-1 bg-[#141414] p-0.5 rounded border border-[#2b2b2b] text-[10px] font-mono">
          {[
            { id: "architect", label: "Architect", title: "Technical Leader: Gather context & create detailed plans" },
            { id: "code", label: "Code", title: "Software Engineer: Implement production code & components" },
            { id: "ask", label: "Ask", title: "Technical Assistant: Q&A & conceptual guidance" },
            { id: "debug", label: "Debug", title: "Expert Debugger: Systematic problem diagnosis & repair" },
            { id: "orchestrator", label: "Orchestrator", title: "Workflow Orchestrator: Multi-mode task delegation" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setAgentMode(mode.id as any)}
              disabled={isGenerating}
              title={mode.title}
              className={`py-1 px-0.5 rounded text-center transition-all truncate ${
                agentMode === mode.id
                  ? "bg-[#007acc] text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#252526]"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Active Mode Role Description */}
        <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
          <span className="text-slate-400 truncate">
            {agentMode === "architect" && "Planning mode: Inquires & creates plans (Switch to Code to auto-apply)"}
            {agentMode === "code" && "Coding mode: Directly modifies & hot-reloads project files live in preview"}
            {agentMode === "ask" && "Ask mode: Technical Q&A & conceptual guidance"}
            {agentMode === "debug" && "Debug mode: Systematic diagnosis & direct surgical fixes"}
            {agentMode === "orchestrator" && "Orchestrator: Multi-mode task coordination"}
          </span>
          {agentMode === "architect" && (
            <button
              type="button"
              onClick={() => setAgentMode("code")}
              className="text-[#007acc] hover:text-white underline ml-1 shrink-0 font-bold"
              title="Switch to Code mode to apply code directly to project"
            >
              Switch to Code
            </button>
          )}
        </div>
      </div>

      {/* Real-time Status Banner (When Generating) */}
      {isGenerating && currentStatus && (
        <div className="bg-[#1f2430] border-b border-[#007acc]/40 px-3 py-2 flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#007acc] animate-ping" />
            <span className="font-bold text-blue-300 font-mono uppercase text-[10px]">{currentStatus.step}:</span>
            <span className="text-slate-300 text-[11px] truncate max-w-[200px] sm:max-w-xs">
              {currentStatus.message}
            </span>
          </div>
          <button
            onClick={onStopGeneration}
            className="flex items-center gap-1 text-[10px] bg-rose-950/60 text-rose-300 hover:bg-rose-900 px-2 py-0.5 rounded border border-rose-500/30 font-medium transition-colors"
          >
            <Square className="w-2.5 h-2.5 fill-rose-300" />
            Stop
          </button>
        </div>
      )}

      {/* Plan Stepper (if active) */}
      {currentPlan && currentPlan.length > 0 && (
        <div className="bg-[#1b1d23] border-b border-[#2b2b2b] p-3 text-xs space-y-1.5 font-mono">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#007acc]" />
            <span>Agent Plan Execution</span>
          </div>
          <div className="space-y-1 pt-1">
            {currentPlan.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#007acc] flex-shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {project.conversations.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end" : "items-start"} animate-fade-in`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              {msg.role === "user" ? (
                <>
                  <span>You</span>
                  <User className="w-3 h-3 text-slate-400" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-[#007acc]" />
                  <span className="font-semibold text-slate-300">veronica</span>
                </>
              )}
            </div>

            <div
              className={`rounded-lg px-3.5 py-2.5 leading-relaxed max-w-[95%] text-xs ${
                msg.role === "user"
                  ? "bg-[#0e639c] text-white rounded-tr-none shadow-sm"
                  : "bg-[#252526] border border-[#333333] text-slate-200 rounded-tl-none shadow-sm"
              }`}
            >
              <MessageContent text={msg.content} onApply={onApplyCode} />
            </div>

            {/* Display tool calls if recorded in message */}
            {msg.toolCalls && msg.toolCalls.length > 0 && (
              <div className="w-full max-w-[95%] bg-[#181818] border border-[#2b2b2b] rounded p-2.5 space-y-1.5 font-mono text-[10px]">
                <div className="text-slate-400 font-bold flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-[#007acc]" />
                  <span>Executed {msg.toolCalls.length} Tool(s):</span>
                </div>
                <div className="space-y-1">
                  {msg.toolCalls.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300 bg-[#1f1f1f] px-2 py-1 rounded border border-[#2b2b2b]">
                      <span className="text-blue-300">➜ {t.name}</span>
                      <span className="text-emerald-400 font-semibold">{t.status || "completed"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live Streaming Content (during generation) */}
        {isGenerating && streamingText && (
          <div className="flex flex-col gap-1.5 items-start animate-fade-in">
            <div className="flex items-center gap-1.5 text-[10px] text-[#007acc] font-mono">
              <Bot className="w-3 h-3 text-[#007acc]" />
              <span className="font-semibold">veronica ({agentMode})</span>
            </div>
            <div className="rounded-lg rounded-tl-none px-3.5 py-2.5 leading-relaxed max-w-[95%] bg-[#252526] border border-[#007acc]/40 text-slate-200 text-xs shadow-md">
              <MessageContent text={streamingText} isStreaming={true} onApply={onApplyCode} />
              <span className="inline-block w-1.5 h-3.5 bg-[#007acc] animate-pulse ml-1 align-middle" />
            </div>
          </div>
        )}

        {/* Active Tool Calls (Live) */}
        {isGenerating && activeToolCalls && activeToolCalls.length > 0 && (
          <div className="bg-[#181818] border border-[#007acc]/30 rounded p-2.5 space-y-1.5 font-mono text-[10px]">
            <div className="text-slate-400 font-bold flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Wrench className="w-3 h-3 text-[#007acc]" />
                <span>Active Tool Execution:</span>
              </div>
              <span className="text-blue-400 animate-pulse">Running</span>
            </div>
            {activeToolCalls.filter(Boolean).map((tc, idx) => (
              <div key={tc?.id || idx} className="bg-[#1f1f1f] p-1.5 rounded flex items-center justify-between text-slate-300 border border-[#2b2b2b]">
                <span className="text-blue-300">{tc?.name || "tool"}</span>
                <span className={tc?.status === "completed" ? "text-emerald-400" : "text-amber-400"}>
                  {tc?.status || "running"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Prompts (when idle) */}
      {!isGenerating && (
        <div className="px-3 py-2 border-t border-[#2b2b2b] bg-[#181818]">
          <div className="text-[10px] text-slate-400 font-medium mb-1.5 flex items-center justify-between font-mono">
            <span>Quick Enhancements:</span>
            <span className="text-[#007acc] text-[9px]">1-Click Action</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(s)}
                className="text-[10px] px-2 py-0.5 rounded bg-[#252526] hover:bg-[#2d2d2d] border border-[#333333] hover:border-slate-500 text-slate-300 hover:text-white transition-all text-left truncate max-w-[200px]"
                title={s}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Composer (VS Code Terminal Prompt Style) */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#2b2b2b] bg-[#181818] space-y-2">
        <div className="relative bg-[#252526] border border-[#333333] rounded focus-within:border-[#007acc] transition-all p-2">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            placeholder={
              isGenerating
                ? "veronica is generating..."
                : agentMode === "architect"
                ? "Ask Veronica to plan architecture, gather context & specifications..."
                : agentMode === "code"
                ? "Ask Veronica to engineer components, build features & write code..."
                : agentMode === "ask"
                ? "Ask Veronica any technical question or request an explanation..."
                : agentMode === "debug"
                ? "Describe the issue or paste runtime error logs for Veronica to repair..."
                : "Ask Veronica to orchestrate and delegate complex tasks across modes..."
            }
            rows={3}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between pt-1.5 border-t border-[#333333]/60 font-mono text-[10px]">
            <span className="text-slate-500">
              Shift + Enter for newline
            </span>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="px-3 py-1 rounded bg-[#007acc] hover:bg-[#0062a3] disabled:opacity-40 disabled:hover:bg-[#007acc] text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
