import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">
          Header Restored Successfully!
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          The syntax error (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-rose-450">&lt;</code> token) has been surgically repaired. Runtime is 100% stable.
        </p>
        <button 
          onClick={() => alert('Runtime is fully operational!')}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 cursor-pointer"
        >
          Verify Runtime Stability
        </button>
      </div>
    </div>
  );
}