"use client";

import React, { useState } from "react";
import { 
  X, Share2, Copy, Check, ExternalLink, Users, 
  Globe, ShieldCheck, Zap, SplitSquareVertical
} from "lucide-react";
import { Project } from "@/lib/storage/project-store";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function ShareModal({ isOpen, onClose, project }: ShareModalProps) {
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [copiedStudio, setCopiedStudio] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const previewUrl = `${origin}/preview/${project.id}`;
  const studioUrl = `${origin}/workspace/${project.id}`;

  const handleCopyPreview = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopiedPreview(true);
    setTimeout(() => setCopiedPreview(false), 2000);
  };

  const handleCopyStudio = () => {
    navigator.clipboard.writeText(studioUrl);
    setCopiedStudio(true);
    setTimeout(() => setCopiedStudio(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e111a] border border-[#1e2436] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Share &amp; Multi-User Live Run</h3>
              <p className="text-[11px] text-slate-400">Zero port configuration &bull; Instant multi-device testing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zero Port Architecture Highlight */}
        <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Zero-Port In-Browser Sandboxed Runtime</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Unlike traditional dev environments that require a separate TCP port for every running project (e.g. :3001, :3002), 
            <strong> NOVAFORGE compiles and executes directly inside sandboxed browser WebContainers</strong>. 
            Multiple teammates can open, test, and run this application simultaneously from any device without port collisions!
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {/* Link 1: Standalone Live Preview Link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Standalone Live Preview Link (For Testers &amp; Clients)</span>
              </span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Open</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={previewUrl}
                className="flex-1 bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-mono text-[11px] select-all focus:outline-none"
              />
              <button
                onClick={handleCopyPreview}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                {copiedPreview ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPreview ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Link 2: Studio Workspace Collaborative Link */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Full Studio Workspace Link (For Developers)</span>
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={studioUrl}
                className="flex-1 bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-mono text-[11px] select-all focus:outline-none"
              />
              <button
                onClick={handleCopyStudio}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              >
                {copiedStudio ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStudio ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
