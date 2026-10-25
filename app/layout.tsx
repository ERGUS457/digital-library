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
  title: "Digital Library — Koleksi 4.750+ Ebook & Novel Lengkap",
  description:
    "Perpustakaan digital modern dengan 4.750+ koleksi lengkap ebook bisnis, teknologi, pengembangan diri, dan novel serial Tere Liye. Akses gratis dan baca langsung.",
  keywords: [
    "Digital Library",
    "Perpustakaan Digital",
    "Ebook Indonesia",
    "Novel Tere Liye Lengkap",
    "Buku Bisnis",
    "Buku Teknologi",
  ],
  authors: [{ name: "Ergus" }],
  openGraph: {
    title: "Digital Library — 4.750+ Koleksi Ebook & Novel",
    description:
      "Akses dan baca ribuan buku digital, teknologi, bisnis, dan novel serial lengkap karya Tere Liye.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#070d18] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
