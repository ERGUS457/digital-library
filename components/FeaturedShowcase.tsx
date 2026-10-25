"use client";

import React from "react";
import { Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { Book } from "@/types/book";

interface FeaturedShowcaseProps {
  books: Book[];
  onRead: (book: Book) => void;
  onFilterTereLiye: () => void;
}

export default function FeaturedShowcase({
  books,
  onRead,
  onFilterTereLiye,
}: FeaturedShowcaseProps) {
  const tereLiyeBooks = books.filter((b) => b.category === "Serial Tere Liye").slice(0, 6);

  if (tereLiyeBooks.length === 0) return null;

  return (
    <section className="relative rounded-2xl bg-gradient-to-br from-[#0c1836] via-[#091329] to-[#070d18] border border-amber-400/30 p-5 sm:p-7 shadow-xl shadow-amber-500/5 mb-10 overflow-hidden">
      {/* Decorative Gold Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/40 mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Koleksi Spesial Rekomendasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Serial Lengkap <span className="text-amber-400">Tere Liye</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Petualangan legendaris klan Dunia Paralel (Bumi, Bulan, Matahari, Sagaras) & novel best-seller.
          </p>
        </div>

        <button
          onClick={onFilterTereLiye}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 hover:underline transition-colors self-start sm:self-auto"
        >
          <span>Lihat Semua 23 Seri</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Highlighted Books */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {tereLiyeBooks.map((book) => (
          <div
            key={book.id}
            className="flex flex-col justify-between p-3 rounded-2xl bg-[#0e1b38]/90 border border-amber-400/30 hover:border-amber-400/80 hover:bg-[#14264e] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
          >
            <div>
              {/* Cover Thumbnail */}
              <div
                onClick={() => onRead(book)}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#081226] border border-[#1b2f57] mb-2.5 cursor-pointer shadow-md group-hover:border-amber-400/50 transition-colors"
              >
                <img
                  src={`https://lh3.googleusercontent.com/d/${book.id}=w400`}
                  alt={book.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a142a]/80 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
              </div>

              <div className="h-0.5 w-6 rounded-full bg-amber-400 mb-2 group-hover:w-full transition-all duration-300" />
              <h4
                onClick={() => onRead(book)}
                className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors cursor-pointer"
                title={book.title}
              >
                {book.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">Tere Liye</p>
            </div>

            <button
              onClick={() => onRead(book)}
              className="mt-3 w-full py-1.5 px-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#070d18] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-amber-400/20"
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Baca</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
