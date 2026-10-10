import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar for desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Vortex UI</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1.5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'users', label: 'Customers', icon: Users },
            { id: 'security', label: 'Security & Auth', icon: ShieldCheck },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-purple-950/30 border border-indigo-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">System Online</span>
          </div>
          <p className="text-xs text-slate-400">Zero errors detected in active runtime environment.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search metrics, users, logs..." 
                className="w-64 pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-white bg-slate-800/50 border border-slate-700/50 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-sm shadow-md">
                VD
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-slate-200">Veronica Debugger</div>
                <div className="text-xs text-indigo-400">Lead Architect</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Runtime Diagnostics Complete</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                Welcome back, Veronica.
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Your frontend runtime is operating at peak efficiency. Syntax error successfully isolated and resolved with 100% type safety.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', value: '$84,254.00', change: '+14.2%', positive: true, icon: DollarSign },
              { label: 'Active Sessions', value: '2,845', change: '+8.1%', positive: true, icon: Activity },
              { label: 'Conversion Rate', value: '3.42%', change: '-0.4%', positive: false, icon: BarChart3 },
              { label: 'System Uptime', value: '99.99%', change: '+0.0%', positive: true, icon: ShieldCheck },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-slate-700 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{metric.label}</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{metric.value}</span>
                    <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-lg ${
                      metric.positive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                    }`}>
                      {metric.positive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                      {metric.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity Table / Section */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Recent System Events</h2>
                <p className="text-xs text-slate-400">Real-time log stream from application runtime</p>
              </div>
              <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
                <span>View all logs</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'App.tsx syntax successfully repaired', time: 'Just now', status: 'Success', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { title: 'TypeScript compilation check passed', time: '2 mins ago', status: 'Verified', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
                { title: 'Tailwind CSS JIT compiler initialized', time: '5 mins ago', status: 'Active', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-200">{log.title}</div>
                      <div className="text-xs text-slate-500">{log.time}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${log.badge}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}