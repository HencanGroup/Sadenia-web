"use client";

import { Check, Cloud, Network, Server, ShieldCheck, type LucideIcon } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { useT } from "@/lib/use-i18n";

const capabilityIcons = [Server, Network, Cloud, ShieldCheck];

function CapabilityCard({
  icon: Icon,
  title,
  desc,
  items,
  index,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
  index: number;
}) {
  return (
    <AnimatedSection delay={(index % 2) * 0.08} className="h-full">
      <div className="card-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-steel transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </span>
          <span className="font-display text-sm font-medium text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-h3 mt-6 text-foreground">{title}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{desc}</p>
        <ul className="mt-6 grid gap-2.5 border-t border-border pt-6 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-steel" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}

export function TechnologyView() {
  const t = useT();
  const tech = t.technology;

  return (
    <>
      <PageHero kicker={tech.kicker} title={tech.title} subtitle={tech.subtitle} />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <AnimatedSection className="lg:col-span-6">
            <Eyebrow>{tech.overview}</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
              {tech.overviewDesc}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-h3 text-foreground">{tech.environmentsTitle}</h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {tech.environments.map((env) => (
                  <li
                    key={env}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-[var(--shadow-card)]"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-steel" />
                    {env}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center={false} title={tech.capabilitiesTitle} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {tech.capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.title}
                icon={capabilityIcons[i] ?? Server}
                title={cap.title}
                desc={cap.desc}
                items={cap.items}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
