import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Play, 
  RotateCcw, 
  Filter, 
  Search, 
  Plus, 
  Terminal, 
  Layers, 
  ShieldCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  suite: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  duration: string;
  error?: string;
  lastRun: string;
}

const INITIAL_TESTS: TestCase[] = [
  {
    id: 'TC-001',
    title: 'User Authentication with valid OAuth credentials',
    suite: 'Authentication Suite',
    status: 'passed',
    duration: '240ms',
    lastRun: '2 mins ago'
  },
  {
    id: 'TC-002',
    title: 'Password complexity validation on registration',
    suite: 'Authentication Suite',
    status: 'failed',
    duration: '185ms',
    error: 'Expected error message "Password must contain a special character", but received none.',
    lastRun: '2 mins ago'
  },
  {
    id: 'TC-003',
    title: 'Checkout flow with discount voucher application',
    suite: 'E-Commerce Checkout',
    status: 'pending',
    duration: '-',
    lastRun: 'Never'
  },
  {
    id: 'TC-004',
    title: 'Stripe webhook payment confirmation processing',
    suite: 'Billing & Payments',
    status: 'passed',
    duration: '1.2s',
    lastRun: '15 mins ago'
  },
  {
    id: 'TC-005',
    title: 'Dashboard telemetry metric aggregation latency',
    suite: 'Performance Suite',
    status: 'failed',
    duration: '850ms',
    error: 'Timeout exceeded 500ms threshold (Actual: 850ms)',
    lastRun: '1 hour ago'
  },
];

export default function App() {
  const [tests, setTests] = useState<TestCase[]>(INITIAL_TESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(INITIAL_TESTS[1]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.suite.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  const pendingCount = tests.filter(t => t.status === 'pending').length;
  const successRate = Math.round((passedCount / (tests.length || 1)) * 100);

  const handleRunAll = () => {
    setIsRunningAll(true);
    setTests(prev => prev.map(t => ({ ...t, status: 'running', duration: '...' })));

    setTimeout(() => {
      setTests(prev => prev.map(t => {
        const isFail = t.id === 'TC-002';
        return {
          ...t,
          status: isFail ? 'failed' : 'passed',
          duration: `${Math.floor(Math.random() * 400 + 100)}ms`,
          lastRun: 'Just now',
          error: isFail ? 'Assertion failed: expected 200 OK, got 422 Unprocessable Entity' : undefined
        };
      }));
      setIsRunningAll(false);
    }, 1500);
  };

  const handleRunSingle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTests(prev => prev.map(t => t.id === id ? { ...t, status: 'running', duration: '...' } : t));

    setTimeout(() => {
      setTests(prev => prev.map(t => {
        if (t.id !== id) return t;
        return {
          ...t,
          status: 'passed',
          duration: '142ms',
          lastRun: 'Just now',
          error: undefined
        };
      }));
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Acceptance Test Suite
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 font-mono">v2.4-stable</span>
            </h1>
            <p className="text-xs text-slate-400">Automated Behavioral & Integration Validation Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRunAll}
            disabled={isRunningAll}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md shadow-indigo-900/40 cursor-pointer"
          >
            <Play className={`w-4 h-4 ${isRunningAll ? 'animate-spin' : ''}`} />
            <span>{isRunningAll ? 'Executing Suite...' : 'Run All Tests'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Test List & Filters */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          
          {/* Metrics Bar */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total</p>
                <p className="text-2xl font-bold text-white mt-1">{tests.length}</p>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg text-slate-300">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Passed</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{passedCount}</p>
              </div>
              <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-rose-400 font-medium uppercase tracking-wider">Failed</p>
                <p className="text-2xl font-bold text-rose-400 mt-1">{failedCount}</p>
              </div>
              <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
                <XCircle className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider">Success Rate</p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">{successRate}%</p>
              </div>
              <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
                <Terminal className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search tests by ID, title..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {['all', 'passed', 'failed', 'pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                    statusFilter === status 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Test Cases Table / List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Specifications ({filteredTests.length})</span>
              <span className="text-xs text-slate-500">Click row to inspect details</span>
            </div>

            <div className="divide-y divide-slate-800/80 max-h-[500px] overflow-y-auto">
              {filteredTests.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No test cases found</p>
                  <p className="text-xs text-slate-600 mt-1">Try adjusting your search or filter parameters.</p>
                </div>
              ) : (
                filteredTests.map((test) => {
                  const isSelected = selectedTest?.id === test.id;
                  return (
                    <div 
                      key={test.id}
                      onClick={() => setSelectedTest(test)}
                      className={`p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-indigo-950/20 border-l-4 border-l-indigo-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3 pr-4">
                        <div className="mt-0.5">
                          {test.status === 'passed' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                          {test.status === 'failed' && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                          {test.status === 'pending' && <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />}
                          {test.status === 'running' && <RotateCcw className="w-5 h-5 text-indigo-400 animate-spin flex-shrink-0" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{test.id}</span>
                            <span className="text-xs text-slate-400">{test.suite}</span>
                          </div>
                          <h3 className="text-sm font-medium text-slate-200 mt-1">{test.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                          <span className="text-xs text-slate-400 block">{test.duration}</span>
                          <span className="text-[10px] text-slate-500">{test.lastRun}</span>
                        </div>
                        <button
                          onClick={(e) => handleRunSingle(test.id, e)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Run single test"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Inspection Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col space-y-4 h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              Inspection Panel
            </h2>
            {selectedTest && (
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize border ${
                selectedTest.status === 'passed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                selectedTest.status === 'failed' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                selectedTest.status === 'running' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 animate-pulse' :
                'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {selectedTest.status}
              </span>
            )}
          </div>

          {selectedTest ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-mono">{selectedTest.id} • {selectedTest.suite}</span>
                <h3 className="text-base font-semibold text-white mt-1">{selectedTest.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Execution Time</span>
                  <span className="text-sm font-mono text-slate-200 mt-0.5 block">{selectedTest.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Last Verified</span>
                  <span className="text-sm text-slate-200 mt-0.5 block">{selectedTest.lastRun}</span>
                </div>
              </div>

              {selectedTest.error && (
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Failure Trace</span>
                  </div>
                  <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-3 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed">
                    {selectedTest.error}
                  </div>
                </div>
              )}

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Console Logs</span>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-400 space-y-1 max-h-48 overflow-y-auto">
                  <p className="text-slate-500">[00:00:01] Initializing browser context...</p>
                  <p className="text-slate-500">[00:00:01] Navigating to target endpoint...</p>
                  {selectedTest.status === 'failed' ? (
                    <p className="text-rose-400">[00:00:02] Assertion check failed on node element.</p>
                  ) : selectedTest.status === 'passed' ? (
                    <p className="text-emerald-400">[00:00:02] Step verified successfully with 200 OK.</p>
                  ) : (
                    <p className="text-amber-400">[00:00:02] Awaiting test execution cycle...</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Select a test case to inspect logs and error traces.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}