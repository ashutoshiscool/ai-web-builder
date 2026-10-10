import React, { useState } from "react";
import { 
  Sparkles, 
  Play, 
  Search, 
  Bell, 
  ChevronDown, 
  Check, 
  Plus, 
  X, 
  ArrowLeft, 
  Star, 
  Heart,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Shield,
  Zap
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const stats = [
    { label: "Total Revenue", value: "$48,250.00", change: "+12.5%", positive: true, icon: TrendingUp },
    { label: "Active Users", value: "2,420", change: "+8.2%", positive: true, icon: Users },
    { label: "Conversion Rate", value: "3.24%", change: "-0.4%", positive: false, icon: BarChart3 },
    { label: "System Uptime", value: "99.9%", change: "0.0%", positive: true, icon: Shield },
  ];

  const recentActivity = [
    { id: 1, user: "Sarah Jenkins", action: "Upgraded subscription", time: "2 minutes ago", amount: "$99.00" },
    { id: 2, user: "Alex Morgan", action: "New user registration", time: "15 minutes ago", amount: "$0.00" },
    { id: 3, user: "TechCorp Inc.", action: "Enterprise license renewal", time: "1 hour ago", amount: "$1,250.00" },
    { id: 4, user: "Elena Rostova", action: "Purchased add-on pack", time: "3 hours ago", amount: "$49.00" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Vortex UI</h1>
            <p className="text-xs text-slate-400">Enterprise Suite</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "overview" 
                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "analytics" 
                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "users" 
                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Users className="h-4 w-4" />
            Users & Roles
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "settings" 
                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-gradient-to-br from-indigo-950/50 to-slate-900 p-4 rounded-2xl border border-indigo-500/20">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              Pro Plan
            </div>
            <p className="text-xs text-slate-400 mb-3">You are using 85% of your available API resources this month.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs py-2 rounded-lg transition shadow-lg shadow-indigo-600/20">
              Upgrade Plan
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search metrics, reports, or users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-xl border transition ${isLiked ? 'bg-pink-500/10 border-pink-500/30 text-pink-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
              title="Favorite"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-pink-500' : ''}`} />
            </button>

            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 relative transition"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <span className="font-semibold text-sm text-slate-200">Notifications</span>
                    <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-800/40 rounded-xl text-xs text-slate-300">
                      Server CPU utilization peaked at 92%.
                    </div>
                    <div className="p-2.5 bg-slate-800/40 rounded-xl text-xs text-slate-300">
                      New enterprise client onboarded successfully.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-800"></div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-slate-200">Jane Doe</div>
                <div className="text-xs text-slate-400">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/30 via-slate-900 to-slate-900 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
                <Sparkles className="h-3 w-3" /> System Operational
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Welcome back, Jane!</h2>
              <p className="text-slate-400 text-sm max-w-xl">Here is what's happening with your projects today. All server nodes are running smoothly with optimum performance.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition">
                <Clock className="h-4 w-4" /> View Logs
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-600/30 transition">
                <Plus className="h-4 w-4" /> New Project
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <div key={i} className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-700 transition group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.positive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity Table */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
                <p className="text-xs text-slate-400">Latest transactions and platform events</p>
              </div>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-4">User / Entity</th>
                    <th className="pb-3 px-4">Action</th>
                    <th className="pb-3 px-4">Timestamp</th>
                    <th className="pb-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {recentActivity.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-4 font-medium text-slate-200 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                          {item.user.charAt(0)}
                        </div>
                        {item.user}
                      </td>
                      <td className="py-4 px-4 text-slate-300">{item.action}</td>
                      <td className="py-4 px-4 text-slate-500 text-xs">{item.time}</td>
                      <td className="py-4 px-4 text-right font-semibold text-emerald-400">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}