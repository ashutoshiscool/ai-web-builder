import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVAFORGE — Autonomous AI Website & Application Builder",
  description:
    "Build production-grade web applications in seconds with an autonomous AI coding agent. Complete with live sandboxed preview, Monaco editor, full-stack tools, and instant deployments.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body 
        suppressHydrationWarning 
        className="min-h-full bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
