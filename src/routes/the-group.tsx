import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { GroupIntro } from "@/components/group/GroupIntro";
import { HistoryTimeline } from "@/components/group/HistoryTimeline";
import { ValuesSection } from "@/components/group/ValuesSection";
import { StructureDiagram } from "@/components/group/StructureDiagram";

const title = "The Group — Fabluxe history, values and structure";
const description =
  "How Fabluxe is put together: a short history from 2009, the values both companies work to, and the group structure behind Fabluxora Interiors and Fabluxe Home Solutions.";

export const Route = createFileRoute("/the-group")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TheGroupPage,
});

function TheGroupPage() {
  return (
    <>
      <PageHero
        eyebrow="The Group"
        title="A group built one finished room at a time."
        intro="Fabluxe has grown from a four-person fit-out crew into two companies working across eleven Indian cities — without changing how it measures a job."
      />
      <GroupIntro />
      <HistoryTimeline />
      <ValuesSection />
      <StructureDiagram />
    </>
  );
}
