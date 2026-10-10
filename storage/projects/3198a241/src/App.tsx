import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Bell, 
  Search, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  PieChart, 
  Shield, 
  Zap, 
  RefreshCw, 
  Download, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Menu, 
  X, 
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: string;
}

interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'customers' | 'settings'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const metrics: MetricCard[] = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$128,430',
      change: '+14.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Active Subscribers',
      value: '2,480',
      change: '+8.1%',
      isPositive: true,
      icon: Users,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Net Revenue Retention',
      value: '118.4%',
      change: '+2.3%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Customer Churn Rate',
      value: '1.4%',
      change: '-0.4%',
      isPositive: true,
      icon: Activity,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    }
  ];

  const transactions: Transaction[] = [
    { id: 'TX-9821', customer: 'Acme Corp', email: 'billing@acme.io', plan: 'Enterprise Annual', amount: '$12,000', status: 'completed', date: 'Today, 2:45 PM' },
    { id: 'TX-9820', customer: 'Globex Industries', email: 'finance@globex.org', plan: 'Scale Monthly', amount: '$1,450', status: 'completed', date: 'Today, 1:12 PM' },
    { id: 'TX-9819', customer: 'Stark Enterprises', email: 'ap@stark.com', plan: 'Enterprise Annual', amount: '$24,000', status: 'pending', date: 'Yesterday, 5:30 PM' },
    { id: 'TX-9818', customer: 'Wayne Enterprises', email: 'bwayne@wayne.co', plan: 'Growth Monthly', amount: '$850', status: 'completed', date: 'Yesterday, 11:15 AM' },
    { id: 'TX-9817', customer: 'Soylent Corp', email: 'orders@soylent.net', plan: 'Starter Monthly', amount: '$299', status: 'failed', date: 'Oct 24, 2024' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b0f19] border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              PulseMetrics
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Platform</p>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              Analytics & MRR
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'customers'
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Users className="w-4 h-4" />
              Customers & Plans
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Configuration</p>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'settings'
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings & Billing
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800/80 bg-[#0b0f19]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center font-bold justify-center text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate">jane@pulsemetrics.io</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 sticky top-0 z-40 bg-[#08090d]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search transactions, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm text-slate-200">Notifications</h4>
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">2 new</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs">
                      <p className="font-medium text-slate-200">New Enterprise Subscription</p>
                      <p className="text-slate-400 mt-0.5">Acme Corp upgraded to Enterprise Annual ($12,000)</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">10 mins ago</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs">
                      <p className="font-medium text-slate-200">MRR Milestone Reached</p>
                      <p className="text-slate-400 mt-0.5">You crossed $125k MRR this month! 🎉</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-300">
              <span>{dateRange}</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-4 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900/80 border border-indigo-500/20 p-6 lg:p-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Metrics Stream Active
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  Welcome back, Jane 👋
                </h1>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">
                  Your SaaS revenue grew by <span className="text-emerald-400 font-semibold">+14.2%</span> this month. Enterprise tier conversions are driving highest retention.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-sm font-medium text-slate-200 hover:bg-slate-800 transition-all">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition-all">
                  <Plus className="w-4 h-4" />
                  New Plan
                </button>
              </div>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400">{metric.title}</span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${metric.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{metric.value}</span>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      metric.isPositive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts & Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Growth Chart Simulation */}
            <div className="lg:col-span-2 bg-[#0b0f19] border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Revenue Trajectory</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Monthly recurring revenue growth over past 6 months</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span> MRR ($K)
                  </span>
                </div>
              </div>

              {/* Simulated Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-800/80">
                {[
                  { month: 'May', val: 78, height: '45%' },
                  { month: 'Jun', val: 89, height: '55%' },
                  { month: 'Jul', val: 98, height: '65%' },
                  { month: 'Aug', val: 110, height: '75%' },
                  { month: 'Sep', val: 119, height: '85%' },
                  { month: 'Oct', val: 128, height: '95%' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                      ${bar.val}k
                    </div>
                    <div 
                      style={{ height: bar.height }} 
                      className="w-full max-w-[48px] bg-gradient-to-t from-indigo-600/60 via-indigo-500 to-purple-500 rounded-t-xl transition-all duration-300 group-hover:brightness-125 shadow-lg shadow-indigo-500/10"
                    ></div>
                    <span className="text-xs font-medium text-slate-400">{bar.month}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 text-xs text-slate-400">
                <span>Target: $150k MRR by Q1</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                  View Detailed Breakdown <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="bg-[#0b0f19] border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Subscription Tiers</h3>
                <p className="text-xs text-slate-400 mt-0.5">Active user split across plans</p>
              </div>

              <div className="space-y-4 my-6">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Enterprise Annual</span>
                    <span className="text-indigo-400">48% ($61.6k)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Scale Monthly</span>
                    <span className="text-blue-400">32% ($41.1k)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Growth Monthly</span>
                    <span className="text-emerald-400">14% ($18.0k)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Starter</span>
                    <span className="text-amber-400">6% ($7.7k)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: '6%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3 text-xs text-indigo-300">
                <Shield className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>Enterprise renewals increased by 94% over the last quarter.</span>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time payment logs and subscription events</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white">
                  <Filter className="w-3.5 h-3.5" /> Filter Status
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Plan</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-medium">{tx.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-200">{tx.customer}</div>
                        <div className="text-xs text-slate-500">{tx.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{tx.plan}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{tx.amount}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : tx.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {tx.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                          {tx.status === 'pending' && <RefreshCw className="w-3 h-3 animate-spin" />}
                          {tx.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                          <span className="capitalize">{tx.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}