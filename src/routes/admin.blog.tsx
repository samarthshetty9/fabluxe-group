import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager, type ManagedRecord } from "@/components/admin/ContentManager";
import posts from "@/data/posts.json";

type Post = {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  cover: string;
  excerpt: string;
};

export const Route = createFileRoute("/admin/blog")({
  head: () => ({
    meta: [
      { title: "Blog posts — Fabluxe Admin" },
      { name: "description", content: "Create, edit and publish Fabluxe Group blog posts." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Blog posts — Fabluxe Admin" },
      { property: "og:description", content: "Create, edit and publish Fabluxe Group blog posts." },
    ],
  }),
  component: AdminBlog,
});

const records: ManagedRecord[] = (posts as Post[]).map((p, i) => ({
  id: p.id,
  title: p.title,
  meta: p.category,
  secondary: p.author,
  status: i === 0 ? "Draft" : i === 1 ? "Scheduled" : "Published",
  date: p.date,
  image: p.cover,
  body: p.excerpt,
}));

function AdminBlog() {
  return (
    <AdminShell
      title="Blog posts"
      breadcrumb={["Admin", "Content", "Blog posts"]}
      description="Eight posts across Interiors, Electronics, Sustainability and Company News."
    >
      <ContentManager
        entity="post"
        records={records}
        statuses={["Published", "Draft", "Scheduled", "Archived"]}
        labels={{ title: "Post title", meta: "Category", secondary: "Author", date: "Publish date" }}
        bodyLabel="Article body"
      />
    </AdminShell>
  );
}
