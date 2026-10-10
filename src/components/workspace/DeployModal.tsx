"use client";

import React, { useState } from "react";
import { X, Rocket, CheckCircle2, ExternalLink, RefreshCw, Globe, ShieldCheck } from "lucide-react";
import { Project } from "@/lib/storage/project-store";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function DeployModal({ isOpen, onClose, project }: DeployModalProps) {
  const [provider, setProvider] = useState<"vercel" | "netlify" | "cloudflare">("vercel");
  const [customDomain, setCustomDomain] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentResult(null);

    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          provider,
          customDomain: customDomain.trim() || undefined,
        }),
      });

      const data = await res.json();
      setDeploymentResult(data.deployment);
    } catch (err: any) {
      alert("Deployment error: " + err.message);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e111a] border border-[#1e2436] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-400" />
            <span>Deploy Application to Production</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Cloud Infrastructure</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "vercel", label: "Vercel", desc: "Edge Network" },
                { id: "netlify", label: "Netlify", desc: "Static & Functions" },
                { id: "cloudflare", label: "Cloudflare", desc: "Pages & Workers" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    provider === p.id
                      ? "bg-indigo-950/40 border-indigo-500 text-white font-bold"
                      : "bg-[#151926] border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="text-xs">{p.label}</div>
                  <div className="text-[10px] opacity-70">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Custom Domain (Optional)</label>
            <input
              type="text"
              placeholder="e.g. app.mycompany.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          {deploymentResult && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Production Deployment Live!</span>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-black/40 p-2.5 rounded-lg">
                <div className="text-emerald-300 truncate">➜ {deploymentResult.url}</div>
                <div className="text-slate-500">Status: {deploymentResult.status} (Built in {deploymentResult.buildDurationMs}ms)</div>
              </div>
              <a
                href={deploymentResult.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-md transition-all"
              >
                <span>Open Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
          >
            Close
          </button>
          {!deploymentResult && (
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              {isDeploying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5" />}
              <span>{isDeploying ? "Deploying..." : "Trigger Deployment"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
