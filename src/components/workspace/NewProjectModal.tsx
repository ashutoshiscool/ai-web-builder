"use client";

import React, { useState } from "react";
import { X, Sparkles, LayoutTemplate, Plus, ArrowRight, Check } from "lucide-react";
import { TEMPLATES } from "@/lib/templates/template-registry";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (data: { name: string; description?: string; templateId?: string; initialPrompt?: string }) => void;
}

export function NewProjectModal({ isOpen, onClose, onCreateProject }: NewProjectModalProps) {
  const [tab, setTab] = useState<"template" | "prompt" | "blank">("template");
  const [projectName, setProjectName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("saas-dashboard");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "template") {
      const template = TEMPLATES.find((t) => t.id === selectedTemplateId);
      onCreateProject({
        name: projectName || template?.name || "New App",
        templateId: selectedTemplateId,
      });
    } else if (tab === "prompt") {
      onCreateProject({
        name: projectName || "AI Generated Project",
        initialPrompt: prompt,
      });
    } else {
      onCreateProject({
        name: projectName || "Blank Project",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e111a] border border-[#1e2436] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            <span>Create New Project</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2 bg-[#151926] p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setTab("template")}
            className={`py-2 rounded-lg font-medium transition-all ${
              tab === "template" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Start from Template
          </button>
          <button
            onClick={() => setTab("prompt")}
            className={`py-2 rounded-lg font-medium transition-all ${
              tab === "prompt" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Generate from Prompt
          </button>
          <button
            onClick={() => setTab("blank")}
            className={`py-2 rounded-lg font-medium transition-all ${
              tab === "blank" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Blank Project
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
            <input
              type="text"
              placeholder="e.g. My Next Unicorn"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {tab === "template" && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Choose Starter Architecture</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedTemplateId === tpl.id
                        ? "bg-indigo-950/40 border-indigo-500 shadow-md text-white"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{tpl.name}</span>
                      {selectedTemplateId === tpl.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tpl.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "prompt" && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Application Specification Prompt</label>
              <textarea
                rows={4}
                placeholder="Build me a modern SaaS dashboard with authentication, a PostgreSQL database, Stripe subscriptions, an admin panel, and beautiful analytics..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-[#151926] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-medium text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 transition-all"
            >
              <span>Initialize Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
