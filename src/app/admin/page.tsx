"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, Shield, Activity, Users, Server, Database, AlertCircle, 
  CheckCircle2, RefreshCw, BarChart2, Cpu, Key, FileText
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "providers" | "sessions" | "audit">("overview");

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
          <span className="text-xs text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            Admin Console
          </span>
        </Link>

        <Link href="/workspace" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
          Open Workspace →
        </Link>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Observability &amp; Platform Health</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time telemetry, model availability, and execution queue metrics.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-bold">All Systems Operational</span>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#0d0f17] border border-white/[0.08] rounded-2xl">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Runtimes</div>
            <div className="text-2xl font-extrabold text-white mt-1">14 Sessions</div>
            <div className="text-[11px] text-emerald-400 mt-1">100% healthy sandboxes</div>
          </div>
          <div className="p-4 bg-[#0d0f17] border border-white/[0.08] rounded-2xl">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inference Gateway</div>
            <div className="text-2xl font-extrabold text-indigo-400 mt-1">42.8 tok/s</div>
            <div className="text-[11px] text-slate-400 mt-1">Avg TTFT: 142ms</div>
          </div>
          <div className="p-4 bg-[#0d0f17] border border-white/[0.08] rounded-2xl">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Projects Hosted</div>
            <div className="text-2xl font-extrabold text-white mt-1">2,841</div>
            <div className="text-[11px] text-emerald-400 mt-1">+184 this week</div>
          </div>
          <div className="p-4 bg-[#0d0f17] border border-white/[0.08] rounded-2xl">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Self-Healing Pass Rate</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">98.4%</div>
            <div className="text-[11px] text-slate-400 mt-1">Autonomous repair</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === "overview" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Model Providers
          </button>
          <button
            onClick={() => setActiveTab("sessions")}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === "sessions" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Active Execution Sandboxes
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === "audit" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Security Audit Logs
          </button>
        </div>

        {/* Tab 1: Model Providers */}
        {activeTab === "overview" && (
          <div className="bg-[#0d0f17] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Registered Model Endpoints &amp; Health</h3>
            <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#121624] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Model</th>
                    <th className="p-3">Provider Gateway</th>
                    <th className="p-3">Context Window</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3 font-semibold text-white">Gemini 3.8 Flash</td>
                    <td className="p-3 text-indigo-400 font-mono">http://127.0.0.1:8001/v1</td>
                    <td className="p-3 font-mono">1,048,576 tokens</td>
                    <td className="p-3 text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Healthy</td>
                    <td className="p-3 font-mono">68ms</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Claude 3.7 Sonnet / Fable</td>
                    <td className="p-3 text-indigo-400 font-mono">http://127.0.0.1:8001/v1</td>
                    <td className="p-3 font-mono">200,000 tokens</td>
                    <td className="p-3 text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Healthy</td>
                    <td className="p-3 font-mono">124ms</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">DeepSeek R1</td>
                    <td className="p-3 text-indigo-400 font-mono">http://127.0.0.1:8001/v1</td>
                    <td className="p-3 font-mono">128,000 tokens</td>
                    <td className="p-3 text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Healthy</td>
                    <td className="p-3 font-mono">180ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Active Sandboxes */}
        {activeTab === "sessions" && (
          <div className="bg-[#0d0f17] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Isolated Project Execution Workers</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-[#121624] border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white font-bold">worker-sandbox-01</span> &bull; Project: PulseSaaS
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">Running :3000</span>
              </div>
              <div className="p-3 bg-[#121624] border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white font-bold">worker-sandbox-02</span> &bull; Project: Aura Labs Store
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">Running :3000</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Security Audit Logs */}
        {activeTab === "audit" && (
          <div className="bg-[#0d0f17] border border-white/[0.08] rounded-2xl p-6 space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold text-white font-sans">Audit Trajectory</h3>
            <div className="space-y-2 text-slate-300">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500">[2026-10-10 15:10:02]</span> AUTH_CHECK: Workspace authenticated successfully for admin.
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500">[2026-10-10 15:12:14]</span> TOOL_INVOKE: Agent executed write_file('src/App.tsx') — path sanitized.
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500">[2026-10-10 15:14:30]</span> CHECKPOINT_CREATE: Snapshot 'Initial scaffold' committed to disk.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
