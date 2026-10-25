"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, BookOpen, Layers } from "lucide-react";
import { Book } from "@/types/book";

interface ReaderModalProps {
  book: Book | null;
  onClose: () => void;
}

export default function ReaderModal({ book, onClose }: ReaderModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (book) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-[#091224] border border-[#1e2f57] shadow-2xl shadow-black/80 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#1b2a4a] bg-[#0c1730]">
          <div className="flex items-center gap-3 overflow-hidden pr-4">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-sm sm:text-base text-white truncate">
                {book.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{book.author}</span>
                <span>•</span>
                <span className="text-amber-400/90 font-medium">{book.category}</span>
                <span>•</span>
                <span className="text-slate-500">{book.sizeText}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16274e] hover:bg-[#1d3366] text-xs font-medium text-amber-300 border border-amber-400/30 transition-colors"
              title="Buka langsung di Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buka di Drive</span>
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#16274e] hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Viewer Body */}
        <div className="relative flex-1 w-full bg-[#050913] p-1 sm:p-2">
          <iframe
            src={`https://drive.google.com/file/d/${book.id}/preview`}
            title={book.title}
            className="w-full h-full rounded-xl border border-[#1b2a4a]/40 bg-[#070c17]"
            allow="autoplay"
          />
        </div>

        {/* Footer info note */}
        <div className="px-4 py-2 bg-[#091224] border-t border-[#1b2a4a] text-center text-[11px] text-slate-400 flex items-center justify-between">
          <span className="hidden sm:inline">
            Menampilkan pratinjau dokumen dari Google Drive secara aman.
          </span>
          <span className="text-amber-400/80 mx-auto sm:mx-0">
            Tekan ESC untuk menutup
          </span>
        </div>
      </div>
    </div>
  );
}
