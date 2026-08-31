import { Link } from "@tanstack/react-router";

import { getImage } from "@/lib/images";
import { CategoryChip } from "./CategoryChip";
import type { Post } from "./types";

/** Listing card: cover, category, title, excerpt, author, date, read time. */
export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col bg-surface">
      <Link
        to="/blog/$postId"
        params={{ postId: post.id }}
        className="block overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={getImage(post.cover)}
          alt=""
          loading="lazy"
          width={1440}
          height={1080}
          className="media-zoom aspect-4/3 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <CategoryChip category={post.category} className="self-start" />
        <h3 className="font-display text-2xl text-navy">
          <Link
            to="/blog/$postId"
            params={{ postId: post.id }}
            className="transition-colors duration-300 hover:text-teal"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        <footer className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4 text-eyebrow font-semibold uppercase text-teal">
          <span className="text-navy">{post.author}</span>
          <time dateTime={post.isoDate}>{post.date}</time>
          <span>· {post.readTime}</span>
        </footer>
      </div>
    </article>
  );
}
