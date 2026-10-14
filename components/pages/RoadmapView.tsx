"use client";

import Link from "next/link";
import { ArrowRight, Target, Settings, Users, FlaskConical, Rocket } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale, useT } from "@/lib/use-i18n";

const milestoneIcons = [Target, Settings, Users, FlaskConical, Rocket];

export function RoadmapView() {
  const t = useT();
  const locale = useLocale();

  return (
    <>
      <PageHero kicker={t.roadmap.kicker} title={t.roadmap.title} subtitle={t.roadmap.subtitle} />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl text-primary sm:text-3xl">{t.roadmap.objectiveTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.roadmap.objective}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.roadmap.timelineTitle} />
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-12">
              {t.roadmap.milestones.map((milestone, i) => {
                const Icon = milestoneIcons[i]!;
                const isEven = i % 2 === 0;
                return (
                  <AnimatedSection
                    key={milestone.title}
                    delay={i * 0.1}
                    className="relative flex items-start gap-6 sm:gap-0"
                  >
                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                      <Icon className="size-4 text-steel" />
                    </div>

                    <div
                      className={`flex-1 rounded-md border border-border bg-card p-6 sm:w-[calc(50%-2rem)] ${
                        isEven ? "sm:mr-auto sm:pr-12" : "sm:ml-auto sm:pl-12"
                      }`}
                    >
                      <span className="text-xs font-semibold tracking-wide uppercase text-steel">
                        {milestone.month}
                      </span>
                      <h3 className="mt-1 text-lg text-primary">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {milestone.desc}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-sm leading-relaxed text-muted-foreground italic">{t.roadmap.note}</p>
            <Link
              href={`/${locale}/contact`}
              className={buttonVariants({ size: "lg", className: "mt-6" })}
            >
              {t.roadmap.cta}
              <ArrowRight className="size-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
