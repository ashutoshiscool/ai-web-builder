import React, { useState } from 'react';
import { Wrench, CheckCircle2, AlertTriangle, Terminal, Activity, RefreshCw, ShieldAlert, Cpu } from 'lucide-react';

interface DiagnosticIssue {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  fixed: boolean;
}

export default function App() {
  const [issues, setIssues] = useState<DiagnosticIssue[]>([
    {
      id: 'ERR-001',
      title: 'Unclosed JSX Tag in App.tsx',
      severity: 'high',
      description: 'Missing closing </div> tag and malformed return statement in render tree.',
      fixed: true,
    },
    {
      id: 'ERR-002',
      title: 'Memory Leak in Event Listener',
      severity: 'medium',
      description: 'Window resize listener registered without cleanup return function in useEffect.',
      fixed: false,
    },
    {
      id: 'ERR-003',
      title: 'Unoptimized Re-renders',
      severity: 'low',
      description: 'Dashboard telemetry polling at 10ms interval without useCallback memoization.',
      fixed: false,
    },
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs' | 'config'>('dashboard');

  const runDiagnostics = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const repairIssue = (id: string) => {
    setIssues(prev =>
      prev.map(issue => (issue.id === id ? { ...issue, fixed: true } : issue))
    );
  };

  const repairAll = () => {
    setIssues(prev => prev.map(issue => ({ ...issue, fixed: true })));
  };

  const unresolvedCount = issues.filter(i => !i.fixed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Wrench className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Self Repair App
            </h1>
            <p className="text-xs text-slate-400">Autonomous Diagnostic & Recovery Engine v2.4</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
            unresolvedCount === 0 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            {unresolvedCount === 0 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {unresolvedCount === 0 ? 'All Systems Nominal' : `${unresolvedCount} Issues Detected`}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Diagnostics Hub</span>
          </button>
          
          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'logs'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Runtime Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'config'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>System Config</span>
          </button>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-2">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                Active Protection
              </div>
              <p>React 19 Runtime Guardian is actively intercepting unhandled runtime exceptions.</p>
            </div>
          </div>
        </aside>

        {/* Dashboard Panel */}
        <section className="lg:col-span-3 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Action Banner */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                <div>
                  <h2 className="text-lg font-semibold text-white">System Diagnostics & Repair</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Scan codebase and runtime memory for anomalies and execute surgical fixes.
                  </p>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={runDiagnostics}
                    disabled={isScanning}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium border border-slate-700 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
                  </button>
                  <button
                    onClick={repairAll}
                    disabled={unresolvedCount === 0}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 disabled:shadow-none"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Repair All</span>
                  </button>
                </div>
              </div>

              {/* Issues List */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Detected Anomalies</h3>
                {issues.map(issue => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      issue.fixed
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-75'
                        : 'bg-slate-900 border-slate-800 shadow-lg'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {issue.id}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium uppercase ${
                          issue.severity === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          issue.severity === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        }`}>
                          {issue.severity}
                        </span>
                        {issue.fixed && (
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Fixed
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-white text-base">{issue.title}</h4>
                      <p className="text-sm text-slate-400">{issue.description}</p>
                    </div>

                    <div>
                      {!issue.fixed ? (
                        <button
                          onClick={() => repairIssue(issue.id)}
                          className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl text-sm font-medium transition-all shadow-sm"
                        >
                          Apply Fix
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium italic">Resolved</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'logs' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Live Execution Logs
              </h3>
              <div className="bg-slate-950 font-mono text-xs text-emerald-400/90 p-4 rounded-xl border border-slate-800/80 space-y-2 h-96 overflow-y-auto">
                <p className="text-slate-500">[00:00:01] System boot sequence initiated...</p>
                <p className="text-slate-500">[00:00:02] Loading React 19 concurrent renderer...</p>
                <p className="text-rose-400">[00:00:02] Uncaught SyntaxError: Unexpected token, expected "}" in src/App.tsx:3</p>
                <p className="text-cyan-400">[00:00:03] Veronica Debugger activated auto-recovery protocol.</p>
                <p className="text-emerald-400">[00:00:03] Successfully closed unclosed JSX tag and recompiled src/App.tsx.</p>
                <p className="text-slate-400">[00:00:05] All modules loaded successfully. Ready for operations.</p>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                Engine Configuration
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div>
                    <div className="font-medium text-white">Auto-Repair Mode</div>
                    <div className="text-xs text-slate-400">Automatically patch syntax errors upon detection.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle accent-emerald-500 w-5 h-5 rounded cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div>
                    <div className="font-medium text-white">Strict Type Verification</div>
                    <div className="text-xs text-slate-400">Enforce strict TypeScript checks during diagnostic scans.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle accent-emerald-500 w-5 h-5 rounded cursor-pointer" />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/30 py-4 px-6 text-center text-xs text-slate-500">
        Self Repair App • Powered by React 19 & TypeScript Expert Debugger
      </footer>
    </div>
  );
}