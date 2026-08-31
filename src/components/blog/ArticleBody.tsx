import { getImage } from "@/lib/images";
import type { ArticleBlock } from "./types";

/** Renders the mock long-form body: headings, paragraphs, pull quotes and images. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="font-display text-3xl text-navy">
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-2 border-gold py-2 pl-6 font-display text-2xl leading-snug text-teal"
            >
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={index} className="flex flex-col gap-3">
              <img
                src={getImage(block.src)}
                alt={block.caption ?? ""}
                loading="lazy"
                width={1440}
                height={1080}
                className="aspect-4/3 w-full object-cover"
              />
              {block.caption ? (
                <figcaption className="text-sm text-muted-foreground">{block.caption}</figcaption>
              ) : null}
            </figure>
          );
        }
        return (
          <p key={index} className="text-lg leading-relaxed text-foreground">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
