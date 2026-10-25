"use client";

import React from "react";
import { BookOpen, Sparkles, FolderGit2, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1b2a4a]/80 bg-[#070d18]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-[#070d18]">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Digital<span className="text-amber-400">Library</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-2.5 h-2.5" /> 4.750+ Ebook
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Perpustakaan Digital Mandiri • Koleksi Ebook & Novel
            </p>
          </div>
        </div>

        {/* Right Badges & Links */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1a35] border border-[#1b2a4a] text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Google Drive CDN Sync</span>
          </div>

          <a
            href="https://github.com/ERGUS457/digital-library"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1a35] hover:bg-[#16274e] border border-[#1b2a4a] hover:border-amber-400/40 text-xs font-medium text-slate-200 transition-all shadow-sm"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
