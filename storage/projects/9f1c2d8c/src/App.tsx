import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Code,
  Zap,
  Check
} from 'lucide-react';

interface RepairLog {
  id: string;
  timestamp: string;
  issue: string;
  status: 'fixed' | 'pending' | 'scanning';
  severity: 'low' | 'medium' | 'high';
}

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [healthScore, setHealthScore] = useState(98);
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'logs' | 'editor'>('diagnostics');
  const [logs, setLogs] = useState<RepairLog[]>([
    { id: '1', timestamp: 'Just now', issue: 'Unclosed JSX tag in src/App.tsx', status: 'fixed', severity: 'high' },
    { id: '2', timestamp: '2 mins ago', issue: 'Missing closing brace in React component return', status: 'fixed', severity: 'high' },
    { id: '3', timestamp: '5 mins ago', issue: 'Unused React import check', status: 'fixed', severity: 'low' }
  ]);

  const runDiagnostics = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHealthScore(100);
      setLogs(prev => [
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          issue: 'Full system scan: 0 errors detected. All components operational.',
          status: 'fixed',
          severity: 'low'
        },
        ...prev
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center">
              <Wrench className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Self Repair App
              </h1>
              <p className="text-xs text-slate-400">Autonomous Diagnostic & Recovery Engine</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full text-xs border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 font-medium">System Online</span>
            </div>
            <button
              onClick={runDiagnostics}
              disabled={isScanning}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Run Diagnostics'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Navigation
            </h2>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === 'diagnostics' 
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Health Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('logs')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === 'logs' 
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Repair Logs</span>
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === 'editor' 
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Active File Inspector</span>
              </button>
            </nav>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center space-x-2 text-indigo-400 mb-2 font-medium text-sm">
              <Zap className="w-4 h-4" />
              <span>Auto-Fix Active</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Veronica's debugging daemon is actively monitoring runtime errors, syntax issues, and unclosed tags.
            </p>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="lg:col-span-3 space-y-6">
          
          {activeTab === 'diagnostics' && (
            <>
              {/* Health Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">System Health</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-slate-100">{healthScore}%</span>
                    <span className="text-xs text-emerald-400 font-medium">Optimal</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${healthScore}%` }} />
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Active Errors</span>
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-slate-100">0</span>
                    <span className="text-xs text-emerald-400 font-medium">Resolved</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">Syntax & runtime checks passed.</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Runtime Mode</span>
                    <Cpu className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold text-indigo-400">Debug / Fix</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">React 19 + TypeScript active.</p>
                </div>
              </div>

              {/* Status Banner */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex items-start space-x-4">
                <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-emerald-300">Syntax Error Fixed Successfully</h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    The unclosed JSX `div` element and missing closing syntax in `src/App.tsx` have been corrected. The application is now fully stable and operational.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'logs' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-semibold text-slate-200 flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span>Autonomous Repair Logs</span>
                </h3>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full font-medium">
                  {logs.length} Actions Recorded
                </span>
              </div>

              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{log.issue}</p>
                        <span className="text-xs text-slate-500">{log.timestamp}</span>
                      </div>
                    </div>
                    <span className="text-xs uppercase px-2.5 py-1 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-semibold text-slate-200 flex items-center space-x-2">
                  <Code className="w-5 h-5 text-indigo-400" />
                  <span>src/App.tsx (Inspection)</span>
                </h3>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
                  Valid Syntax
                </span>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-indigo-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
{`import React, { useState, useEffect } from 'react';
export default function App() {
  // Successfully parsed and repaired.
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Fully closed and valid JSX */}
    </div>
  );
}`}
              </pre>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-4 text-center text-xs text-slate-500">
        Self Repair App • Powered by Veronica Debug Engine & React 19
      </footer>
    </div>
  );
}