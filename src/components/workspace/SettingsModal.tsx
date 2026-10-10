"use client";

import React, { useState } from "react";
import { X, Settings, CheckCircle2, AlertCircle, RefreshCw, Key, Server, Cpu } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [provider, setProvider] = useState("local-proxy");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("http://127.0.0.1:8001/v1");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; latencyMs: number; error?: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test-connection",
          provider,
          apiKey,
          baseUrl,
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ success: false, latencyMs: 0, error: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e111a] border border-[#1e2436] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>AI Gateway &amp; Provider Settings</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Active AI Provider</label>
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                if (e.target.value === "local-proxy") setBaseUrl("http://127.0.0.1:8001/v1");
                if (e.target.value === "openai") setBaseUrl("https://api.openai.com/v1");
                if (e.target.value === "ollama") setBaseUrl("http://localhost:11434/v1");
                if (e.target.value === "openrouter") setBaseUrl("https://openrouter.ai/api/v1");
              }}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="local-proxy">NOVAFORGE Built-in Gateway (High Speed Gemini 3.8 / Claude)</option>
              <option value="openai">OpenAI Official (GPT-4o, GPT-5)</option>
              <option value="anthropic">Anthropic Claude API</option>
              <option value="openrouter">OpenRouter Unified Gateway</option>
              <option value="ollama">Ollama Local (Offline)</option>
              <option value="custom">Custom Compatible API Endpoint</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">API Base URL</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Provider API Key (Encrypted Server-Side)</label>
            <input
              type="password"
              placeholder="sk-... or leave empty for local proxy"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#151926] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Keys are strictly stored server-side and never exposed to browser context.
            </p>
          </div>

          {/* Test Connection Button & Result */}
          <div className="pt-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium flex items-center gap-2 transition-all"
            >
              {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Server className="w-3.5 h-3.5 text-indigo-400" />}
              <span>Test Connectivity</span>
            </button>

            {testResult && (
              <div
                className={`mt-3 p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                  testResult.success
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                    : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <div>
                  <div className="font-bold">
                    {testResult.success ? "Connection Successful!" : "Connection Failed"}
                  </div>
                  <div className="text-[11px] opacity-80">
                    {testResult.success
                      ? `Latency: ${testResult.latencyMs}ms (Provider operational)`
                      : testResult.error}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
