import React, { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Cpu, 
  Database, 
  Globe, 
  LayoutDashboard, 
  Lock, 
  Menu, 
  Plus, 
  Search, 
  Server, 
  Settings, 
  Shield, 
  Terminal, 
  TrendingUp, 
  User, 
  X,
  Zap
} from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'servers' | 'analytics' | 'settings'>('dashboard');
  const [deployments, setDeployments] = useState([
    { id: 'dep-101', name: 'production-api-us-east', status: 'Healthy', uptime: '99.98%', region: 'us-east-1', latency: '24ms' },
    { id: 'dep-102', name: 'auth-service-eu-west', status: 'Healthy', uptime: '99.99%', region: 'eu-west-1', latency: '42ms' },
    { id: 'dep-103', name: 'analytics-worker-ap-south', status: 'Warning', uptime: '98.50%', region: 'ap-south-1', latency: '118ms' },
    { id: 'dep-104', name: 'cdn-edge-global', status: 'Healthy', uptime: '100%', region: 'global', latency: '12ms' },
  ]);
  const [newServerModal, setNewServerModal] = useState(false);
  const [serverName, setServerName] = useState('');

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverName.trim()) return;
    const newServer = {
      id: `dep-${Date.now().toString().slice(-3)}`,
      name: serverName.trim(),
      status: 'Healthy',
      uptime: '100%',
      region: 'us-west-2',
      latency: '30ms'
    };
    setDeployments([newServer, ...deployments]);
    setServerName('');
    setNewServerModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar for Desktop & Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">NexusCloud</span>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1.5">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('servers')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'servers' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}
          >
            <Server className="w-5 h-5" />
            <span>Infrastructure</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'analytics' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-200">Jane Developer</p>
              <p className="text-xs text-slate-400 truncate">jane@nexuscloud.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search deployments, logs, IPs..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-400">All Systems Operational</span>
            </div>
            <button 
              onClick={() => setNewServerModal(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Deployment</span>
            </button>
          </div>
        </header>

        {/* Dashboard View */}
        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome banner */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back, Jane 👋</h1>
                  <p className="text-sm text-slate-400 mt-1">Here is the real-time health and telemetry report for your global cluster.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Region: us-east-1 (Primary)</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Nodes</p>
                      <h3 className="text-3xl font-extrabold text-white mt-2">24/24</h3>
                    </div>
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                      <Server className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    <span>+12% scaling capacity this week</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Latency</p>
                      <h3 className="text-3xl font-extrabold text-white mt-2">28.4 ms</h3>
                    </div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 mr-1 rotate-180" />
                    <span>-4.2ms faster than yesterday</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Request Volume</p>
                      <h3 className="text-3xl font-extrabold text-white mt-2">1.42M</h3>
                    </div>
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                      <Database className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    <span>+18.4% request surge</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cluster Security</p>
                      <h3 className="text-3xl font-extrabold text-white mt-2">Secure</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                      <Shield className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    <span>Zero vulnerabilities detected</span>
                  </div>
                </div>
              </div>

              {/* Deployments Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Active Deployments</h2>
                    <p className="text-xs text-slate-400">Manage and monitor live server instances across regions</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('servers')}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>View all</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-6">Deployment Name</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Region</th>
                        <th className="py-3 px-6">Uptime</th>
                        <th className="py-3 px-6">Latency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-sm">
                      {deployments.map((dep) => (
                        <tr key={dep.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-medium text-white flex items-center space-x-2">
                            <Cpu className="w-4 h-4 text-cyan-400" />
                            <span>{dep.name}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${dep.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                              {dep.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-300 font-mono text-xs">{dep.region}</td>
                          <td className="py-4 px-6 text-slate-300">{dep.uptime}</td>
                          <td className="py-4 px-6 text-slate-300 font-mono text-xs">{dep.latency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'servers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">Infrastructure & Servers</h1>
                  <p className="text-sm text-slate-400">Configure compute clusters, load balancers, and edge nodes.</p>
                </div>
                <button 
                  onClick={() => setNewServerModal(true)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Provision Server</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deployments.map((dep) => (
                  <div key={dep.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-cyan-400">{dep.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${dep.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {dep.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-3">{dep.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">Region: <span className="font-mono text-slate-300">{dep.region}</span></p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>Uptime: <strong className="text-slate-200">{dep.uptime}</strong></span>
                      <span>Latency: <strong className="text-slate-200">{dep.latency}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
                <p className="text-sm text-slate-400">Deep telemetry and metrics across global endpoints.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
                <BarChart3 className="w-16 h-16 text-cyan-500 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-bold text-white">Real-time Telemetry Stream Active</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">Metrics are updated every 2.5 seconds via WebSocket pipeline. All edge nodes are reporting optimal health.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Cluster Settings</h1>
                <p className="text-sm text-slate-400">Manage security credentials, API keys, and notification channels.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Organization Name</label>
                  <input type="text" defaultValue="NexusCloud Enterprise" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Primary Webhook URL</label>
                  <input type="text" defaultValue="https://api.nexuscloud.io/v1/webhook/listener" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500" />
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Server Modal */}
      {newServerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Provision New Deployment</h3>
              <button onClick={() => setNewServerModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddServer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Instance Identifier</label>
                <input 
                  type="text" 
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder="e.g. redis-cache-eu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setNewServerModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
                >
                  Deploy Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}