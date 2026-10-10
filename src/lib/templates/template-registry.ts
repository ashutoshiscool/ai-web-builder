export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: "SaaS" | "AI" | "E-Commerce" | "Portfolio" | "Admin" | "Finance" | "Productivity" | "Landing";
  framework: "react-vite" | "nextjs" | "vanilla-html";
  tags: string[];
  features: string[];
  files: Record<string, string>;
  dependencies: Record<string, string>;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "saas-dashboard",
    name: "SaaS Analytics & Billing Suite",
    description: "Production-grade SaaS dashboard with auth state, PostgreSQL health metrics, Stripe billing tiers, and live analytics.",
    category: "SaaS",
    framework: "react-vite",
    tags: ["SaaS", "Dashboard", "Stripe", "PostgreSQL", "Analytics"],
    features: ["Stripe Subscription Tiers", "PostgreSQL Health Monitor", "Real-time Metrics", "Admin User Management"],
    dependencies: {
      "lucide-react": "^0.470.0",
    },
    files: {
      "src/App.tsx": `import React, { useState } from 'react';
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
              className={\`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all \${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}\`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={\`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all \${activeTab === 'billing' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}\`}
            >
              Stripe Billing
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={\`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all \${activeTab === 'database' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}\`}
            >
              PostgreSQL
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={\`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all \${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}\`}
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
                      style={{ height: \`\${item.val}%\` }}
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
                  className={\`rounded-2xl p-6 border transition-all flex flex-col justify-between \${tier.popular ? 'bg-slate-900/90 border-indigo-500/50 shadow-xl shadow-indigo-500/10' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}\`}
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
                    className={\`w-full py-2.5 rounded-xl font-medium text-xs transition-all \${tier.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}\`}
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
`,
    },
  },
  {
    id: "ai-chat-assistant",
    name: "AI Copilot & Knowledge Assistant",
    description: "Multimodal AI assistant with conversation threads, prompt presets, markdown rendering, and token counter.",
    category: "AI",
    framework: "react-vite",
    tags: ["AI", "Chat", "LLM", "Prompt Engineering"],
    features: ["Streaming Response UI", "Knowledge Context Drawer", "Model Tuning Controls", "Export Conversation"],
    dependencies: {
      "lucide-react": "^0.470.0",
    },
    files: {
      "src/App.tsx": `import React, { useState } from 'react';
import { Bot, User, Send, Sparkles, RefreshCw, Trash2, Sliders, ChevronDown } from 'lucide-react';

interface Msg {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: '1', sender: 'ai', text: "Hello! I am your AI Knowledge Assistant. Ask me anything, paste documents, or brainstorm new features." }
  ]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('Gemini 3.8 Flash');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiReply: Msg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: \`Analyzing query with \${model}...\\n\\nHere is a structured synthesis of your request with actionable insights and code examples.\`
      };
      setMessages(prev => [...prev, aiReply]);
    }, 600);
  };

  return (
    <div className="h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <div className="border-b border-slate-800/80 bg-slate-950/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">NovaChat Copilot</h1>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Neural Engine Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none"
          >
            <option>Gemini 3.8 Flash</option>
            <option>Claude 3.7 Sonnet</option>
            <option>GPT-5 Astra</option>
            <option>DeepSeek R1</option>
          </select>
          <button 
            onClick={() => setMessages([{ id: '1', sender: 'ai', text: "Chat history cleared. How can I help?" }])}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((m) => (
          <div key={m.id} className={\`flex gap-3 \${m.sender === 'user' ? 'justify-end' : 'justify-start'}\`}>
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
            <div className={\`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed \${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-bl-sm whitespace-pre-line'}\`}>
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 max-w-3xl w-full mx-auto">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 focus-within:border-indigo-500/50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your instruction or prompt..."
            className="flex-1 bg-transparent px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button 
            onClick={handleSend}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
`,
    },
  },
  {
    id: "ecommerce-store",
    name: "Modern E-Commerce Storefront",
    description: "High-conversion product showcase with category filtering, slide-out cart drawer, and responsive checkout.",
    category: "E-Commerce",
    framework: "react-vite",
    tags: ["E-Commerce", "Cart", "Checkout", "Shopping"],
    features: ["Interactive Cart Drawer", "Category Filtering", "Responsive Grid", "Order Confirmation Modal"],
    dependencies: {
      "lucide-react": "^0.470.0",
    },
    files: {
      "src/App.tsx": `import React, { useState } from 'react';
import { ShoppingBag, Star, X, Check, ArrowRight, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Minimalist Mechanical Keyboard", price: 149, rating: 4.9, category: "Hardware", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "Wireless Studio Headphones", price: 299, rating: 4.8, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "Precision Ergonomic Mouse", price: 89, rating: 4.7, category: "Hardware", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60" },
  { id: 4, name: "Ultra-Wide OLED Monitor Light", price: 79, rating: 4.9, category: "Lighting", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60" },
];

export default function App() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const filtered = selectedCategory === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
          AURA LABS
        </h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700"
        >
          <ShoppingBag className="w-5 h-5 text-indigo-400" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-[10px] font-bold flex items-center justify-center text-white">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
        <div className="flex gap-2">
          {["All", "Hardware", "Audio", "Lighting"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all \${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}\`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div className="h-44 bg-slate-950 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-white line-clamp-1">{product.name}</h3>
                  <div className="text-base font-bold text-indigo-400 mt-2">\${product.price}</div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-slate-950 border-l border-slate-800 h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <h3 className="font-bold text-white text-base">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-12">Your cart is empty.</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <div className="font-medium text-white">{item.product.name}</div>
                        <div className="text-slate-400">\${item.product.price} x {item.quantity}</div>
                      </div>
                      <div className="font-bold text-indigo-400">\${item.product.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between font-bold text-sm text-white">
                  <span>Total:</span>
                  <span>\${total}</span>
                </div>
                <button 
                  onClick={() => { alert('Order placed successfully!'); setCart([]); setIsCartOpen(false); }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
`,
    },
  },
  {
    id: "portfolio-blog",
    name: "Developer Portfolio & Tech Journal",
    description: "Sleek personal engineering site with projects showcase, interactive skills matrix, and markdown blog.",
    category: "Portfolio",
    framework: "react-vite",
    tags: ["Portfolio", "Blog", "Developer", "Resume"],
    features: ["Project Showcase Grid", "Timeline History", "Tech Stack Tags", "Contact Form"],
    dependencies: {
      "lucide-react": "^0.470.0",
    },
    files: {
      "src/App.tsx": `import React, { useState } from 'react';
import { Github, Twitter, Linkedin, ExternalLink, Code2, Terminal, Briefcase, Mail } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'contact'>('projects');

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans">
      <main className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-12">
        {/* Intro */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Available for Staff Architect roles
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            David Vance
          </h1>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            Staff Full-Stack & AI Systems Architect building next-generation autonomous software interfaces, distributed compilers, and real-time developer engines.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-slate-800 gap-6 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('projects')} 
            className={\`pb-3 border-b-2 transition-all \${activeTab === 'projects' ? 'border-indigo-500 text-white font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'}\`}
          >
            Featured Systems
          </button>
          <button 
            onClick={() => setActiveTab('about')} 
            className={\`pb-3 border-b-2 transition-all \${activeTab === 'about' ? 'border-indigo-500 text-white font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'}\`}
          >
            Engineering Background
          </button>
          <button 
            onClick={() => setActiveTab('contact')} 
            className={\`pb-3 border-b-2 transition-all \${activeTab === 'contact' ? 'border-indigo-500 text-white font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'}\`}
          >
            Direct Contact
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {[
              { title: "HyperVektor", desc: "Distributed vector database for real-time semantic caching and retrieval.", tech: ["Rust", "WASM", "gRPC", "Next.js"] },
              { title: "Synapse Runtime", desc: "In-browser WASM compilation sandbox executing arbitrary Node & Python tasks.", tech: ["TypeScript", "WebAssembly", "Docker"] },
              { title: "Aether Grid", desc: "Global edge-computing mesh with sub-millisecond route dispatch.", tech: ["Go", "Kubernetes", "PostgreSQL"] },
              { title: "PromptForge AI", desc: "Automated regression testing engine for autonomous agent workflows.", tech: ["Python", "FastAPI", "React 19"] }
            ].map((p, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center justify-between">
                    {p.title}
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6 text-xs text-slate-300 leading-relaxed max-w-2xl animate-fadeIn">
            <p>Over the past 9 years, I have architected high-scale systems processing millions of queries per second across fintech and developer tools companies.</p>
            <div className="border-l-2 border-slate-800 pl-4 space-y-4">
              <div>
                <h4 className="font-bold text-white text-sm">Principal Architect — Vektor Labs (2023 - Present)</h4>
                <p className="text-slate-400">Architected distributed streaming inference runtime and automated testing suite.</p>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Staff Engineer — ScaleCloud (2020 - 2023)</h4>
                <p className="text-slate-400">Led core runtime team building multi-tenant isolated worker pods.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-md space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-white">Let's discuss a technical collaboration</h3>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <textarea 
              rows={4} 
              placeholder="Project details or message..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button 
              onClick={() => alert('Message transmitted!')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
            >
              Send Message
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
`,
    },
  },
  {
    id: "kanban-board",
    name: "Agile Kanban Project Board",
    description: "Collaborative project management board with drag-ready task columns, priority tags, and task metrics.",
    category: "Productivity",
    framework: "react-vite",
    tags: ["Kanban", "Productivity", "Project Management"],
    features: ["Multi-column Workflow", "Task Creator Modal", "Tag Filtering", "Progress Counter"],
    dependencies: {
      "lucide-react": "^0.470.0",
    },
    files: {
      "src/App.tsx": `import React, { useState } from 'react';
import { Plus, MoreHorizontal, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  column: 'backlog' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Implement Stripe webhook signature verification', column: 'in_progress', priority: 'high' },
    { id: '2', title: 'Migrate PostgreSQL indices to BRIN', column: 'backlog', priority: 'medium' },
    { id: '3', title: 'Design dark mode Monaco theme tokens', column: 'done', priority: 'low' },
    { id: '4', title: 'Add multi-model streaming fallback handlers', column: 'review', priority: 'high' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), title: newTitle, column: 'backlog', priority: 'medium' }]);
    setNewTitle('');
    setShowAdd(false);
  };

  const moveTask = (id: string, col: Task['column']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, column: col } : t));
  };

  const columns: { id: Task['column']; label: string }[] = [
    { id: 'backlog', label: 'Backlog' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'review', label: 'In Review' },
    { id: 'done', label: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans p-6">
      <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-bold text-white">Sprint Execution Board</h1>
          <p className="text-xs text-slate-400">Core engineering roadmap for Q4</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold text-white shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto w-full flex-1">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.column === col.id);
          return (
            <div key={col.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-xs text-slate-300">{col.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-bold">{colTasks.length}</span>
              </div>

              <div className="space-y-3 flex-1">
                {colTasks.map((task) => (
                  <div key={task.id} className="bg-slate-900 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700 transition-all text-xs space-y-2">
                    <p className="text-slate-200 font-medium">{task.title}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className={\`text-[10px] font-semibold px-2 py-0.5 rounded \${task.priority === 'high' ? 'bg-rose-500/20 text-rose-300' : task.priority === 'medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}\`}>
                        {task.priority}
                      </span>
                      <select 
                        value={task.column} 
                        onChange={(e) => moveTask(task.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 text-[10px] rounded px-1.5 py-0.5 text-slate-400 focus:outline-none"
                      >
                        <option value="backlog">Backlog</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-sm text-white">Create Roadmap Task</h3>
            <input 
              type="text" 
              value={newTitle} 
              onChange={e => setNewTitle(e.target.value)} 
              placeholder="Task description..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2 bg-slate-800 rounded-xl text-xs text-slate-400">Cancel</button>
              <button onClick={addTask} className="flex-1 py-2 bg-indigo-600 rounded-xl text-xs text-white font-medium">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`,
    },
  },
  {
    id: "landing-page",
    name: "Autonomous AI Startup Landing Page",
    description: "High-converting dark SaaS marketing page with animated hero, interactive demo teaser, bento features, and pricing table.",
    category: "Landing",
    framework: "react-vite",
    tags: ["Landing Page", "Marketing", "SaaS", "Conversion"],
    features: ["Hero with Glow Accents", "Bento Grid Features", "Interactive Calculator", "FAQ Accordion"],
    dependencies: {
      "lucide-react": "^0.470.0",
    },
    files: {
      "src/App.tsx": `import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Zap, Terminal, Code2, Cpu } from 'lucide-react';

export default function App() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-white">Synthetix AI</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-xs text-slate-400 hover:text-white transition-all">Features</a>
          <a href="#pricing" className="text-xs text-slate-400 hover:text-white transition-all">Pricing</a>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32 px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Autonomous Agent Engine</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Ship full-stack apps at the <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">speed of thought</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          Describe your application in plain natural language. Our autonomous agents create, test, and deploy production-ready code with isolated runtimes.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center gap-2">
            <span>Start Building Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Features Bento */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Engineered for Technical Founders</h2>
          <p className="text-xs text-slate-400">Everything needed to bring scalable software from concept to production.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Self-Healing Runtime</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous compiler diagnostics catch runtime errors, inspect stack traces, and apply targeted patches in seconds.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Multi-Model Orchestration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically route planning to reasoning models and targeted code edits to lightning-fast streaming engines.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Isolated Execution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every project executes inside isolated ephemeral sandboxes with real file persistence, protecting secrets and data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
`,
    },
  },
];
