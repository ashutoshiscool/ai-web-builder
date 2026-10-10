import React, { useState } from 'react';
import { Play, Sparkles, Star, Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('featured');
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 p-8">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          CyberStream
        </h1>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stream..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 outline-none"
          />
        </div>
      </header>
      <main className="space-y-4">
        <div className="flex gap-2">
          {['featured', 'popular', 'trending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={"px-4 py-1.5 rounded-md text-xs font-semibold uppercase " + (activeTab === tab ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400")}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <h2 className="font-semibold text-sm mb-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Featured Release
            </h2>
            <p className="text-xs text-slate-400 mb-3">Next-gen cybernetic entertainment module.</p>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg">
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Trailer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}