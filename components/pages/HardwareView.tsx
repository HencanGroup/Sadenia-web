"use client";

import { Cpu, Info, Rocket, Target, Wrench } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Steps } from "@/components/ui/steps";
import { useT } from "@/lib/use-i18n";

const phaseIcons = [Target, Wrench, Cpu, Rocket];

// "Phase 1 — Planning & Sourcing" → "Planning & Sourcing" (the step marker already shows the number).
const stripPhasePrefix = (title: string) => title.split(/\s+—\s+/).pop() ?? title;

export function HardwareView() {
  const t = useT();
  const hw = t.hardware;

  return (
    <>
      <PageHero kicker={hw.kicker} title={hw.title} subtitle={hw.subtitle} />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <AnimatedSection className="lg:col-span-6">
            <h2 className="text-h2 text-foreground">{hw.introTitle}</h2>
            <p className="text-lead mt-5 text-muted-foreground">{hw.intro}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-6">
            <div className="gradient-primary relative overflow-hidden rounded-3xl p-8 text-primary-foreground sm:p-10">
              <div className="glow absolute inset-0" />
              <Cpu
                aria-hidden="true"
                strokeWidth={1}
                className="absolute -right-10 -bottom-10 size-56 text-primary-foreground/10"
              />
              <div className="relative">
                <Eyebrow invert>{hw.visionTitle}</Eyebrow>
                <p className="mt-6 font-display text-2xl leading-snug font-medium tracking-tight sm:text-[1.75rem]">
                  {hw.vision}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <AnimatedSection className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Eyebrow>{hw.approachTitle}</Eyebrow>
          <p className="mt-6 font-display text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
            {hw.approach}
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center={false} title={hw.phasesTitle} />
          <Steps
            className="mt-14"
            steps={hw.phases.map((p, i) => ({
              title: stripPhasePrefix(p.title),
              desc: p.desc,
              icon: phaseIcons[i],
            }))}
          />
          <AnimatedSection className="mt-14 flex gap-3 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-steel" />
            <p>{hw.note}</p>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
