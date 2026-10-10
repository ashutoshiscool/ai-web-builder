"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Monitor, Tablet, Smartphone, RefreshCw, ExternalLink, 
  Terminal, AlertTriangle, CheckCircle, Bug, ChevronUp, ChevronDown,
  Trash2, ShieldCheck, Play
} from "lucide-react";
import { Project } from "@/lib/storage/project-store";

interface CenterPanelProps {
  project: Project;
  onAskAgentToFix?: (errorMessage: string) => void;
  refreshTrigger?: number;
}

export interface ConsoleLogItem {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

export function CenterPanel({ project, onAskAgentToFix, refreshTrigger }: CenterPanelProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewKey, setPreviewKey] = useState(0);
  const [currentRoute, setCurrentRoute] = useState("/");
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLogItem[]>([
    { id: "1", level: "info", message: "Vite HMR runtime connected.", timestamp: new Date().toLocaleTimeString() },
    { id: "2", level: "info", message: "Preview application initialized.", timestamp: new Date().toLocaleTimeString() },
  ]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Trigger preview reload when code changes
  useEffect(() => {
    setPreviewKey((k) => k + 1);
  }, [project.files, refreshTrigger]);

  // Listen to postMessage from sandboxed preview
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "CONSOLE_LOG") {
        setConsoleLogs((prev) => [
          ...prev.slice(-40),
          {
            id: Math.random().toString(),
            level: event.data.level,
            message: event.data.message,
            timestamp: event.data.timestamp || new Date().toLocaleTimeString(),
          },
        ]);
      } else if (event.data?.type === "FIX_ERROR") {
        if (onAskAgentToFix && event.data.error) {
          onAskAgentToFix(event.data.error);
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onAskAgentToFix]);

  const handleRefresh = () => {
    setPreviewKey((k) => k + 1);
  };

  const handleOpenExternal = () => {
    window.open(`/preview/${project.id}`, "_blank");
  };

  const errorCount = consoleLogs.filter((l) => l.level === "error").length;

  return (
    <div className="h-full flex flex-col bg-[#08090d] overflow-hidden relative">
      {/* Top Preview Bar: Viewport, URL, Controls */}
      <div className="h-11 bg-[#0d0f17] border-b border-[#1e2436] px-3 flex items-center justify-between z-20 text-xs">
        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-[#151926] p-0.5 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-1 rounded transition-colors ${
              viewport === "desktop" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-1 rounded transition-colors ${
              viewport === "tablet" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-1 rounded transition-colors ${
              viewport === "mobile" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-md mx-3 flex items-center bg-[#151926] border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-300">
          <span className="text-slate-500 font-mono select-none">https://app.preview/</span>
          <input
            type="text"
            value={currentRoute}
            onChange={(e) => setCurrentRoute(e.target.value)}
            className="flex-1 bg-transparent px-1 font-mono text-white focus:outline-none"
          />
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" title="Live Hot Reload Active" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleOpenExternal}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 bg-[#050608] flex items-center justify-center p-2 overflow-auto relative">
        <div
          className={`h-full transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-slate-800/80 bg-[#08090d] flex flex-col ${
            viewport === "desktop"
              ? "w-full"
              : viewport === "tablet"
              ? "w-[768px] max-w-full"
              : "w-[375px] max-w-full"
          }`}
        >
          <iframe
            key={previewKey}
            ref={iframeRef}
            src={`/preview/${project.id}?route=${encodeURIComponent(currentRoute)}`}
            title="Application Preview"
            className="w-full h-full border-0 bg-transparent flex-1"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          />
        </div>
      </div>

      {/* Bottom Console Drawer Button & Drawer */}
      <div className="border-t border-[#1e2436] bg-[#0d0f17] z-20">
        <div className="px-3 py-1.5 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowConsole(!showConsole)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 font-mono text-[11px]"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Runtime Diagnostics &amp; Console</span>
            {errorCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                {errorCount} error(s)
              </span>
            )}
            {showConsole ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>

          <div className="flex items-center gap-2">
            {errorCount > 0 && onAskAgentToFix && (
              <button
                onClick={() => {
                  const lastErr = consoleLogs.filter((l) => l.level === "error").pop();
                  if (lastErr) onAskAgentToFix(lastErr.message);
                }}
                className="text-[10px] bg-rose-600 hover:bg-rose-500 text-white font-semibold px-2 py-0.5 rounded shadow flex items-center gap-1 transition-all"
              >
                <Bug className="w-3 h-3" />
                <span>Fix with AI</span>
              </button>
            )}

            {showConsole && (
              <button
                onClick={() => setConsoleLogs([])}
                className="text-slate-500 hover:text-slate-300 p-1"
                title="Clear console"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Console Body */}
        {showConsole && (
          <div className="h-40 bg-[#08090d] border-t border-slate-800/80 p-2 overflow-y-auto font-mono text-[11px] space-y-1">
            {consoleLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-4">No console messages recorded.</div>
            ) : (
              consoleLogs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start gap-2 py-0.5 px-1.5 rounded ${
                    log.level === "error"
                      ? "bg-rose-950/30 text-rose-300 border-l-2 border-rose-500"
                      : log.level === "warn"
                      ? "bg-amber-950/30 text-amber-300 border-l-2 border-amber-500"
                      : "text-slate-300"
                  }`}
                >
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <span className="flex-1 whitespace-pre-wrap">{log.message}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
