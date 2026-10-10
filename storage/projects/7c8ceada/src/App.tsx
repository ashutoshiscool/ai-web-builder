import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Bell,
  Search,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  X,
  Check,
  Shield,
  Zap,
  Flame,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Download,
  Filter,
  LogOut,
  HelpCircle,
  Menu
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 transition-all duration-200 hover:border-slate-700 hover:scale-[1.01] group">
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-400 text-sm font-medium">{title}</span>
      <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
        {icon}
      </div>
    </div>
    <div className="flex items-baseline justify-between">
      <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{value}</h3>
      <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
        isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
      }`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {change}
      </span>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'users' | 'billing' | 'settings'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const users = [
    { id: 1, name: 'Alex Rivera', email: 'alex.r@enterprise.io', role: 'Admin', status: 'Active', plan: 'Enterprise', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces' },
    { id: 2, name: 'Sarah Chen', email: 'chen.sarah@techcorp.com', role: 'Developer', status: 'Active', plan: 'Pro', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
    { id: 3, name: 'Marcus Vance', email: 'm.vance@startup.ai', role: 'Viewer', status: 'Inactive', plan: 'Free', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
    { id: 4, name: 'Elena Rostova', email: 'elena@cloudscale.net', role: 'Editor', status: 'Active', plan: 'Pro', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces' },
  ];

  const recentActivity = [
    { id: 1, action: 'API Key regenerated', user: 'Alex Rivera', time: '2 mins ago', type: 'security' },
    { id: 2, action: 'New team member invited', user: 'Sarah Chen', time: '14 mins ago', type: 'user' },
    { id: 3, action: 'Billing tier upgraded to Enterprise', user: 'Elena Rostova', time: '1 hour ago', type: 'billing' },
    { id: 4, action: 'Deployed v2.4.1 to production', user: 'Alex Rivera', time: '3 hours ago', type: 'deploy' },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex font-sans antialiased selection:bg-violet-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-violet-500/40 shadow-2xl rounded-xl px-4 py-3 flex items-center space-x-3 animate-slide-up">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-medium text-white">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0b0f19] border-r border-slate-800/80 p-6 select-none">
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              OmniPulse
            </h1>
            <span className="text-xs text-violet-400 font-medium tracking-wide">ENTERPRISE CLOUD</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'users', label: 'Team Members', icon: <Users className="w-4 h-4" /> },
            { id: 'billing', label: 'Billing & Plans', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800/80">
          <div className="bg-gradient-to-br from-violet-900/20 to-slate-900/50 p-4 rounded-2xl border border-violet-500/20 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-violet-300">PRO PLAN</span>
              <span className="text-xs text-slate-400">82% used</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-indigo-500 w-[82%] h-full rounded-full" />
            </div>
          </div>
          <button 
            onClick={() => triggerToast('Logged out successfully')}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-[#08090d]/80 backdrop-blur-md border-b border-slate-800/80 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search metrics, users, logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all w-72"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-slide-up">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <span className="font-semibold text-sm text-white">Notifications</span>
                    <span className="text-xs text-violet-400 cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <p className="font-medium text-white mb-1">Server load spike mitigated</p>
                      <span className="text-slate-500">10 minutes ago</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <p className="font-medium text-white mb-1">New monthly invoice ready</p>
                      <span className="text-slate-500">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Avatar"
                className="w-10 h-10 rounded-xl object-cover border border-violet-500/30"
              />
              <div className="hidden md:block text-left">
                <h4 className="text-sm font-semibold text-white">Alex Rivera</h4>
                <span className="text-xs text-slate-400">Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8">
          {/* Top Banner / Breadcrumb */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white capitalize tracking-tight">
                {activeTab} Overview
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Real-time telemetry and infrastructure performance metrics.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => triggerToast('Data refreshed successfully')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-sm font-medium transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium shadow-lg shadow-violet-500/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Monthly Recurring Revenue"
              value="$48,250.00"
              change="+14.2%"
              isPositive={true}
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <MetricCard
              title="Active Users"
              value="12,840"
              change="+8.1%"
              isPositive={true}
              icon={<Users className="w-5 h-5" />}
            />
            <MetricCard
              title="Server Latency"
              value="24.4 ms"
              change="-3.2%"
              isPositive={true}
              icon={<Zap className="w-5 h-5" />}
            />
            <MetricCard
              title="Error Rate"
              value="0.04%"
              change="+0.01%"
              isPositive={false}
              icon={<Shield className="w-5 h-5" />}
            />
          </div>

          {/* Analytics & Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart Card */}
            <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Traffic & Request Volume</h3>
                  <span className="text-xs text-slate-400">Past 7 days performance trends</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#08090d] p-1 rounded-xl border border-slate-800">
                  <button className="px-3 py-1.5 rounded-lg bg-violet-600/20 text-violet-400 text-xs font-semibold">24H</button>
                  <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-medium">7D</button>
                  <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-medium">30D</button>
                </div>
              </div>

              {/* Simulated Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2">
                {[40, 65, 45, 85, 60, 95, 75, 55, 80, 90, 100, 85].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      style={{ height: `${val}%` }}
                      className="w-full bg-gradient-to-t from-violet-600/40 via-violet-500 to-indigo-400 rounded-t-lg group-hover:brightness-125 transition-all"
                    />
                    <span className="text-[10px] text-slate-500 font-medium">Day {i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">System Activity</h3>
                <span className="text-xs text-violet-400 font-medium hover:underline cursor-pointer">View all</span>
              </div>
              <div className="space-y-4 flex-1">
                {recentActivity.map((act) => (
                  <div key={act.id} className="flex items-start space-x-3 p-3 rounded-2xl bg-[#08090d]/60 border border-slate-800/60">
                    <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 mt-0.5">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{act.action}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-violet-300/80">{act.user}</span>
                        <span className="text-[10px] text-slate-500">{act.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Active Collaborators</h3>
                <span className="text-xs text-slate-400">Manage workspace permissions and access roles</span>
              </div>
              <button 
                onClick={() => triggerToast('Invite link copied to clipboard')}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/25 transition-all"
              >
                Invite Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Subscription</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 flex items-center space-x-3">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <div className="font-semibold text-white">{u.name}</div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300 font-medium">{u.role}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/30 text-slate-400'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-violet-400 font-semibold">{u.plan}</td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => triggerToast(`Settings opened for ${u.name}`)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative animate-scale-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Create New Project</h3>
            <p className="text-sm text-slate-400 mb-6">Provision a new microservice cluster and telemetry stream.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. quantum-gateway-api" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Region</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500">
                  <option>us-east-1 (N. Virginia)</option>
                  <option>eu-west-1 (Ireland)</option>
                  <option>ap-southeast-1 (Singapore)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  triggerToast('Project provisioned successfully!');
                }}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25"
              >
                Deploy Cluster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}