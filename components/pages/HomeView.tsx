"use client";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { RoadmapPreview } from "@/components/sections/RoadmapPreview";
import { SolutionsBento } from "@/components/sections/SolutionsBento";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";

export function HomeView() {
  return (
    <>
      <Hero />
      <SolutionsBento />
      <WhyUs />
      <FeaturedProjects />
      <RoadmapPreview />
      {/* <Testimonials /> */}
      <CtaBanner />
    </>
  );
}
