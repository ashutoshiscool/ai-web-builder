import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Bell, 
  Search, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Globe,
  RefreshCw,
  SlidersHorizontal,
  LogOut
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'users' | 'settings'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800/80">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Aether OS</span>
              <span className="text-[10px] block text-indigo-400 font-medium tracking-widest uppercase">Enterprise V2</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'users', label: 'Team Members', icon: Users },
              { id: 'settings', label: 'System Settings', icon: SlidersHorizontal },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80">
          <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800/60 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Memory Usage</span>
              <span className="text-xs text-indigo-400 font-mono">74%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full w-[74%] rounded-full"></div>
            </div>
          </div>
          <button className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/20 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search metrics, reports, or users..." 
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setNotificationCount(0)}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-slate-950"></span>
              )}
            </button>
            <div className="h-8 w-[1px] bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 pl-1">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-sm shadow-md">
                VA
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm font-semibold block leading-tight text-slate-200">Veronica Admin</span>
                <span className="text-xs text-slate-500">Root Supervisor</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-indigo-950/40 via-violet-950/20 to-slate-900/40 border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Live Production Environment
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  All nodes operational
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                System Intelligence Hub
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Real-time performance analytics, runtime monitoring, and security audit diagnostics for active React micro-services.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Run Security Audit
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { title: 'Total Revenue', value: '$84,249.50', change: '+12.4%', isUp: true, icon: DollarSign, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
              { title: 'Active Sessions', value: '14,892', change: '+18.2%', isUp: true, icon: Users, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
              { title: 'System Latency', value: '24ms', change: '-4.1%', isUp: true, icon: Activity, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
              { title: 'Uptime SLA', value: '99.99%', change: '0.0%', isUp: true, icon: Globe, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl hover:border-slate-700 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-400">{card.title}</span>
                    <div className={`p-2.5 rounded-xl border ${card.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${card.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {card.isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                      {card.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Performance Telemetry</h3>
                  <p className="text-xs text-slate-400">Request throughput over the last 24 hours</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                  <span className="text-xs text-slate-400 font-medium">Requests/sec</span>
                </div>
              </div>

              {/* Simulated Chart Bars */}
              <div className="h-64 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-800">
                {[45, 62, 58, 74, 82, 69, 88, 95, 78, 85, 92, 98, 89, 76, 84, 91, 96, 88, 79, 85].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div 
                      className="w-full bg-slate-800/60 rounded-t-lg group-hover:bg-indigo-500 transition-all duration-300 relative overflow-hidden" 
                      style={{ height: `${val}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 text-xs text-slate-500 font-mono">
                <span>00:00 UTC</span>
                <span>06:00 UTC</span>
                <span>12:00 UTC</span>
                <span>18:00 UTC</span>
                <span>Now</span>
              </div>
            </div>

            {/* Recent Deployment Log */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">Deployment Log</h3>
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">v2.4.1</span>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Zero-Error Debug Fix applied', time: '2m ago', status: 'Success' },
                    { title: 'React 19 Hydration verified', time: '14m ago', status: 'Success' },
                    { title: 'Tailwind CSS JIT compiled', time: '1h ago', status: 'Success' },
                    { title: 'Edge Worker Node synchronized', time: '3h ago', status: 'Success' },
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-800/60 last:border-0 last:pb-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200 truncate">{log.title}</p>
                        <span className="text-[10px] text-slate-500">{log.time}</span>
                      </div>
                      <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors flex items-center justify-center gap-1">
                View Full Audit Trail
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}