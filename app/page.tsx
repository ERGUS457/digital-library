import fs from "fs";
import path from "path";
import LibraryClient from "@/components/LibraryClient";
import { Book, CategoryStat } from "@/types/book";

export default function Home() {
  const filePath = path.join(process.cwd(), "data", "books.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const allBooks: Book[] = JSON.parse(rawData);

  // Compute category statistics
  const catMap: Record<string, number> = {};
  allBooks.forEach((b) => {
    catMap[b.category] = (catMap[b.category] || 0) + 1;
  });

  const categoryOrder = [
    "Serial Tere Liye",
    "Teknologi & IT",
    "Bisnis & Finansial",
    "Pengembangan Diri",
    "Novel & Sastra",
    "Agama & Spiritual",
    "Sosial & Budaya",
    "Pengetahuan Umum",
  ];

  const categories: CategoryStat[] = categoryOrder.map((name) => ({
    name,
    count: catMap[name] || 0,
  }));

  // Initial 24 books for immediate server render
  const initialBooks = allBooks.slice(0, 24);

  return (
    <LibraryClient
      initialBooks={initialBooks}
      categories={categories}
      totalCount={allBooks.length}
    />
  );
}
