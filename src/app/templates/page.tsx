"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, Search, ArrowRight, CheckCircle2, LayoutTemplate, 
  Sparkles, Layers, Tag, ExternalLink, Code2
} from "lucide-react";
import { TEMPLATES } from "@/lib/templates/template-registry";

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLaunching, setIsLaunching] = useState<string | null>(null);

  const categories = ["All", "SaaS", "AI", "E-Commerce", "Portfolio", "Productivity", "Landing"];

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === "All" || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLaunchTemplate = async (templateId: string) => {
    setIsLaunching(templateId);
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const data = await res.json();
      if (data.project) {
        router.push(`/workspace/${data.project.id}`);
      }
    } catch (e: any) {
      alert("Error launching template: " + e.message);
    } finally {
      setIsLaunching(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-white/[0.06] bg-[#08090d]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">
            NOVAFORGE
          </span>
          <span className="text-xs text-slate-500">/ Templates</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/workspace" className="text-indigo-400 hover:text-indigo-300 font-semibold">
            Open Workspace →
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="py-12 md:py-16 px-6 max-w-6xl mx-auto w-full text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Production-Ready Architectural Starters</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Template &amp; Starter Gallery
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Every template is a complete, runnable web application with real TypeScript components, Tailwind CSS styling, and live previews.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-6 max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by keyword, tag, or technology (e.g. Stripe, PostgreSQL, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121624] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold"
                    : "bg-[#121624] border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-[#0d0f17] border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl p-6 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {Object.keys(tpl.files).length} files
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{tpl.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>

                {/* Features */}
                <div className="space-y-1.5 pt-2">
                  {tpl.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {tpl.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-[#151926] text-slate-400 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleLaunchTemplate(tpl.id)}
                disabled={isLaunching === tpl.id}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>{isLaunching === tpl.id ? "Launching Studio..." : "Launch in Workspace"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
