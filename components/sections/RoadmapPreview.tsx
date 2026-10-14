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
        <SectionHeading
          kicker={t.roadmapPreview.kicker}
          title={t.roadmapPreview.title}
          subtitle={t.roadmapPreview.subtitle}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.roadmapPreview.phases.map((phase, i) => (
            <AnimatedSection key={phase.title} delay={i * 0.08}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary">{phase.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{phase.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-10 text-center">
          <Link
            href={`/${locale}/roadmap`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-primary"
          >
            {t.roadmapPreview.cta}
            <ArrowRight className="size-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
