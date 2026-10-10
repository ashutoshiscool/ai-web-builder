import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Play, RefreshCw, Terminal, Settings, 
  AlertTriangle, CheckCircle2, XCircle, Cpu, Layers, 
  Activity, Plus, Trash2, Search, Filter, Clock, CheckSquare, Server, Zap
} from 'lucide-react';

interface Checkpoint {
  id: string;
  name: string;
  category: 'Security' | 'Performance' | 'Integration' | 'Compliance';
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration: string;
  lastRun: string;
  target: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checkpoints' | 'terminal' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Checkpoint Test Runner v2.4.1 initialized.',
    '[SYSTEM] Connected to cluster: us-east-production-01',
    '[READY] All 12 checkpoint suites loaded into memory.'
  ]);

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
    { id: 'CHK-101', name: 'OAuth2 Token Expiry & Refresh Validation', category: 'Security', status: 'passed', duration: '1.42s', lastRun: '10 mins ago', target: '/api/v1/auth' },
    { id: 'CHK-102', name: 'SQL Injection Resistance on User Search', category: 'Security', status: 'passed', duration: '2.89s', lastRun: '12 mins ago', target: '/api/v1/search' },
    { id: 'CHK-103', name: 'Database Connection Pool Exhaustion Test', category: 'Performance', status: 'failed', duration: '5.12s', lastRun: '15 mins ago', target: 'PostgreSQL DB' },
    { id: 'CHK-104', name: 'Stripe Webhook Signature Verification', category: 'Integration', status: 'passed', duration: '0.84s', lastRun: '1 hour ago', target: '/api/v1/webhooks/stripe' },
    { id: 'CHK-105', name: 'GDPR Data Anonymization Export Check', category: 'Compliance', status: 'passed', duration: '3.40s', lastRun: '3 hours ago', target: '/api/v1/gdpr/export' },
    { id: 'CHK-106', name: 'High-Load Concurrent Checkout Flow', category: 'Performance', status: 'pending', duration: '-', lastRun: 'Never', target: '/api/v1/checkout' },
  ]);

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Security' | 'Performance' | 'Integration' | 'Compliance'>('Security');
  const [newTarget, setNewTarget] = useState('');

  // Simulated test run all
  const handleRunAll = () => {
    setIsRunningAll(true);
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting full test suite execution across ${checkpoints.length} checkpoints...`]);
    
    // Set all to running
    setCheckpoints(prev => prev.map(c => ({ ...c, status: 'running', duration: '...' })));

    setTimeout(() => {
      setCheckpoints(prev => prev.map(c => ({
        ...c,
        status: Math.random() > 0.15 ? 'passed' : 'failed',
        duration: (Math.random() * 3 + 0.5).toFixed(2) + 's',
        lastRun: 'Just now'
      })));
      setIsRunningAll(false);
      setTerminalLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] Execution completed. 83% success rate.`,
        `[${new Date().toLocaleTimeString()}] Detailed report generated successfully.`
      ]);
    }, 2500);
  };

  const handleRunSingle = (id: string) => {
    setCheckpoints(prev => prev.map(c => c.id === id ? { ...c, status: 'running', duration: '...' } : c));
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Triggered single test: ${id}`]);

    setTimeout(() => {
      setCheckpoints(prev => prev.map(c => c.id === id ? {
        ...c,
        status: 'passed',
        duration: (Math.random() * 2 + 0.3).toFixed(2) + 's',
        lastRun: 'Just now'
      } : c));
      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Test ${id} passed successfully.`]);
    }, 1200);
  };

  const handleAddCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTarget) return;

    const newChk: Checkpoint = {
      id: `CHK-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      category: newCategory,
      status: 'pending',
      duration: '-',
      lastRun: 'Never',
      target: newTarget
    };

    setCheckpoints([newChk, ...checkpoints]);
    setNewName('');
    setNewTarget('');
    setNewModalOpen(false);
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Added new checkpoint: ${newChk.id} - ${newChk.name}`]);
  };

  const handleDelete = (id: string) => {
    setCheckpoints(checkpoints.filter(c => c.id !== id));
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Deleted checkpoint ${id}`]);
  };

  const filteredCheckpoints = checkpoints.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.target.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const passedCount = checkpoints.filter(c => c.status === 'passed').length;
  const failedCount = checkpoints.filter(c => c.status === 'failed').length;
  const pendingCount = checkpoints.filter(c => c.status === 'pending' || c.status === 'running').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Checkpoint Test <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">v2.4 Enterprise</span>
            </h1>
            <p className="text-xs text-slate-400">Autonomous QA & Verification Pipeline</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRunAll}
            disabled={isRunningAll}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-indigo-600/20 transition disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-4 h-4 ${isRunningAll ? 'animate-spin' : ''}`} />
            <span>{isRunningAll ? 'Running Pipeline...' : 'Run All Checkpoints'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900/50 border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('checkpoints')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'checkpoints' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Test Checkpoints</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'terminal' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Terminal className="w-4 h-4" />
              <span>Live Terminal</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'settings' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Settings className="w-4 h-4" />
              <span>Pipeline Config</span>
            </button>
          </nav>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-emerald-400" /> Cluster</span>
              <span className="text-emerald-400 font-mono">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-indigo-400" /> Latency</span>
              <span className="text-slate-200 font-mono">24ms</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Mobile Tab bar */}
          <div className="flex md:hidden space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
            {['dashboard', 'checkpoints', 'terminal', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Checkpoints</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1">{checkpoints.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Passed</p>
                    <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">{passedCount}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Failed</p>
                    <h3 className="text-3xl font-extrabold text-rose-400 mt-1">{failedCount}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending / Running</p>
                    <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{pendingCount}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-indigo-400" /> Recent Test Executions
                    </h2>
                    <button onClick={() => setActiveTab('checkpoints')} className="text-xs text-indigo-400 hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {checkpoints.slice(0, 4).map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                        <div className="flex items-center space-x-3">
                          {c.status === 'passed' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                          {c.status === 'failed' && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                          {c.status === 'running' && <RefreshCw className="w-5 h-5 text-amber-400 animate-spin flex-shrink-0" />}
                          {c.status === 'pending' && <Clock className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                          <div>
                            <p className="text-sm font-medium text-slate-200">{c.name}</p>
                            <p className="text-xs text-slate-500 font-mono">{c.target} • {c.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-mono uppercase ${
                            c.status === 'passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            c.status === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health Card */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white mb-2">System Status</h2>
                    <p className="text-xs text-slate-400 mb-6">All testing runners are operating under normal parameters with nominal error rates.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">CPU Allocation</span>
                          <span className="text-indigo-400 font-mono">38%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[38%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Memory Buffer</span>
                          <span className="text-cyan-400 font-mono">62%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full w-[62%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Autopilot Mode</span>
                    <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHECKPOINTS MANAGER */}
          {activeTab === 'checkpoints' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search checkpoints..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="Security">Security</option>
                    <option value="Performance">Performance</option>
                    <option value="Integration">Integration</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>

                <button
                  onClick={() => setNewModalOpen(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Checkpoint</span>
                </button>
              </div>

              {/* Checkpoints Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <th className="py-3.5 px-6">ID & Name</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Target Endpoint</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Duration</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {filteredCheckpoints.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-4 px-6">
                            <p className="font-semibold text-slate-200">{c.name}</p>
                            <span className="text-xs font-mono text-slate-500">{c.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-medium border border-slate-700/50">
                              {c.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-indigo-300">
                            {c.target}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-mono uppercase ${
                              c.status === 'passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              c.status === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-slate-400">
                            {c.duration}
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button 
                              onClick={() => handleRunSingle(c.id)}
                              title="Run Test"
                              className="p-1.5 hover:bg-slate-800 text-indigo-400 rounded-lg transition"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(c.id)}
                              title="Delete Checkpoint"
                              className="p-1.5 hover:bg-slate-800 text-rose-400 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Live Execution Terminal</h2>
                  <p className="text-xs text-slate-400">Real-time stream of stdout/stderr from active checkpoint workers.</p>
                </div>
                <button
                  onClick={() => setTerminalLogs(['[SYSTEM] Terminal buffer cleared. Ready for next stream.'])}
                  className="text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition"
                >
                  Clear Logs
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-400 h-[500px] overflow-y-auto space-y-1.5 shadow-inner">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">❯</span>
                    <span className={log.includes('failed') ? 'text-rose-400' : log.includes('passed') ? 'text-emerald-400' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2 animate-pulse pt-2 text-indigo-400">
                  <span>❯</span>
                  <span className="w-2 h-4 bg-indigo-500 inline-block" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-white">Pipeline Settings</h2>
                <p className="text-xs text-slate-400">Configure global triggers, alerting webhooks, and thresholds.</p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Cluster URL</label>
                  <input
                    type="text"
                    defaultValue="https://api-cluster-01.checkpoint-test.internal"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Slack Alert Webhook URL</label>
                  <input
                    type="text"
                    defaultValue="https://hooks.slack.com/services/T00/B00/XXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Auto-Run on Pull Request</p>
                    <p className="text-xs text-slate-400">Trigger checkpoint suite automatically upon new GitHub commits.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Strict Compliance Mode</p>
                    <p className="text-xs text-slate-400">Fail deployment pipeline immediately if any security check fails.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" />
                </div>

                <div className="pt-4">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
                    Save Configurations
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* NEW CHECKPOINT MODAL */}
      {newModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-white">Create New Checkpoint</h3>
            <form onSubmit={handleAddCheckpoint} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Checkpoint Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rate Limiting DDoS Verification"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Security">Security</option>
                  <option value="Performance">Performance</option>
                  <option value="Integration">Integration</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Endpoint</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /api/v1/ratelimit"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
                >
                  Save Checkpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
