import heroInterior from "@/assets/hero-interior.jpg";
import companyHomeSolutions from "@/assets/company-home-solutions.jpg";
import companyInteriors from "@/assets/company-interiors.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import sustainability from "@/assets/sustainability.jpg";
import csr from "@/assets/csr.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";
import project9 from "@/assets/project-9.jpg";
import project10 from "@/assets/project-10.jpg";
import showroom1 from "@/assets/showroom-1.jpg";
import sustain1 from "@/assets/sustain-1.jpg";
import sustain2 from "@/assets/sustain-2.jpg";
import sustain3 from "@/assets/sustain-3.jpg";
import sustain4 from "@/assets/sustain-4.jpg";
import csr1 from "@/assets/csr-1.jpg";
import csr2 from "@/assets/csr-2.jpg";
import csr3 from "@/assets/csr-3.jpg";
import csr4 from "@/assets/csr-4.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";
import blog7 from "@/assets/blog-7.jpg";
import blog8 from "@/assets/blog-8.jpg";
import personPreet from "@/assets/person-preet.jpg";
import personRaghu from "@/assets/person-raghu.jpg";
import personLeader1 from "@/assets/person-leader-1.jpg";
import personLeader2 from "@/assets/person-leader-2.jpg";
import personLeader3 from "@/assets/person-leader-3.jpg";
import personLeader4 from "@/assets/person-leader-4.jpg";

/** Mock media map — the back end will replace these with CMS URLs. */
export const images = {
  "hero-interior": heroInterior,
  "home-solutions": companyHomeSolutions,
  interiors: companyInteriors,
  "project-1": project1,
  "project-2": project2,
  "project-3": project3,
  "project-4": project4,
  "project-5": project5,
  "project-6": project6,
  "project-7": project7,
  "project-8": project8,
  "project-9": project9,
  "project-10": project10,
  "showroom-1": showroom1,
  sustainability,
  csr,
  "sustain-1": sustain1,
  "sustain-2": sustain2,
  "sustain-3": sustain3,
  "sustain-4": sustain4,
  "csr-1": csr1,
  "csr-2": csr2,
  "csr-3": csr3,
  "csr-4": csr4,
  "blog-1": blog1,
  "blog-2": blog2,
  "blog-3": blog3,
  "blog-4": blog4,
  "blog-5": blog5,
  "blog-6": blog6,
  "blog-7": blog7,
  "blog-8": blog8,
  "person-preet": personPreet,
  "person-raghu": personRaghu,
  "person-leader-1": personLeader1,
  "person-leader-2": personLeader2,
  "person-leader-3": personLeader3,
  "person-leader-4": personLeader4,
} as const;

export type ImageKey = keyof typeof images;

export function getImage(key: string): string {
  return images[key as ImageKey] ?? images["hero-interior"];
}

export function hasImage(key?: string): boolean {
  return Boolean(key && key in images);
}
