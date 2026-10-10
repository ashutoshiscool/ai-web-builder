"use client";

import React, { useState } from "react";
import { X, CheckCircle2, GitBranch, GitCommit, ArrowRight, RefreshCw } from "lucide-react";
import { Project } from "@/lib/storage/project-store";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function GitHubModal({ isOpen, onClose, project }: GitHubModalProps) {
  const [repoName, setRepoName] = useState(project.name.toLowerCase().replace(/\s+/g, "-"));
  const [commitMessage, setCommitMessage] = useState("feat: AI Agent generated features and styling");
  const [isPushing, setIsPushing] = useState(false);
  const [pushResult, setPushResult] = useState<any>(null);

  if (!isOpen) return null;

  const handlePush = async () => {
    setIsPushing(true);
    setPushResult(null);

    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          repoName,
          commitMessage,
        }),
      });

      const data = await res.json();
      setPushResult(data);
    } catch (err: any) {
      alert("GitHub error: " + err.message);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e111a] border border-[#1e2436] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GithubIcon className="w-5 h-5 text-indigo-400" />
            <span>GitHub Sync &amp; Commit</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Repository</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Commit Message</label>
            <input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {pushResult && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-2 font-mono text-[11px] animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pushed Commit to origin/main</span>
              </div>
              <div className="text-slate-300">Repository: {pushResult.repo}</div>
              <div className="text-slate-400">SHA: {pushResult.commitSha} ({pushResult.filesCommitted} files)</div>
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
          {!pushResult && (
            <button
              onClick={handlePush}
              disabled={isPushing}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all active:scale-95"
            >
              {isPushing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <GitCommit className="w-3.5 h-3.5" />}
              <span>{isPushing ? "Pushing..." : "Commit & Push"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
