import { createFileRoute, notFound } from "@tanstack/react-router";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { ActionLink } from "@/components/primitives/ActionLink";
import { CategoryChip } from "@/components/blog/CategoryChip";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import type { Post } from "@/components/blog/types";
import { getImage } from "@/lib/images";
import postsData from "@/data/posts.json";

const posts = postsData as Post[];

export const Route = createFileRoute("/blog/$postId")({
  loader: ({ params }) => {
    const post = posts.find((item) => item.id === params.postId);
    if (!post) throw notFound();
    const related = post.related
      .map((id) => posts.find((item) => item.id === id))
      .filter((item): item is Post => Boolean(item));
    return { post, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — Fabluxe Group" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} — Fabluxe Group`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <Section tone="beige" size="large">
      <div className="flex flex-col items-start gap-6 pt-20">
        <EyebrowLabel>Blog</EyebrowLabel>
        <h1 className="font-display text-display-sm text-navy">We can't find that article.</h1>
        <p className="max-w-xl text-muted-foreground">
          It may have been renamed. The full list of articles is still available.
        </p>
        <ActionLink href="/blog">Back to the blog</ActionLink>
      </div>
    </Section>
  );
}

function ArticlePage() {
  const { post, related } = Route.useLoaderData();

  return (
    <>
      <section className="bg-navy text-on-dark">
        <div className="shell flex flex-col gap-6 pb-16 pt-40">
          <Reveal>
            <CategoryChip category={post.category} tone="light" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-4xl font-display text-display-md text-on-dark">{post.title}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-2xl text-on-dark-muted">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={220}>
            <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-on-dark-muted/25 pt-6 text-eyebrow font-semibold uppercase">
              <div className="flex flex-col gap-1">
                <dt className="text-on-dark-muted">Author</dt>
                <dd className="text-gold">{post.author}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-on-dark-muted">Published</dt>
                <dd className="text-gold">
                  <time dateTime={post.isoDate}>{post.date}</time>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-on-dark-muted">Length</dt>
                <dd className="text-gold">{post.readTime}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="bg-navy">
        <div className="shell">
          <img
            src={getImage(post.cover)}
            alt={post.title}
            width={1440}
            height={1080}
            className="aspect-16/9 w-full object-cover"
          />
        </div>
      </div>

      <Section tone="beige">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-2">
            <ArticleBody blocks={post.body} />
            <div className="mt-14">
              <AuthorBox post={post} />
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="white">
          <Reveal>
            <div className="flex flex-col gap-3 border-b border-border pb-6">
              <EyebrowLabel>Related posts</EyebrowLabel>
              <h2 className="font-display text-display-sm text-navy">Keep reading</h2>
            </div>
          </Reveal>
          <div className="mt-10">
            <RelatedPosts posts={related} />
          </div>
        </Section>
      ) : null}
    </>
  );
}
