import React, { useState } from 'react';
import { Sparkles, ArrowRight, Code2 } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome to Tool Test App</h1>
        <p className="text-slate-400 text-sm mb-6">
          Describe what you want to build in the AI Agent panel.
        </p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-white font-medium text-sm rounded-lg shadow-lg shadow-indigo-500/20"
        >
          <span>Interactions: {count}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}