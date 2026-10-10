"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, ArrowRight, Sparkles, Terminal, Code2, Cpu, Shield, 
  Layers, Rocket, Play, CheckCircle2, ChevronRight, Star,
  Database, CreditCard, Users, ExternalLink, Globe, Lock,
  PlusCircle, RefreshCw, Bot, Monitor
} from "lucide-react";
import { TEMPLATES } from "@/lib/templates/template-registry";

export default function LandingPage() {
  const [promptInput, setPromptInput] = useState(
    "Build me a modern SaaS dashboard with authentication, a PostgreSQL database, Stripe subscriptions, an admin panel, and beautiful analytics."
  );
  const [activeDemoTab, setActiveDemoTab] = useState<"preview" | "code" | "agent">("preview");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px]" />
      </div>

      {/* Top Navbar */}
      <nav className="border-b border-white/[0.06] bg-[#08090d]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              NOVAFORGE
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              v2.4 Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">Capabilities</Link>
            <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/workspace"
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-sm animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>The Next-Generation AI Software Architect</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          Your ideas deserve to <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">exist</span>.
        </h1>

        <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Describe what you imagine. Build real applications with an AI coding agent that plans, writes, runs, and refines your code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/workspace"
            className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Start building for free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/workspace"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#141824] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
            <span>Explore the workspace</span>
          </Link>
        </div>

        {/* Interactive Prompt Composer Simulation */}
        <div className="pt-8 max-w-3xl mx-auto">
          <div className="glass-panel rounded-2xl p-3 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-center gap-2 text-left">
            <div className="flex-1 w-full flex items-center gap-2 px-3">
              <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <Link
              href={`/workspace`}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold whitespace-nowrap flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <span>Build App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Large Product Workspace Preview */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0d0f17] shadow-2xl overflow-hidden text-left">
            {/* Header Mock */}
            <div className="h-10 bg-[#121624] border-b border-slate-800 px-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-slate-400 font-mono text-[11px] ml-2">novaspace — PulseSaaS Studio</span>
              </div>

              <div className="flex items-center gap-1 bg-[#1a2033] p-0.5 rounded-lg text-[10px]">
                <button
                  onClick={() => setActiveDemoTab("preview")}
                  className={`px-2 py-0.5 rounded font-medium ${activeDemoTab === "preview" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
                >
                  Live Preview
                </button>
                <button
                  onClick={() => setActiveDemoTab("code")}
                  className={`px-2 py-0.5 rounded font-medium ${activeDemoTab === "code" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
                >
                  Monaco Code
                </button>
                <button
                  onClick={() => setActiveDemoTab("agent")}
                  className={`px-2 py-0.5 rounded font-medium ${activeDemoTab === "agent" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
                >
                  Agent Stream
                </button>
              </div>
            </div>

            {/* Content Mock */}
            <div className="h-96 md:h-[460px] bg-[#08090d] relative overflow-hidden flex">
              {activeDemoTab === "preview" && (
                <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-b from-[#0a0d17] to-[#08090d]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">P</div>
                        <span className="font-bold text-sm text-white">PulseSaaS Live Dashboard</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-medium">PostgreSQL Replicated</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#121624] p-3 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Monthly Revenue</div>
                        <div className="text-xl font-bold text-white mt-1">$48,250</div>
                        <div className="text-[10px] text-emerald-400 mt-1">+18.4% this month</div>
                      </div>
                      <div className="bg-[#121624] p-3 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Active Subscribers</div>
                        <div className="text-xl font-bold text-white mt-1">1,429</div>
                        <div className="text-[10px] text-indigo-400 mt-1">+124 new users</div>
                      </div>
                      <div className="bg-[#121624] p-3 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Query Latency</div>
                        <div className="text-xl font-bold text-emerald-400 mt-1">1.8 ms</div>
                        <div className="text-[10px] text-slate-400 mt-1">18.4k QPS</div>
                      </div>
                    </div>

                    <div className="bg-[#121624] p-4 rounded-xl border border-slate-800">
                      <div className="text-xs font-semibold text-white mb-2">Revenue Telemetry</div>
                      <div className="h-28 flex items-end gap-2 pt-2">
                        {[35, 48, 62, 54, 78, 92, 100].map((v, i) => (
                          <div key={i} className="flex-1 bg-indigo-600/60 hover:bg-indigo-500 rounded-t transition-all" style={{ height: `${v}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span>Rendered inside isolated browser WebContainer runtime</span>
                    <Link href="/workspace" className="text-indigo-400 font-semibold hover:underline">Open in Interactive Studio →</Link>
                  </div>
                </div>
              )}

              {activeDemoTab === "code" && (
                <div className="w-full h-full p-4 font-mono text-xs text-slate-300 bg-[#0a0d17] overflow-y-auto leading-relaxed">
                  <div className="text-indigo-400">// src/App.tsx — Generated by NOVAFORGE Coding Agent</div>
                  <div><span className="text-purple-400">import</span> React, &#123; useState &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'react'</span>;</div>
                  <div><span className="text-purple-400">import</span> &#123; DollarSign, Users, Database, Zap &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'lucide-react'</span>;</div>
                  <div className="pt-2"><span className="text-purple-400">export default function</span> <span className="text-blue-400">App</span>() &#123;</div>
                  <div className="pl-4">const [mrr, setMrr] = useState(48250);</div>
                  <div className="pl-4 pt-2">return (</div>
                  <div className="pl-8">&lt;<span className="text-indigo-300">div</span> className=<span className="text-emerald-300">"min-h-screen bg-slate-950 text-white p-6"</span>&gt;</div>
                  <div className="pl-12">&lt;<span className="text-indigo-300">h1</span>&gt;PulseSaaS Production Dashboard&lt;/<span className="text-indigo-300">h1</span>&gt;</div>
                  <div className="pl-8">&lt;/<span className="text-indigo-300">div</span>&gt;</div>
                  <div className="pl-4">);</div>
                  <div>&#125;</div>
                </div>
              )}

              {activeDemoTab === "agent" && (
                <div className="w-full h-full p-6 font-mono text-xs text-slate-300 bg-[#0a0d17] space-y-3">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Agent Plan Initialized:</span>
                  </div>
                  <div className="pl-4 space-y-1 text-slate-300">
                    <div>1. ✓ Inspected project directory &amp; dependencies</div>
                    <div>2. ✓ Created schema: users, subscriptions, audit_logs</div>
                    <div>3. ✓ Wrote src/App.tsx (Stripe tiers &amp; PostgreSQL monitors)</div>
                    <div>4. ✓ Verified syntax and compiler integrity</div>
                    <div>5. ✓ Saved version checkpoint [Initial Scaffold]</div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300">
                    ➜ Application is ready for preview. Hot reload server listening on :3000
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section (Bento Grid) */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-indigo-400">Core Engineering Principles</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built for developers who demand real code</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Not a toy mockup generator. NOVAFORGE executes genuine autonomous workflows that write files, manage state, and deploy to the cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Genuine Agentic Tools</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                The agent calls structured tools: <code>list_files</code>, <code>read_file</code>, <code>write_file</code>, <code>apply_patch</code>, and <code>create_checkpoint</code> to modify actual files on disk.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-indigo-400">13+ Standardized Tools</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Model AI Gateway</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Switch seamlessly between Gemini 3.8 Flash, Claude 3.7 Sonnet, GPT-6 Astra, and DeepSeek R1 with unified tool schemas and client privacy.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-purple-400">Provider Agnostic</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Isolated Live Preview</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Every project runs in an isolated sandbox with hot-reloading, simulated device viewports, and automated console capturing.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-emerald-400">Zero Port Conflicts</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Monaco Editor &amp; Diff Viewer</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Full-featured VS Code editor in your browser. Inspect syntax-highlighted side-by-side diffs before accepting AI changes.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-blue-400">Real IDE Experience</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Self-Healing Diagnostics</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                When runtime or compiler exceptions occur, the agent receives full stack traces and autonomously applies surgical patches.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-pink-400">Autonomous Recovery</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Instant GitHub &amp; Deploy</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Commit changes to GitHub repositories and trigger production edge deployments to Vercel, Netlify, or Cloudflare with one click.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-amber-400">Cloud Integrations</div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Curated Starter Architectures</h2>
            <p className="text-xs text-slate-400 mt-1">Ready-to-run applications you can launch in your workspace immediately.</p>
          </div>
          <Link
            href="/templates"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>View all 8+ templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.slice(0, 4).map((tpl) => (
            <div
              key={tpl.id}
              className="p-5 rounded-2xl bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">{tpl.category}</span>
                <h3 className="font-bold text-sm text-white mt-1">{tpl.name}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{tpl.description}</p>
              </div>

              <Link
                href="/workspace"
                className="w-full py-2 bg-[#151926] hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl text-xs font-medium text-center transition-all block"
              >
                Launch Starter
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Everything you need to know about NOVAFORGE runtime architecture.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How does NOVAFORGE differ from traditional AI code generators?",
              a: "Unlike tools that merely output snippets or pretend to execute code, NOVAFORGE creates actual files on disk, runs an isolated live preview runtime with hot reloading, executes structured tools, and provides a real Monaco code editor."
            },
            {
              q: "Are my API keys and sensitive project secrets secure?",
              a: "Yes. All provider API keys and environment variables are strictly encrypted server-side and never injected into the browser bundle or client context."
            },
            {
              q: "Can I export my project and run it locally?",
              a: "Absolutely. At any point, click 'Export ZIP' in the workspace to download the entire source code with package.json, ready to run with `npm install && npm run dev` on your own machine."
            },
            {
              q: "Which AI models can I use?",
              a: "NOVAFORGE includes out-of-the-box access to Gemini 3.8 Flash, Claude 3.7 Sonnet, GPT-6 Astra, and DeepSeek R1, with full support for local Ollama and custom OpenAI-compatible endpoints."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0d0f17] border border-white/[0.08] rounded-xl overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full p-4 text-left font-semibold text-xs text-slate-200 flex items-center justify-between hover:text-white"
              >
                <span>{item.q}</span>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${faqOpen === idx ? "rotate-90" : ""}`} />
              </button>
              {faqOpen === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#050608] py-12 px-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-white">NOVAFORGE</span>
            <span className="text-[11px] text-slate-500 ml-2">© 2026 NOVAFORGE Systems, Inc.</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/workspace" className="hover:text-white">Workspace</Link>
            <Link href="/templates" className="hover:text-white">Templates</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/docs" className="hover:text-white">Documentation</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
