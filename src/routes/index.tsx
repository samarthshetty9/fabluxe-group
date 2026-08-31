import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CompaniesSection } from "@/components/home/CompaniesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { AwardsSection } from "@/components/home/AwardsSection";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { CsrSection } from "@/components/home/CsrSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { EnquiryBand } from "@/components/home/EnquiryBand";

const title = "Fabluxe Group — Interiors and home technology, India";
const description =
  "Fabluxe is an Indian group of two companies: Fabluxora Interiors for design and turnkey fit-out, and Fabluxe Home Solutions for consumer electronics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CompaniesSection />
      <ProjectsSection />
      <AwardsSection />
      <SustainabilitySection />
      <CsrSection />
      <ReviewsSection />
      <BlogSection />
      <EnquiryBand />
    </>
  );
}
