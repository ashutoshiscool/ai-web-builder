import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Play, 
  RotateCcw, 
  Plus, 
  Search, 
  Filter, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Terminal,
  FileText
} from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  category: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  duration: string;
  lastRun: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'tests' | 'console' | 'reports'>('tests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isRunningAll, setIsRunningAll] = useState(false);

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 'TC-001', title: 'User authentication & JWT token generation', category: 'Auth', status: 'passed', duration: '240ms', lastRun: '2 mins ago' },
    { id: 'TC-002', title: 'Checkout flow with stripe webhook verification', category: 'Billing', status: 'passed', duration: '1.2s', lastRun: '5 mins ago' },
    { id: 'TC-003', title: 'RBAC permissions check for Admin dashboard', category: 'Security', status: 'failed', duration: '450ms', lastRun: '12 mins ago' },
    { id: 'TC-004', title: 'Real-time WebSocket reconnection backoff test', category: 'Network', status: 'pending', duration: '-', lastRun: 'Never' },
    { id: 'TC-005', title: 'Data export CSV generation for large datasets', category: 'Reports', status: 'passed', duration: '3.4s', lastRun: '1 hour ago' },
  ]);

  const runAllTests = () => {
    setIsRunningAll(true);
    setTestCases(prev => prev.map(tc => ({ ...tc, status: 'running', duration: '...' })));
    
    setTimeout(() => {
      setTestCases(prev => prev.map(tc => ({
        ...tc,
        status: Math.random() > 0.2 ? 'passed' : 'failed',
        duration: `${Math.floor(Math.random() * 800 + 100)}ms`,
        lastRun: 'Just now'
      })));
      setIsRunningAll(false);
    }, 1500);
  };

  const filteredTests = testCases.filter(tc => {
    const matchesSearch = tc.title.toLowerCase().includes(searchTerm.toLowerCase()) || tc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const passedCount = testCases.filter(t => t.status === 'passed').length;
  const failedCount = testCases.filter(t => t.status === 'failed').length;
  const pendingCount = testCases.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Acceptance Test Suite
            </h1>
            <p className="text-xs text-slate-400">Automated QA & Integration Testing Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={runAllTests}
            disabled={isRunningAll}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Play className={`w-4 h-4 ${isRunningAll ? 'animate-spin' : ''}`} />
            <span>{isRunningAll ? 'Executing Suite...' : 'Run All Tests'}</span>
          </button>
          <button 
            onClick={() => {
              setTestCases(prev => prev.map(tc => ({ ...tc, status: 'pending', duration: '-', lastRun: 'Reset' })));
            }}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer text-slate-300"
            title="Reset All"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Tests</p>
              <p className="text-2xl font-bold mt-1 text-white">{testCases.length}</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-emerald-900/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Passed</p>
              <p className="text-2xl font-bold mt-1 text-emerald-300">{passedCount}</p>
            </div>
            <div className="p-3 bg-emerald-950/50 border border-emerald-800/30 rounded-xl text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-rose-900/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-rose-400 uppercase tracking-wider">Failed</p>
              <p className="text-2xl font-bold mt-1 text-rose-300">{failedCount}</p>
            </div>
            <div className="p-3 bg-rose-950/50 border border-rose-800/30 rounded-xl text-rose-400">
              <XCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-amber-900/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-bold mt-1 text-amber-300">{pendingCount}</p>
            </div>
            <div className="p-3 bg-amber-950/50 border border-amber-800/30 rounded-xl text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 space-x-6 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('tests')}
            className={`pb-3 border-b-2 transition flex items-center space-x-2 cursor-pointer ${activeTab === 'tests' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Layers className="w-4 h-4" />
            <span>Test Cases</span>
          </button>
          <button 
            onClick={() => setActiveTab('console')}
            className={`pb-3 border-b-2 transition flex items-center space-x-2 cursor-pointer ${activeTab === 'console' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Terminal className="w-4 h-4" />
            <span>Execution Logs</span>
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`pb-3 border-b-2 transition flex items-center space-x-2 cursor-pointer ${activeTab === 'reports' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <FileText className="w-4 h-4" />
            <span>Reports & JUnit XML</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'tests' && (
          <div className="flex flex-col gap-4">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search test cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <Filter className="w-4 h-4 text-slate-500" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Test Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">ID</th>
                      <th className="py-3.5 px-4">Title</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Duration</th>
                      <th className="py-3.5 px-4">Last Run</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {filteredTests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          No test cases matched your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredTests.map((tc) => (
                        <tr key={tc.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {tc.status === 'passed' && (
                              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/30">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Passed</span>
                              </span>
                            )}
                            {tc.status === 'failed' && (
                              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-950/60 text-rose-400 border border-rose-800/30">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Failed</span>
                              </span>
                            )}
                            {tc.status === 'pending' && (
                              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/60 text-amber-400 border border-amber-800/30">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Pending</span>
                              </span>
                            )}
                            {tc.status === 'running' && (
                              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-950/60 text-indigo-400 border border-indigo-800/30 animate-pulse">
                                <Play className="w-3.5 h-3.5 animate-spin" />
                                <span>Running</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-medium whitespace-nowrap">{tc.id}</td>
                          <td className="py-3.5 px-4 text-slate-200 font-medium">{tc.title}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-slate-800 rounded-md text-xs text-slate-300 font-mono">
                              {tc.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-xs whitespace-nowrap">{tc.duration}</td>
                          <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>{tc.lastRun}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
              <span className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>stdout / test-runner.log</span>
              </span>
              <span className="text-emerald-400">● Live Stream Connected</span>
            </div>
            <div className="py-2 space-y-1 overflow-y-auto max-h-96">
              <p className="text-slate-500">[14:02:01] INFO: Initializing Playwright test runner environment...</p>
              <p className="text-slate-500">[14:02:02] INFO: Loaded 5 acceptance test suites from configuration.</p>
              <p className="text-emerald-400">[14:02:03] SUCCESS: TC-001 User authentication & JWT token generation passed (240ms)</p>
              <p className="text-emerald-400">[14:02:04] SUCCESS: TC-002 Checkout flow with stripe webhook verification passed (1.2s)</p>
              <p className="text-rose-400 font-bold">[14:02:05] ERROR: TC-003 RBAC permissions check failed: Expected status 200, received 403 Forbidden.</p>
              <p className="text-slate-400">[14:02:05] STACKTRACE: at AuthGuard.validate (/src/middleware/auth.ts:42:11)</p>
              <p className="text-slate-500">[14:02:06] INFO: Awaiting user prompt for rerun...</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Test Execution Reports</h2>
            <p className="text-sm text-slate-400">
              Download certified JUnit XML or HTML reports for CI/CD pipeline integration (Jenkins, GitHub Actions, GitLab CI).
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => alert('Downloading JUnit XML report...')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition flex items-center space-x-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Download JUnit XML</span>
              </button>
              <button 
                onClick={() => alert('Generating HTML Test Report...')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition flex items-center space-x-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Export HTML Report</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/30 py-4 px-6 text-center text-xs text-slate-500 mt-auto">
        Acceptance Test App v1.0.4 • React 19 & TypeScript Engine
      </footer>
    </div>
  );
}