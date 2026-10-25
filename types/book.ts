export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  size: number;
  sizeText: string;
  featured?: boolean;
  link: string;
}

export interface CategoryStat {
  name: string;
  count: number;
}
