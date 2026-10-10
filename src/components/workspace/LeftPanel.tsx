"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, User, Sparkles, Send, Square, Play, RefreshCw, 
  Terminal, CheckCircle2, ChevronRight, ChevronDown, 
  Sliders, Layers, Zap, AlertCircle, Wrench, FileCode, Check
} from "lucide-react";
import { Project, ChatMessage } from "@/lib/storage/project-store";

interface LeftPanelProps {
  project: Project;
  onSendMessage: (prompt: string, mode: string, model: string) => void;
  isGenerating: boolean;
  onStopGeneration: () => void;
  currentStatus?: { step: string; message: string };
  currentPlan?: string[];
  streamingText?: string;
  activeToolCalls?: Array<{ id: string; name: string; args: any; status: string; result?: string }>;
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
}: LeftPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [agentMode, setAgentMode] = useState<"architect" | "fast" | "debugger" | "refactor">(
    project.settings.agentMode || "architect"
  );
  const [model, setModel] = useState(project.settings.model || "gemini-3.8-flash");
  const [showToolsDrawer, setShowToolsDrawer] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [project.conversations, streamingText, currentStatus, activeToolCalls]);

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

  const suggestions = [
    "Build a SaaS dashboard with PostgreSQL & Stripe",
    "Add interactive dark mode toggle",
    "Add responsive mobile navigation drawer",
    "Add live search and category filter",
    "Add CSV export and analytics chart",
  ];

  return (
    <div className="h-full flex flex-col bg-[#0b0d14] border-r border-[#1e2436] overflow-hidden">
      {/* Top Controls: Mode & Model */}
      <div className="p-3 border-b border-[#1e2436] bg-[#0e111a] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Coding Agent</span>
          </div>

          {/* Model Selector */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={isGenerating}
            className="bg-[#151926] border border-slate-800 text-[11px] rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="gemini-3.8-flash">Gemini 3.8 Flash (High Speed)</option>
            <option value="claude-sonnet-5">Claude 3.7 Sonnet / Fable</option>
            <option value="gpt-6-astra">GPT-6 Astra / 4o</option>
            <option value="deepseek-r1">DeepSeek R1 Reasoning</option>
            <option value="ollama-qwen">Ollama Local (Offline)</option>
          </select>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-[#151926] p-0.5 rounded-lg border border-slate-800/80 text-[10px] font-medium">
          {[
            { id: "architect", label: "Architect", desc: "Full Plan & Build" },
            { id: "fast", label: "Fast Edit", desc: "Targeted Patches" },
            { id: "debugger", label: "Debugger", desc: "Fix Errors" },
            { id: "refactor", label: "Refactor", desc: "Clean & Polish" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setAgentMode(mode.id as any)}
              disabled={isGenerating}
              className={`py-1 rounded text-center transition-all ${
                agentMode === mode.id
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Status Banner (When Generating) */}
      {isGenerating && currentStatus && (
        <div className="bg-indigo-950/40 border-b border-indigo-500/20 px-3 py-2 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="font-semibold text-indigo-300 capitalize">{currentStatus.step}:</span>
            <span className="text-slate-300 text-[11px] truncate max-w-[200px] sm:max-w-xs">
              {currentStatus.message}
            </span>
          </div>
          <button
            onClick={onStopGeneration}
            className="flex items-center gap-1 text-[10px] bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 px-2 py-0.5 rounded border border-rose-500/30 font-medium"
          >
            <Square className="w-2.5 h-2.5 fill-rose-300" />
            Stop
          </button>
        </div>
      )}

      {/* Plan Stepper (if active) */}
      {currentPlan && currentPlan.length > 0 && (
        <div className="bg-[#121624] border-b border-slate-800/80 p-3 text-xs space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Agent Plan Execution</span>
          </div>
          <div className="space-y-1 pt-1">
            {currentPlan.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
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
            className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              {msg.role === "user" ? (
                <>
                  <span>You</span>
                  <User className="w-3 h-3 text-slate-400" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-indigo-400" />
                  <span className="font-semibold text-slate-400">NOVAFORGE Agent</span>
                </>
              )}
            </div>

            <div
              className={`rounded-2xl px-4 py-3 leading-relaxed max-w-[92%] whitespace-pre-line text-xs ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/10"
                  : "bg-[#141824] border border-[#1e2436] text-slate-200 rounded-tl-sm shadow-sm"
              }`}
            >
              {msg.content}
            </div>

            {/* Display tool calls if recorded in message */}
            {msg.toolCalls && msg.toolCalls.length > 0 && (
              <div className="w-full max-w-[92%] bg-[#0e111a] border border-slate-800/80 rounded-xl p-2.5 space-y-1.5 font-mono text-[10px]">
                <div className="text-slate-400 font-bold flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-indigo-400" />
                  <span>Executed {msg.toolCalls.length} Tool(s):</span>
                </div>
                <div className="space-y-1">
                  {msg.toolCalls.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300 bg-slate-900/60 px-2 py-1 rounded">
                      <span className="text-indigo-300">➜ {t.name}</span>
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
          <div className="flex flex-col gap-1.5 items-start animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-400">
              <Bot className="w-3 h-3 text-indigo-400" />
              <span className="font-semibold">NOVAFORGE Agent (Streaming)</span>
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 leading-relaxed max-w-[92%] bg-[#141824] border border-indigo-500/30 text-slate-200 text-xs whitespace-pre-line shadow-lg">
              {streamingText}
              <span className="inline-block w-1.5 h-3.5 bg-indigo-400 animate-pulse ml-1 align-middle" />
            </div>
          </div>
        )}

        {/* Active Tool Calls (Live) */}
        {isGenerating && activeToolCalls && activeToolCalls.length > 0 && (
          <div className="bg-[#0e111a] border border-indigo-500/30 rounded-xl p-2.5 space-y-1.5 font-mono text-[10px]">
            <div className="text-slate-400 font-bold flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Wrench className="w-3 h-3 text-indigo-400" />
                <span>Active Tool Execution:</span>
              </div>
              <span className="text-indigo-400 animate-pulse">Running</span>
            </div>
            {activeToolCalls.map((tc) => (
              <div key={tc.id} className="bg-slate-900/70 p-1.5 rounded flex items-center justify-between text-slate-300">
                <span className="text-indigo-300">{tc.name}</span>
                <span className={tc.status === "completed" ? "text-emerald-400" : "text-amber-400"}>
                  {tc.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Prompts (when idle) */}
      {!isGenerating && project.conversations.length < 3 && (
        <div className="px-3 py-2 border-t border-[#1e2436] bg-[#0d0f17]">
          <div className="text-[10px] text-slate-500 font-medium mb-1.5">Try a suggested prompt:</div>
          <div className="flex flex-wrap gap-1">
            {suggestions.slice(0, 3).map((s, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(s)}
                className="text-[10px] px-2 py-1 rounded bg-[#151926] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Composer */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#1e2436] bg-[#0e111a] space-y-2">
        <div className="relative bg-[#151926] border border-slate-800 rounded-xl focus-within:border-indigo-500/50 transition-all p-2">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            placeholder={
              isGenerating
                ? "Agent is building your application..."
                : "Describe changes or features to build... (Enter to send)"
            }
            rows={3}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/60">
            <span className="text-[10px] text-slate-500">
              Shift + Enter for new line
            </span>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="p-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all active:scale-95"
            >
              <span>Build</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
