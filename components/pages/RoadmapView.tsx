"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Info, Rocket, Settings, Target, Users } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/steps";
import { useLocale, useT } from "@/lib/use-i18n";

const milestoneIcons = [Target, Settings, Users, FlaskConical, Rocket];

export function RoadmapView() {
  const t = useT();
  const locale = useLocale();
  const r = t.roadmap;

  return (
    <>
      <PageHero kicker={r.kicker} title={r.title} subtitle={r.subtitle} />

      <section className="bg-background py-20 sm:py-28">
        <AnimatedSection className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Eyebrow>{r.objectiveTitle}</Eyebrow>
          <p className="mt-6 font-display text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
            {r.objective}
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={r.timelineTitle} />
          <Timeline
            className="mt-14"
            items={r.milestones.map((m, i) => ({
              label: m.month,
              title: m.title,
              desc: m.desc,
              icon: milestoneIcons[i],
            }))}
          />

          <AnimatedSection className="mt-14 flex flex-col gap-5 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0 text-steel" />
              <p>{r.note}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-steel hover:text-primary"
            >
              {r.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
