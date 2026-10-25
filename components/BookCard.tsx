"use client";

import React from "react";
import { BookOpen, ExternalLink, User, HardDrive, Sparkles } from "lucide-react";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
}

export default function BookCard({ book, onRead }: BookCardProps) {
  const isTereLiye = book.category === "Serial Tere Liye";

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl bg-[#0a142a] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 ${
        isTereLiye
          ? "border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-b from-[#0e1c3a] to-[#0a142a]"
          : "border-[#192847] hover:border-amber-400/50"
      }`}
    >
      {/* Decorative Gold Header Line */}
      <div
        className={`h-1 w-full rounded-t-xl transition-all duration-300 ${
          isTereLiye
            ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
            : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-amber-400"
        }`}
      />

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border ${
              isTereLiye
                ? "bg-amber-400/15 text-amber-300 border-amber-400/40"
                : "bg-[#132347] text-blue-300 border-[#203666]"
            }`}
          >
            {isTereLiye && <Sparkles className="w-2.5 h-2.5 text-amber-400" />}
            {book.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <HardDrive className="w-3 h-3 text-slate-500" />
            {book.sizeText}
          </span>
        </div>

        {/* Book Title */}
        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 leading-snug">
          {book.title}
        </h4>

        {/* Author */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-auto pt-2">
          <User className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
          <span className="truncate">{book.author}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => onRead(book)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#070d18] font-bold text-xs transition-colors shadow-sm shadow-amber-400/20"
        >
          <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Baca</span>
        </button>

        <a
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#111e3b] hover:bg-[#1a2d59] border border-[#1e2f57] hover:border-slate-500 text-slate-300 text-xs font-medium transition-colors"
          title="Buka langsung di Google Drive"
        >
          <ExternalLink className="w-3 h-3 text-slate-400" />
          <span>Drive</span>
        </a>
      </div>
    </div>
  );
}
