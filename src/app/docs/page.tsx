"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, BookOpen, Terminal, Code2, Shield, Cpu, Layers, ArrowRight } from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      <nav className="border-b border-white/[0.06] bg-[#08090d]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">
            NOVAFORGE
          </span>
          <span className="text-xs text-slate-500">/ Docs</span>
        </Link>

        <Link href="/workspace" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
          Open Workspace →
        </Link>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-56 space-y-2 text-xs">
          <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-3">
            Documentation Index
          </div>
          {[
            { id: "overview", label: "Architecture Overview", icon: BookOpen },
            { id: "agent", label: "Agentic Tool Calling", icon: Terminal },
            { id: "gateway", label: "Multi-Model Gateway", icon: Cpu },
            { id: "runtime", label: "Live Preview Sandbox", icon: Layers },
            { id: "security", label: "Security & Isolation", icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 bg-[#0d0f17] border border-white/[0.08] rounded-2xl p-6 md:p-8 text-xs leading-relaxed text-slate-300">
          {activeSection === "overview" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">NOVAFORGE Architecture Overview</h2>
              <p>
                NOVAFORGE is designed from the ground up as a production-grade full-stack AI development environment. Unlike naive prompt generators that merely create static markdown or simulated screenshots, NOVAFORGE coordinates a persistent project filesystem, an autonomous coding agent, a real-time Monaco editor, and an isolated live preview sandbox.
              </p>
              <div className="p-4 bg-[#121624] border border-slate-800 rounded-xl space-y-2 font-mono text-[11px]">
                <div className="text-indigo-400 font-bold">System Topology:</div>
                <div className="text-slate-300">Client UI (Next.js 16) ⟷ SSE Stream API ⟷ Autonomous Agent ⟷ AI Gateway (Local/OpenAI/Claude)</div>
                <div className="text-slate-400 pl-4">↳ Project Store (Disk /storage/projects) ⟷ Sandboxed Preview (WebContainer/Babel)</div>
              </div>
            </div>
          )}

          {activeSection === "agent" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Agentic Tool Calling Specification</h2>
              <p>
                The coding agent operates via structured tool execution. Each turn evaluates the current requirements, inspects project files, and emits explicit function calls:
              </p>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2.5 bg-[#121624] rounded-lg border border-slate-800">
                  <span className="text-indigo-400 font-bold">list_files()</span>: Inspects all files in the current project tree.
                </div>
                <div className="p-2.5 bg-[#121624] rounded-lg border border-slate-800">
                  <span className="text-indigo-400 font-bold">read_file(path)</span>: Reads the exact UTF-8 contents of a file.
                </div>
                <div className="p-2.5 bg-[#121624] rounded-lg border border-slate-800">
                  <span className="text-indigo-400 font-bold">write_file(path, content)</span>: Atomically persists changes to disk.
                </div>
                <div className="p-2.5 bg-[#121624] rounded-lg border border-slate-800">
                  <span className="text-indigo-400 font-bold">apply_patch(path, targetText, replacementText)</span>: Surgical diff patches.
                </div>
                <div className="p-2.5 bg-[#121624] rounded-lg border border-slate-800">
                  <span className="text-indigo-400 font-bold">create_checkpoint(name)</span>: Creates a rollback snapshot.
                </div>
              </div>
            </div>
          )}

          {activeSection === "gateway" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Provider-Agnostic AI Gateway</h2>
              <p>
                NOVAFORGE decouples AI model execution through a unified gateway. It comes out-of-the-box with a high-speed local proxy supporting Gemini 3.8 Flash, DeepSeek R1, and Claude Sonnet, while allowing users to configure custom API keys for OpenAI, Anthropic, OpenRouter, and Ollama.
              </p>
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-300">
                <strong>Zero Leakage:</strong> Provider API keys are handled strictly server-side and never exposed to the client application.
              </div>
            </div>
          )}

          {activeSection === "runtime" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Live Sandboxed Preview Runner</h2>
              <p>
                The center preview panel loads an isolated execution iframe with on-the-fly Babel JSX transformation, React 19 component rendering, Tailwind CSS classes, and Lucide icons. Console diagnostics and unhandled exceptions are caught and reported back to the parent window for self-healing.
              </p>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Security &amp; Sandboxing Safeguards</h2>
              <p>
                All file paths are validated against directory traversal attacks (<code>..</code> and leading slashes are prohibited). Code execution is isolated within sandboxed iframes with strict permissions, preventing arbitrary host system access.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
