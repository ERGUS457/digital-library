"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  Brain,
  Library,
  Compass,
  ArrowUpDown,
} from "lucide-react";
import { Book, CategoryStat } from "@/types/book";
import Navbar from "./Navbar";
import BookCard from "./BookCard";
import ReaderModal from "./ReaderModal";
import FeaturedShowcase from "./FeaturedShowcase";

interface LibraryClientProps {
  initialBooks: Book[];
  categories: CategoryStat[];
  totalCount: number;
}

const ITEMS_PER_PAGE = 24;

export default function LibraryClient({
  initialBooks,
  categories,
  totalCount,
}: LibraryClientProps) {
  const [allBooks, setAllBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<"featured" | "az" | "za" | "size-desc" | "size-asc">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [isLoadingFull, setIsLoadingFull] = useState(true);

  // Fetch full dataset asynchronously in background
  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => {
        setAllBooks(data);
        setIsLoadingFull(false);
      })
      .catch((err) => {
        console.error("Gagal memuat dataset buku:", err);
        setIsLoadingFull(false);
      });
  }, []);

  // Filter & Sort
  const filteredBooks = useMemo(() => {
    let result = allBooks;

    if (selectedCategory !== "Semua") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      if (sortBy === "size-desc") return b.size - a.size;
      if (sortBy === "size-asc") return a.size - b.size;
      return 0;
    });
  }, [allBooks, selectedCategory, searchQuery, sortBy]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  const handleRead = (book: Book) => {
    setActiveBook(book);
  };

  const handleFilterTereLiye = () => {
    setSelectedCategory("Serial Tere Liye");
    setSearchQuery("");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto pt-4 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-4">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Koleksi Terbuka & Gratis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Perpustakaan Digital <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Ribuan Ebook & Novel
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Jelajahi lebih dari <strong className="text-white font-bold">{totalCount.toLocaleString("id-ID")}</strong> koleksi buku digital, materi teknologi, bisnis, sains, dan serial lengkap novel Tere Liye langsung dari perambanmu.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-amber-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul buku, nama penulis (e.g. Tere Liye, Ryan Filbert, dsb)..."
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-[#0c1836] border-2 border-[#1e2f57] focus:border-amber-400 text-white placeholder-slate-400 text-sm sm:text-base outline-none transition-all shadow-xl shadow-black/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Meta */}
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-2">
              <span>
                Menampilkan <strong className="text-amber-300 font-semibold">{filteredBooks.length.toLocaleString("id-ID")}</strong> buku
              </span>
              {isLoadingFull && (
                <span className="text-[11px] text-amber-400/80 animate-pulse">
                  Sinkronisasi seluruh 4.750+ buku...
                </span>
              )}
            </div>
          </div>
        </section>

        {/* FEATURED SERIAL TERE LIYE SHOWCASE (Only on all books or when no search) */}
        {selectedCategory === "Semua" && searchQuery === "" && (
          <FeaturedShowcase
            books={allBooks}
            onRead={handleRead}
            onFilterTereLiye={handleFilterTereLiye}
          />
        )}

        {/* FILTER & SORT CONTROLS */}
        <section className="mb-8 space-y-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            <button
              onClick={() => setSelectedCategory("Semua")}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === "Semua"
                  ? "bg-amber-400 text-[#070d18] shadow-md shadow-amber-400/20"
                  : "bg-[#0b152d] text-slate-300 border border-[#192847] hover:border-amber-400/40 hover:text-white"
              }`}
            >
              Semua ({totalCount})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.name
                    ? "bg-amber-400 text-[#070d18] shadow-md shadow-amber-400/20"
                    : "bg-[#0b152d] text-slate-300 border border-[#192847] hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Sort & Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#192847]/60">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Kategori: <strong className="text-white">{selectedCategory}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label htmlFor="sort-select" className="text-xs text-slate-400 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-amber-400" /> Urutkan:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0b152d] border border-[#192847] text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-amber-400"
              >
                <option value="featured">Rekomendasi / Unggulan</option>
                <option value="az">Judul (A - Z)</option>
                <option value="za">Judul (Z - A)</option>
                <option value="size-desc">Ukuran File (Terbesar)</option>
                <option value="size-asc">Ukuran File (Terkecil)</option>
              </select>
            </div>
          </div>
        </section>

        {/* BOOK GRID */}
        {paginatedBooks.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {paginatedBooks.map((book) => (
              <BookCard key={book.id} book={book} onRead={handleRead} />
            ))}
          </section>
        ) : (
          <div className="text-center py-20 px-4 rounded-2xl bg-[#091329] border border-[#192847]">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-white">Tidak Ada Buku Ditemukan</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Coba kata kunci pencarian lain atau pilih kategori yang berbeda.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-400 text-[#070d18] font-bold text-xs hover:bg-amber-300 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <section className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#192847] pt-6">
            <div className="text-xs text-slate-400">
              Halaman <strong className="text-white">{currentPage}</strong> dari{" "}
              <strong className="text-white">{totalPages}</strong> ({filteredBooks.length.toLocaleString("id-ID")} buku)
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-[#0b152d] border border-[#192847] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-400 hover:text-white transition-colors"
                aria-label="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Number buttons window */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage - 2 + i;
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                if (pageNum < 1 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? "bg-amber-400 text-[#070d18] shadow-sm shadow-amber-400/30"
                        : "bg-[#0b152d] border border-[#192847] text-slate-300 hover:border-amber-400/50 hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-[#0b152d] border border-[#192847] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-400 hover:text-white transition-colors"
                aria-label="Halaman Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-[#192847] bg-[#050a14] py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">Digital<span className="text-amber-400">Library</span></span>
            <span>• Koleksi Mandiri 4.750+ Ebook & Novel</span>
          </div>
          <p className="text-slate-400">
            Dikelola oleh <strong className="text-white">Ergus</strong> • Ditenagai oleh Next.js, Google Drive & Vercel
          </p>
        </div>
      </footer>

      {/* IN-APP READER MODAL */}
      <ReaderModal book={activeBook} onClose={() => setActiveBook(null)} />
    </div>
  );
}
