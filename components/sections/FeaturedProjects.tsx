"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useLocale, useT } from "@/lib/use-i18n";

export function FeaturedProjects() {
  const t = useT();
  const locale = useLocale();
  const controlClass = "static size-10 translate-x-0 translate-y-0";

  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Carousel opts={{ align: "start" }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            kicker={t.projects.kicker}
            title={t.projects.title}
            subtitle={t.projects.subtitle}
          />
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/projects`}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-primary"
            >
              {t.nav.projects}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="hidden gap-2 md:flex">
              <CarouselPrevious className={controlClass} />
              <CarouselNext className={controlClass} />
            </div>
          </div>
        </div>

        <AnimatedSection className="mt-12">
          <CarouselContent className="py-2">
            {t.projects.items.map((p) => (
              <CarouselItem key={p.title} className="basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <ProjectCard
                  title={p.title}
                  desc={p.desc}
                  categoryKey={p.category}
                  category={t.projects.categories[p.category as keyof typeof t.projects.categories]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </AnimatedSection>
      </Carousel>
    </section>
  );
}
