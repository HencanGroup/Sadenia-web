"use client";

import Link from "next/link";
import { ArrowRight, Check, Cpu, Target, Wrench, Rocket } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale, useT } from "@/lib/use-i18n";

const phaseIcons = [Target, Wrench, Cpu, Rocket];

export function HardwareView() {
  const t = useT();
  const locale = useLocale();

  return (
    <>
      <PageHero
        kicker={t.hardware.kicker}
        title={t.hardware.title}
        subtitle={t.hardware.subtitle}
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-2xl text-primary sm:text-3xl">{t.hardware.introTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.hardware.intro}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl text-primary sm:text-3xl">{t.hardware.visionTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.hardware.vision}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-2xl text-primary sm:text-3xl">{t.hardware.approachTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.hardware.approach}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.hardware.phasesTitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.hardware.phases.map((phase, i) => {
              const Icon = phaseIcons[i]!;
              return (
                <AnimatedSection
                  key={phase.title}
                  delay={i * 0.08}
                  className="rounded-md border border-border bg-card p-6"
                >
                  <div className="inline-flex rounded-md bg-secondary p-3 text-steel">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg text-primary">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              {t.hardware.note}
            </p>
            <Link
              href={`/${locale}/contact`}
              className={buttonVariants({ size: "lg", className: "mt-6" })}
            >
              {t.ctaBanner.button}
              <ArrowRight className="size-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
