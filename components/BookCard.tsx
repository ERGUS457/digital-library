"use client";

import React, { useState } from "react";
import { BookOpen, ExternalLink, User, HardDrive, Sparkles, Book as BookIcon } from "lucide-react";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
}

export default function BookCard({ book, onRead }: BookCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isTereLiye = book.category === "Serial Tere Liye";

  // Google Drive CDN cover thumbnail
  const coverUrl = `https://lh3.googleusercontent.com/d/${book.id}=w400`;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#0a142a] border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden ${
        isTereLiye
          ? "border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-b from-[#0f1d3b] to-[#0a142a]"
          : "border-[#192847] hover:border-amber-400/60"
      }`}
    >
      {/* Top Accent Line */}
      <div
        className={`h-1 w-full transition-all duration-300 ${
          isTereLiye
            ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
            : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-amber-400 group-hover:to-amber-500"
        }`}
      />

      <div className="p-3.5 sm:p-4 flex-1 flex flex-col">
        {/* Book Cover Image Container */}
        <div
          onClick={() => onRead(book)}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#070e1c] border border-[#162544] mb-3.5 cursor-pointer shadow-inner group/cover"
        >
          {/* Skeleton Shimmer while loading */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1836] via-[#11234d] to-[#081229] animate-pulse flex flex-col items-center justify-center p-4 text-center">
              <BookIcon className="w-8 h-8 text-amber-400/30 mb-2" />
              <span className="text-[10px] text-slate-500 font-mono">Memuat Cover...</span>
            </div>
          )}

          {/* Actual Google Drive PDF Thumbnail */}
          {!imgError ? (
            <img
              src={coverUrl}
              alt={book.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-top transition-all duration-500 group-hover/cover:scale-105 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            /* Elegant Fallback Hardcover Mockup */
            <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#0f2147] via-[#0b1836] to-[#060e22] border-l-4 border-amber-400">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400/80">EBOOK</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="my-auto text-left">
                <h5 className="font-bold text-xs sm:text-sm text-white line-clamp-3 leading-snug">
                  {book.title}
                </h5>
                <p className="text-[11px] text-amber-300/80 mt-1 line-clamp-1">{book.author}</p>
              </div>
              <div className="text-[10px] text-slate-400 font-mono border-t border-[#1a2f5a] pt-1">
                {book.sizeText}
              </div>
            </div>
          )}

          {/* Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a142a]/80 via-transparent to-transparent opacity-40 group-hover/cover:opacity-20 transition-opacity pointer-events-none" />

          {/* Quick Hover Overlay: Baca */}
          <div className="absolute inset-0 bg-[#070d18]/60 backdrop-blur-[2px] opacity-0 group-hover/cover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-2 p-3">
            <button className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#070d18] font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/30 transform translate-y-2 group-hover/cover:translate-y-0 transition-transform">
              <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Baca Sekarang</span>
            </button>
            <span className="text-[10px] text-slate-300">Pratinjau PDF Instan</span>
          </div>
        </div>

        {/* Category & Size */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide border truncate max-w-[70%] ${
              isTereLiye
                ? "bg-amber-400/15 text-amber-300 border-amber-400/40"
                : "bg-[#132347] text-blue-300 border-[#203666]"
            }`}
          >
            {isTereLiye && <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />}
            <span className="truncate">{book.category}</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-mono shrink-0">
            <HardDrive className="w-2.5 h-2.5 text-slate-500" />
            {book.sizeText}
          </span>
        </div>

        {/* Book Title */}
        <h4
          onClick={() => onRead(book)}
          className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug cursor-pointer mb-1.5"
          title={book.title}
        >
          {book.title}
        </h4>

        {/* Author */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-auto pt-1">
          <User className="w-3 h-3 text-amber-400/70 shrink-0" />
          <span className="truncate text-[11px]">{book.author}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3.5 pt-0 sm:p-4 sm:pt-0 grid grid-cols-2 gap-2 mt-1">
        <button
          onClick={() => onRead(book)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#070d18] font-bold text-xs transition-colors shadow-sm shadow-amber-400/20"
        >
          <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Baca</span>
        </button>

        <a
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#111e3b] hover:bg-[#1a2d59] border border-[#1e2f57] hover:border-slate-500 text-slate-300 text-xs font-medium transition-colors"
          title="Buka langsung di Google Drive"
        >
          <ExternalLink className="w-3 h-3 text-slate-400" />
          <span>Drive</span>
        </a>
      </div>
    </div>
  );
}
