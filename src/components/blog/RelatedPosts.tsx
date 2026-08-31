import { BlogCard } from "./BlogCard";
import type { Post } from "./types";

/** Row of related reading shown under an article. */
export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
