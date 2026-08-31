import type { Post } from "./types";

/** Author credit block shown at the foot of an article. */
export function AuthorBox({ post }: { post: Post }) {
  const initials = post.author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <aside className="flex flex-col gap-5 bg-sky p-8 sm:flex-row sm:items-start">
      <span
        aria-hidden="true"
        className="flex size-16 shrink-0 items-center justify-center bg-navy font-display text-xl text-on-dark"
      >
        {initials}
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-eyebrow font-semibold uppercase text-teal">Written by</p>
        <p className="font-display text-2xl text-navy">{post.author}</p>
        <p className="text-sm font-semibold text-teal">{post.authorRole}</p>
        <p className="text-sm text-muted-foreground">{post.authorBio}</p>
      </div>
    </aside>
  );
}
