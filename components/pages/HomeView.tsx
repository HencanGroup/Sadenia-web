"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { RoadmapPreview } from "@/components/sections/RoadmapPreview";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { useT } from "@/lib/use-i18n";
import { serviceIcons } from "@/lib/service-icons";

export function HomeView() {
  const t = useT();

  return (
    <>
      <Hero />
      <Stats />
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={t.services.kicker}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.slice(0, 6).map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.06} className="h-full">
                <ServiceCard
                  icon={serviceIcons[i]!}
                  title={s.title}
                  desc={s.desc}
                  href="solutions"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <WhyUs />
      <FeaturedProjects />
      <RoadmapPreview />
      {/* <Testimonials /> */}
      <CtaBanner />
    </>
  );
}
