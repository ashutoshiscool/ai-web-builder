"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Check, ArrowRight, ShieldCheck, CreditCard, Sparkles } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [showCheckoutModal, setShowCheckoutModal] = useState<string | null>(null);

  const tiers = [
    {
      id: "free",
      name: "Starter",
      price: "$0",
      description: "For independent hobbyists and exploratory projects.",
      features: [
        "Up to 3 active projects",
        "100 AI generation steps / month",
        "Gemini 3.8 Flash model access",
        "Live sandboxed previews",
        "Export source code as ZIP",
        "Community Discord support",
      ],
      popular: false,
      cta: "Get Started Free",
    },
    {
      id: "pro",
      name: "Professional",
      price: billingCycle === "annual" ? "$24" : "$29",
      description: "For serious builders and full-stack software engineers.",
      features: [
        "Unlimited active projects",
        "1,500 AI generation steps / month",
        "All models: Claude 3.7 Sonnet, DeepSeek R1, GPT-6",
        "Custom domain edge deployments (Vercel/Netlify)",
        "Direct GitHub sync & branch commits",
        "Automated self-healing diagnostics",
        "Priority queue & low-latency execution",
      ],
      popular: true,
      cta: "Upgrade to Pro",
    },
    {
      id: "team",
      name: "Team & Enterprise",
      price: billingCycle === "annual" ? "$79" : "$99",
      description: "For collaborative engineering teams & startups.",
      features: [
        "Everything in Professional",
        "Unlimited AI generations with Bring-Your-Own-Key",
        "Shared team workspaces & role permissions",
        "Dedicated isolated container runtimes",
        "SOC2 compliance & audit logs",
        "Dedicated Solution Architect & 99.99% SLA",
      ],
      popular: false,
      cta: "Start Team Trial",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      <nav className="border-b border-white/[0.06] bg-[#08090d]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">
            NOVAFORGE
          </span>
          <span className="text-xs text-slate-500">/ Pricing</span>
        </Link>

        <Link href="/workspace" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
          Open Workspace →
        </Link>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Honest &amp; Transparent Plans</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Predictable pricing for creators
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Build applications at the speed of thought. Scale smoothly as your product grows.
          </p>

          {/* Monthly / Annual toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-[#121624] border border-slate-800 rounded-xl text-xs font-medium">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingCycle === "monthly" ? "bg-indigo-600 text-white font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingCycle === "annual" ? "bg-indigo-600 text-white font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              Annual (20% Off)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${
                tier.popular
                  ? "bg-[#0e111a] border-indigo-500/60 shadow-2xl shadow-indigo-500/10"
                  : "bg-[#0d0f17] border-white/[0.08]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">{tier.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <div className="space-y-3 border-t border-slate-800/80 pt-6 mb-8">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (tier.id === "free") {
                    window.location.href = "/workspace";
                  } else {
                    setShowCheckoutModal(tier.name);
                  }
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  tier.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                    : "bg-[#161a29] hover:bg-slate-800 text-slate-200"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Stripe Checkout Simulation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e111a] border border-[#1e2436] rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Subscribe to {showCheckoutModal}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Development Mode:</strong> In production, this hooks directly into your configured Stripe Billing Customer Portal with webhook listeners.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCheckoutModal(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Stripe subscription simulated successfully!");
                  setShowCheckoutModal(null);
                }}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-md"
              >
                Confirm ($0 Dev Mode)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
