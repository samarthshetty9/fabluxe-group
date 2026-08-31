import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilterBar } from "@/components/blog/BlogFilterBar";
import type { Post } from "@/components/blog/types";
import postsData from "@/data/posts.json";

const title = "Blog — Fabluxe Group";
const description =
  "Notes from the Fabluxe Group teams on interiors, home electronics, sustainability and company news.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndexPage,
});

const posts = [...(postsData as Post[])].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
const categories = ["All", ...new Set(posts.map((post) => post.category))];

function BlogIndexPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    for (const post of posts) {
      map[post.category] = (map[post.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        needle.length === 0 ||
        [post.title, post.excerpt, post.author, post.category]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from our design, service and site teams."
        intro="Working method rather than marketing: what we specify, what it costs, and what we would do differently next time."
      />

      <Section tone="beige">
        <BlogFilterBar
          categories={categories}
          active={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
          counts={counts}
        />

        <p aria-live="polite" className="mt-6 text-eyebrow font-semibold uppercase text-teal">
          Showing {visible.length} of {posts.length} articles
        </p>

        {visible.length === 0 ? (
          <p className="mt-14 max-w-xl font-display text-2xl text-navy">
            Nothing matches that search yet. Try a different word, or clear the filter.
          </p>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i * 60, 240)} className="h-full">
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
