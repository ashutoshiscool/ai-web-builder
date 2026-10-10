"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, ArrowRight, Sparkles, Terminal, Code2, Cpu, Shield, 
  Layers, Rocket, Play, CheckCircle2, ChevronRight, Star,
  Database, CreditCard, Users, ExternalLink, Globe, Lock,
  PlusCircle, RefreshCw, Bot, Monitor, Check, Copy, Folder
} from "lucide-react";
import { TEMPLATES } from "@/lib/templates/template-registry";

export default function LandingPage() {
  const [promptInput, setPromptInput] = useState(
    "Build a production SaaS dashboard with auth, PostgreSQL schemas, and Stripe billing"
  );
  const [activeDemoTab, setActiveDemoTab] = useState<"editor" | "preview" | "agent">("editor");

  const flagshipModels = [
    { name: "Gemini 3.8 Flash", desc: "Flagship speed & 1M context", badge: "Google" },
    { name: "Gemini 3.8 High", desc: "Deep multi-step reasoning", badge: "Google" },
    { name: "Gemini 2.5 Pro", desc: "2M multimodal reasoning", badge: "Google" },
    { name: "Claude Sonnet 5", desc: "Complex code decomposition", badge: "Anthropic" },
    { name: "DeepSeek R1", desc: "Open reasoning trace engine", badge: "DeepSeek" },
    { name: "GPT-6 Astra", desc: "Autonomous tool execution", badge: "OpenAI" },
  ];

  return (
    <div className="min-h-screen bg-[#181818] text-[#cccccc] font-sans selection:bg-[#007acc] selection:text-white overflow-x-hidden">
      {/* Top VS Code-inspired Nav */}
      <nav className="border-b border-[#2b2b2b] bg-[#181818] px-5 py-3 flex items-center justify-between sticky top-0 z-50 font-mono text-xs">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-[#007acc] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1085de] transition-colors">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-semibold text-white tracking-tight">
              NOVAFORGE
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#252526] text-slate-400 border border-[#3c3c3c] text-[10px]">
              v2.4
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5 text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">Architecture</Link>
            <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/workspace"
            className="px-3 py-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-medium flex items-center gap-1.5 shadow-sm transition-all active:scale-95 text-xs"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Minimalist Hero Section */}
      <section className="pt-16 pb-12 px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#252526] border border-[#333333] text-slate-300 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Autonomous AI Engineering Studio — Zero-Port Sandbox Runtime</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl mx-auto font-sans">
          Software engineering at the speed of thought.
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Type what you want to build. NOVAFORGE executes genuine tool-calling workflows that inspect dependencies, write TypeScript code, and run instant in-browser previews without port conflicts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 font-mono text-xs">
          <Link
            href="/workspace"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-medium shadow flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Launch Developer Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/templates"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#252526] hover:bg-[#2d2d2d] border border-[#333333] text-slate-300 hover:text-white rounded font-medium flex items-center justify-center gap-1.5 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Browse 8+ Starter Blueprints</span>
          </Link>
        </div>

        {/* Minimalist Prompt Bar */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="bg-[#1e1e1e] rounded border border-[#333333] p-2 flex items-center gap-2 text-left shadow-lg">
            <Sparkles className="w-4 h-4 text-[#007acc] ml-2 flex-shrink-0" />
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
            />
            <Link
              href="/workspace"
              className="px-3 py-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white rounded text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Build
            </Link>
          </div>
        </div>

        {/* VS Code Studio Mockup */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="rounded border border-[#2b2b2b] bg-[#1e1e1e] shadow-2xl overflow-hidden text-left font-mono text-xs">
            {/* Title Bar */}
            <div className="h-8 bg-[#181818] border-b border-[#2b2b2b] px-3 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f14c4c]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#cca700]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#388a34]" />
                <span className="ml-2 text-slate-300">NOVAFORGE — PulseSaaS Production Suite</span>
              </div>

              <div className="flex items-center gap-1 bg-[#252526] p-0.5 rounded border border-[#333333] text-[10px]">
                <button
                  onClick={() => setActiveDemoTab("editor")}
                  className={`px-2 py-0.5 rounded ${activeDemoTab === "editor" ? "bg-[#007acc] text-white" : "text-slate-400"}`}
                >
                  Editor (Monaco)
                </button>
                <button
                  onClick={() => setActiveDemoTab("preview")}
                  className={`px-2 py-0.5 rounded ${activeDemoTab === "preview" ? "bg-[#007acc] text-white" : "text-slate-400"}`}
                >
                  Live Preview
                </button>
                <button
                  onClick={() => setActiveDemoTab("agent")}
                  className={`px-2 py-0.5 rounded ${activeDemoTab === "agent" ? "bg-[#007acc] text-white" : "text-slate-400"}`}
                >
                  Copilot Stream
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="h-80 bg-[#1e1e1e] flex overflow-hidden">
              {/* Fake Activity Bar */}
              <div className="w-10 bg-[#181818] border-r border-[#2b2b2b] py-3 flex flex-col items-center gap-4 text-slate-500">
                <Code2 className="w-4 h-4 text-[#007acc]" />
                <Folder className="w-4 h-4 hover:text-white" />
                <Terminal className="w-4 h-4 hover:text-white" />
                <Shield className="w-4 h-4 hover:text-white" />
              </div>

              {/* Panel Content */}
              <div className="flex-1 p-4 overflow-y-auto leading-relaxed">
                {activeDemoTab === "editor" && (
                  <div className="text-slate-300 space-y-1 text-[11.5px]">
                    <div className="text-[#6a9955]">// src/App.tsx — Compiled with React 19 & Tailwind CSS</div>
                    <div><span className="text-[#c586c0]">import</span> React, &#123; useState &#125; <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react'</span>;</div>
                    <div><span className="text-[#c586c0]">import</span> &#123; DollarSign, Users, Database, Shield &#125; <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'lucide-react'</span>;</div>
                    <div className="pt-2"><span className="text-[#569cd6]">export default function</span> <span className="text-[#dcdcaa]">SaaSDashboard</span>() &#123;</div>
                    <div className="pl-4">const [mrr, setMrr] = useState(48250);</div>
                    <div className="pl-4">const [activeUsers, setActiveUsers] = useState(1429);</div>
                    <div className="pl-4 pt-2">return (</div>
                    <div className="pl-8">&lt;<span className="text-[#569cd6]">div</span> className=<span className="text-[#ce9178]">"min-h-screen bg-[#181818] text-white p-6"</span>&gt;</div>
                    <div className="pl-12">&lt;<span className="text-[#569cd6]">h1</span> className=<span className="text-[#ce9178]">"text-xl font-bold"</span>&gt;Enterprise Metrics&lt;/<span className="text-[#569cd6]">h1</span>&gt;</div>
                    <div className="pl-8">&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>
                    <div className="pl-4">);</div>
                    <div>&#125;</div>
                  </div>
                )}

                {activeDemoTab === "preview" && (
                  <div className="h-full flex flex-col justify-between p-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-2">
                        <span className="font-bold text-white text-xs">Production Dashboard Preview</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">Sandboxed Zero-Port</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#252526] p-2.5 rounded border border-[#333333]">
                          <div className="text-[10px] text-slate-400">MRR Revenue</div>
                          <div className="text-base font-bold text-white mt-1">$48,250</div>
                        </div>
                        <div className="bg-[#252526] p-2.5 rounded border border-[#333333]">
                          <div className="text-[10px] text-slate-400">Subscribers</div>
                          <div className="text-base font-bold text-white mt-1">1,429</div>
                        </div>
                        <div className="bg-[#252526] p-2.5 rounded border border-[#333333]">
                          <div className="text-[10px] text-slate-400">Latency</div>
                          <div className="text-base font-bold text-emerald-400 mt-1">1.8 ms</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 border-t border-[#2b2b2b] pt-2 flex items-center justify-between">
                      <span>Live hot-reloading on /preview/:id</span>
                      <Link href="/workspace" className="text-[#007acc] hover:underline">Open Live Workspace →</Link>
                    </div>
                  </div>
                )}

                {activeDemoTab === "agent" && (
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Copilot Execution Trace (Gemini 3.8 Flash):</span>
                    </div>
                    <div className="space-y-1 text-slate-300 pl-4 border-l border-[#2b2b2b]">
                      <div>✓ Tool `inspect_project`: Validated file structure &amp; dependencies</div>
                      <div>✓ Tool `write_file`: Wrote `src/App.tsx` (5,420 bytes)</div>
                      <div>✓ Tool `create_checkpoint`: Saved snapshot `Initial SaaS Architecture`</div>
                      <div>✓ Tool `get_preview_status`: Runtime healthy, Babel compiled in 82ms</div>
                    </div>
                    <div className="p-2 bg-[#252526] border border-[#333333] rounded text-emerald-400 text-[10px]">
                      ● Status: Compilation successful. Application ready for preview.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fake Status Bar */}
            <div className="h-6 bg-[#181818] border-t border-[#2b2b2b] px-3 flex items-center justify-between text-[10px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="text-slate-300"> main</span>
                <span>⨂ 0  ⚠ 0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-400">Gemini 3.8 Flash</span>
                <span>TypeScript JSX</span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Models Grid */}
      <section className="py-12 px-6 max-w-5xl mx-auto border-t border-[#2b2b2b] space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">Full Frontier AI Model Fleet</h2>
          <p className="text-xs text-slate-400 font-mono">Connected directly to high-throughput inference proxy.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {flagshipModels.map((m, idx) => (
            <div key={idx} className="p-3 bg-[#1e1e1e] border border-[#2b2b2b] rounded hover:border-[#3c3c3c] transition-colors space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{m.name}</span>
                <span className="text-[10px] text-slate-500 bg-[#252526] px-1.5 py-0.2 rounded">{m.badge}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Principles (Minimal Bento) */}
      <section id="features" className="py-14 px-6 max-w-5xl mx-auto border-t border-[#2b2b2b] space-y-8">
        <div className="text-center space-y-1">
          <div className="text-[11px] font-mono text-[#007acc] uppercase tracking-wider font-semibold">Engineered For Production</div>
          <h2 className="text-2xl font-bold text-white">Built for developers who need real code</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-[#1e1e1e] border border-[#2b2b2b] rounded space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#007acc]" />
              <span>13+ Autonomous Tools</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11.5px]">
              Calls real tools: <code>list_files</code>, <code>read_file</code>, <code>write_file</code>, <code>apply_patch</code>, and <code>create_checkpoint</code> to modify files on disk.
            </p>
          </div>

          <div className="p-4 bg-[#1e1e1e] border border-[#2b2b2b] rounded space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Port In-Browser Sandbox</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11.5px]">
              Every project runs in an isolated browser sandbox with Babel compilation and postMessage console capture. Multiple users can run and test simultaneously without port conflicts.
            </p>
          </div>

          <div className="p-4 bg-[#1e1e1e] border border-[#2b2b2b] rounded space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#007acc]" />
              <span>Monaco Editor &amp; Diff Inspector</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11.5px]">
              Real VS Code code editing in your browser. Inspect syntax-highlighted side-by-side diffs and accept or reject patches cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2b2b2b] bg-[#141414] py-8 px-6 text-xs text-slate-500 font-mono">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#007acc] flex items-center justify-center text-white">
              <Zap className="w-3 h-3 fill-white" />
            </div>
            <span className="font-bold text-slate-300">NOVAFORGE</span>
            <span>© 2026 Developer Studio</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/workspace" className="hover:text-white">Workspace</Link>
            <Link href="/templates" className="hover:text-white">Templates</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/docs" className="hover:text-white">Docs</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
