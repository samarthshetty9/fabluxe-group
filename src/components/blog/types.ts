export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; caption?: string };

export type Post = {
  id: string;
  title: string;
  category: string;
  cover: string;
  author: string;
  authorRole: string;
  authorBio: string;
  date: string;
  isoDate: string;
  readTime: string;
  excerpt: string;
  body: ArticleBlock[];
  related: string[];
};
