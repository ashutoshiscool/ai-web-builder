import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Star, Search, Radio, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('featured');
  const [search, setSearch] = useState('');
  const [viewerCount, setViewerCount] = useState(14280);

  // Simulate slight live viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 21) - 10);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 p-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-5 mb-6">
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
          <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-400 tracking-wider">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            CyberStream
          </h1>

          {/* Live Cyber Status Indicator Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-xs font-medium text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase font-semibold text-[10px]">LIVE</span>
            <div className="h-3 w-[1px] bg-emerald-500/30 mx-0.5" />
            <div className="flex items-center gap-1 text-emerald-200">
              <Users className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">{viewerCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-sm w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stream..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 outline-none w-full sm:w-48"
          />
        </div>
      </header>

      <main className="space-y-4">
        <div className="flex gap-2">
          {['featured', 'popular', 'trending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={"px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all " + (activeTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800")}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900/80 backdrop-blur border border-slate-800/80 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all pointer-events-none" />
            <h2 className="font-semibold text-sm mb-1 flex items-center gap-1.5 text-slate-100">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Featured Release
            </h2>
            <p className="text-xs text-slate-400 mb-4">Next-gen cybernetic entertainment module stream active.</p>
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors shadow-md shadow-indigo-500/20">
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Trailer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}