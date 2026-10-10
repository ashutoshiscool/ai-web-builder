import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap, 
  Shield, 
  Settings, 
  Bell, 
  Search, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Filter, 
  CheckCircle2, 
  CreditCard, 
  Activity, 
  Sparkles,
  Download,
  Menu,
  X
} from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'customers' | 'billing' | 'settings'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);

  // Mock Metrics Data
  const metrics: Metric[] = [
    { title: 'Total Monthly Recurring Revenue', value: '$84,250', change: '+14.2%', isPositive: true, icon: DollarSign },
    { title: 'Active Subscribers', value: '2,420', change: '+8.1%', isPositive: true, icon: Users },
    { title: 'Server Response Time', value: '24ms', change: '-3.4%', isPositive: true, icon: Zap },
    { title: 'Churn Rate', value: '1.2%', change: '-0.4%', isPositive: true, icon: TrendingUp },
  ];

  // Mock Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-9842', customer: 'Acme Corporation', email: 'billing@acme.co', plan: 'Enterprise Pro', amount: '$1,200.00', status: 'Completed', date: 'Today, 2:45 PM' },
    { id: 'TX-9841', customer: 'Stellar Dynamics', email: 'finance@stellar.io', plan: 'Growth Tier', amount: '$450.00', status: 'Completed', date: 'Today, 11:20 AM' },
    { id: 'TX-9840', customer: 'Nexus Labs', email: 'admin@nexuslabs.dev', plan: 'Starter', amount: '$99.00', status: 'Pending', date: 'Yesterday' },
    { id: 'TX-9839', customer: 'Vortex AI', email: 'ceo@vortex.ai', plan: 'Enterprise Pro', amount: '$1,200.00', status: 'Completed', date: 'May 12, 2024' },
    { id: 'TX-9838', customer: 'Quantum UI', email: 'hello@quantumui.org', plan: 'Growth Tier', amount: '$450.00', status: 'Failed', date: 'May 10, 2024' },
  ]);

  const filteredTransactions = transactions.filter(t => 
    t.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/80 bg-[#0b0f19]/60 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">PulseMetrics</span>
            <span className="block text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">Enterprise SaaS</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-indigo-400">
            <Shield className="w-4 h-4" /> Pro Guard Active
          </div>
          <p className="text-xs text-slate-400 mb-3">Your system is operating at 99.99% uptime SLA.</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full w-[99%] rounded-full" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-xl font-bold capitalize text-white flex items-center gap-2">
                {activeTab} 
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">Live Sync</span>
              </h1>
              <p className="text-xs text-slate-400">Welcome back, Alex. Here is your platform health for today.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 w-64 text-sm focus-within:border-indigo-500 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search customers, plans..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 w-full text-xs"
              />
            </div>

            {/* Time Filter */}
            <div className="hidden sm:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
              {(['7d', '30d', '90d', '12m'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    timeRange === range ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Notifications toggle */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:bg-slate-800 relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <span className="font-semibold text-sm text-white">Notifications</span>
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">3 Unread</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                      <p className="font-medium text-slate-200">New Enterprise Plan Subscribed</p>
                      <p className="text-slate-400 mt-0.5">Acme Corp upgraded to Enterprise ($1,200/mo).</p>
                      <span className="text-[10px] text-indigo-400 mt-2 block">10 minutes ago</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                      <p className="font-medium text-slate-200">API Gateway Latency Alert Resolved</p>
                      <p className="text-slate-400 mt-0.5">Server response recovered back to 24ms.</p>
                      <span className="text-[10px] text-indigo-400 mt-2 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-md text-white">
                AJ
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#0b0f19]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform text-indigo-400 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      metric.isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-1">{metric.value}</h3>
                  <p className="text-xs text-slate-400 font-medium">{metric.title}</p>
                </div>
              );
            })}
          </div>

          {/* Analytics Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 bg-[#0b0f19]/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Revenue Velocity</h2>
                  <p className="text-xs text-slate-400">Comparing recurring revenue growth over recent cycles</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>

              {/* Simulated Bar Graph / Chart */}
              <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-800/60">
                {[
                  { month: 'Jan', val: '40%', amount: '$52k' },
                  { month: 'Feb', val: '55%', amount: '$61k' },
                  { month: 'Mar', val: '48%', amount: '$58k' },
                  { month: 'Apr', val: '70%', amount: '$72k' },
                  { month: 'May', val: '85%', amount: '$81k' },
                  { month: 'Jun', val: '95%', amount: '$84.2k' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">{bar.amount}</span>
                    <div 
                      style={{ height: bar.val }}
                      className="w-full bg-gradient-to-t from-indigo-900/80 via-indigo-600 to-violet-500 rounded-t-xl group-hover:brightness-125 transition-all shadow-lg shadow-indigo-500/10"
                    />
                    <span className="text-xs font-medium text-slate-400 mt-1">{bar.month}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 text-xs text-slate-400">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Recurring Subscriptions</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> One-time Addons</span>
              </div>
            </div>

            {/* Quick Actions & System Status */}
            <div className="bg-[#0b0f19]/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Quick Actions</h2>
                <p className="text-xs text-slate-400 mb-6">Manage customer access & billing rules</p>

                <div className="space-y-3">
                  <button 
                    onClick={() => setNewCustomerModal(true)}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-105 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-200">Provision Subscription</p>
                        <p className="text-xs text-slate-400">Manual workspace assignment</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('billing')}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-200">Run Invoicing Cycle</p>
                        <p className="text-xs text-slate-400">Dispatch automated receipts</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-105 transition-transform">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-200">Audit System Logs</p>
                        <p className="text-xs text-slate-400">Inspect webhooks & API keys</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> All Systems Nominal
                </span>
                <span>v4.8.2-prod</span>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-[#0b0f19]/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
                <p className="text-xs text-slate-400">Latest subscription invoices and credit card settlements</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Filter transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800/80 text-slate-400 font-medium">
                    <th className="pb-3 px-4">Transaction ID</th>
                    <th className="pb-3 px-4">Customer</th>
                    <th className="pb-3 px-4">Plan Tier</th>
                    <th className="pb-3 px-4">Amount</th>
                    <th className="pb-3 px-4">Status</th>
                    <th className="pb-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-semibold text-indigo-400">{tx.id}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{tx.customer}</div>
                        <div className="text-[11px] text-slate-500">{tx.email}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300 font-medium">{tx.plan}</td>
                      <td className="py-4 px-4 font-bold text-white">{tx.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-400">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* New Customer / Provision Modal */}
      {newCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Provision New Subscription</h3>
              <button 
                onClick={() => setNewCustomerModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-6">Manually create a client tenant account and assign billing tiers.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Apex Innovations"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Billing Email</label>
                <input 
                  type="email" 
                  placeholder="billing@apex.io"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Subscription Tier</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 outline-none">
                  <option>Starter ($99/mo)</option>
                  <option>Growth Tier ($450/mo)</option>
                  <option>Enterprise Pro ($1,200/mo)</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setNewCustomerModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setTransactions([
                      { 
                        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`, 
                        customer: 'Apex Innovations', 
                        email: 'billing@apex.io', 
                        plan: 'Enterprise Pro', 
                        amount: '$1,200.00', 
                        status: 'Completed', 
                        date: 'Just now' 
                      },
                      ...transactions
                    ]);
                    setNewCustomerModal(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-600/30"
                >
                  Create Tenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}