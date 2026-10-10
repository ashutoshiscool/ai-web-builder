import React, { useState } from 'react';
import { 
  BarChart3, Users, DollarSign, Database, CreditCard, 
  ShieldCheck, ArrowUpRight, TrendingUp, Bell, Search, 
  Settings, CheckCircle2, ChevronRight, Activity, Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'billing' | 'database' | 'admin'>('analytics');
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              PulseSaaS
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              v2.5 Live
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === 'billing' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              Stripe Billing
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === 'database' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              PostgreSQL
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              Admin
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200">
            <Bell className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
            <span className="text-xs font-medium text-slate-300">john@enterprise.io</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Monthly Recurring Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">$48,250</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% from last month</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Active Subscribers</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-white">1,429</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+124 new this week</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">PostgreSQL QPS</span>
                  <Database className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">18.4k/s</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>Avg Latency 1.8ms</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Stripe Churn Rate</span>
                  <CreditCard className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">0.82%</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Industry benchmark: 2.1%</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Analytics Graph */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white">Revenue & Subscription Trajectory</h3>
                  <p className="text-xs text-slate-400">Audited Stripe webhooks and transaction telemetry</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs text-emerald-400 font-medium">Live Ingest</span>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="h-48 flex items-end gap-3 pt-6 px-2">
                {[
                  { m: 'Jan', val: 45, rev: '$22k' },
                  { m: 'Feb', val: 52, rev: '$26k' },
                  { m: 'Mar', val: 58, rev: '$29k' },
                  { m: 'Apr', val: 66, rev: '$33k' },
                  { m: 'May', val: 74, rev: '$37k' },
                  { m: 'Jun', val: 82, rev: '$41k' },
                  { m: 'Jul', val: 88, rev: '$44k' },
                  { m: 'Aug', val: 95, rev: '$48k' },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {item.rev}
                    </div>
                    <div 
                      style={{ height: `${item.val}%` }}
                      className="w-full bg-gradient-to-t from-indigo-900/40 via-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-indigo-700 group-hover:to-indigo-300 transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
                    />
                    <span className="text-xs text-slate-400 font-medium">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-white">Flexible Plans for Every Stage</h2>
              <p className="text-sm text-slate-400">Integrated with Stripe Checkout and customer portal webhooks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'starter', name: 'Starter', price: '$29', desc: 'Ideal for early-stage builders and MVPs.', features: ['Up to 10k monthly requests', '1 PostgreSQL Replica', 'Community Support', 'Basic Metrics'] },
                { id: 'pro', name: 'Pro Scaler', price: '$99', desc: 'For scaling products demanding high throughput.', popular: true, features: ['Unlimited monthly requests', 'Multi-region PostgreSQL clusters', '24/7 Priority Support', 'Automated Backups', 'Stripe Invoicing API'] },
                { id: 'enterprise', name: 'Enterprise', price: '$299', desc: 'Custom governance, dedicated nodes, SLA.', features: ['Custom dedicated VPC', '99.99% Guaranteed SLA', 'SOC2 / HIPAA Compliance', 'Dedicated Solution Engineer'] }
              ].map((tier) => (
                <div 
                  key={tier.id}
                  className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${tier.popular ? 'bg-slate-900/90 border-indigo-500/50 shadow-xl shadow-indigo-500/10' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
                >
                  <div>
                    {tier.popular && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500 text-white mb-3">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-4">{tier.desc}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                      <span className="text-xs text-slate-400">/month</span>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTier(tier.id as any);
                      setShowUpgradeModal(true);
                    }}
                    className={`w-full py-2.5 rounded-xl font-medium text-xs transition-all ${tier.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white">PostgreSQL Primary Cluster</h3>
                <p className="text-xs text-slate-400">Cluster: pg-prod-us-east-1.internal (Postgres 16.2)</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Healthy & Replicated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
                <div className="text-xs text-slate-400">Connection Pool</div>
                <div className="text-xl font-bold text-white mt-1">42 / 100</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[42%]"></div>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
                <div className="text-xs text-slate-400">Cache Hit Ratio</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">99.4%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[99%]"></div>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
                <div className="text-xs text-slate-400">Storage Used</div>
                <div className="text-xl font-bold text-white mt-1">14.8 GB / 50 GB</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-500 h-full w-[30%]"></div>
                </div>
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <div className="bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-400 border-b border-slate-800">
                Active Queries
              </div>
              <div className="divide-y divide-slate-800/60 font-mono text-xs">
                <div className="p-3 bg-slate-900/30 flex items-center justify-between text-slate-300">
                  <span className="text-indigo-400">SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC;</span>
                  <span className="text-slate-500 text-[10px]">1.2ms</span>
                </div>
                <div className="p-3 bg-slate-900/30 flex items-center justify-between text-slate-300">
                  <span className="text-indigo-400">UPDATE subscriptions SET renewed_at = NOW() WHERE stripe_id = 'sub_9182';</span>
                  <span className="text-slate-500 text-[10px]">2.8ms</span>
                </div>
                <div className="p-3 bg-slate-900/30 flex items-center justify-between text-slate-300">
                  <span className="text-indigo-400">INSERT INTO audit_logs (actor, action) VALUES ('admin', 'billing_sync');</span>
                  <span className="text-slate-500 text-[10px]">0.9ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">User Access & Roles</h3>
                <p className="text-xs text-slate-400">Manage tenant permissions and security credentials</p>
              </div>
              <button className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-medium text-white transition-all shadow-md">
                + Invite User
              </button>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold">User</th>
                    <th className="p-3 font-semibold">Role</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Joined</th>
                    <th className="p-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">Sarah Connor</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">Admin</span></td>
                    <td className="p-3 text-emerald-400">Active</td>
                    <td className="p-3 text-slate-500">2 days ago</td>
                    <td className="p-3 text-right"><button className="text-slate-400 hover:text-white">Edit</button></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Alex Rivera</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">Developer</span></td>
                    <td className="p-3 text-emerald-400">Active</td>
                    <td className="p-3 text-slate-500">1 week ago</td>
                    <td className="p-3 text-right"><button className="text-slate-400 hover:text-white">Edit</button></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Elena Rostova</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Billing Lead</span></td>
                    <td className="p-3 text-emerald-400">Active</td>
                    <td className="p-3 text-slate-500">1 month ago</td>
                    <td className="p-3 text-right"><button className="text-slate-400 hover:text-white">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Upgrade to {selectedTier.toUpperCase()}</h3>
            <p className="text-xs text-slate-400">
              Connecting to Stripe secure checkout. In production, this redirects directly to your configured Stripe Customer Portal.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert('Stripe checkout simulation completed!');
                  setShowUpgradeModal(false);
                }}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-lg shadow-indigo-600/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
