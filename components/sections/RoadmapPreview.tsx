"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale, useT } from "@/lib/use-i18n";

export function RoadmapPreview() {
  const t = useT();
  const locale = useLocale();

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            kicker={t.roadmapPreview.kicker}
            title={t.roadmapPreview.title}
            subtitle={t.roadmapPreview.subtitle}
          />
          <Link
            href={`/${locale}/roadmap`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-primary"
          >
            {t.roadmapPreview.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-steel via-border to-border lg:top-[15px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          {t.roadmapPreview.phases.map((phase, i) => (
            <li key={phase.title} className="relative">
              <AnimatedSection delay={i * 0.08} className="flex gap-5 lg:block">
                <span
                  className={
                    i === 0
                      ? "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-steel text-xs font-semibold text-primary-foreground ring-4 ring-surface"
                      : "relative flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground ring-4 ring-surface"
                  }
                >
                  {i + 1}
                </span>
                <div className="lg:mt-6 lg:pr-6">
                  <h3 className="text-h3 text-foreground">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.desc}</p>
                </div>
              </AnimatedSection>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
