"use client";

import Link from "next/link";
import { ArrowRight, Code2, Cpu, Server } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLocale, useT } from "@/lib/use-i18n";

const icons = [Code2, Server, Cpu];

export function WhyUs() {
  const t = useT();
  const locale = useLocale();

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <AnimatedSection className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Eyebrow>{t.why.kicker}</Eyebrow>
          <h2 className="text-h2 mt-5 text-foreground">{t.why.title}</h2>
          <Link
            href={`/${locale}/about`}
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-primary"
          >
            {t.nav.about}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </AnimatedSection>

        <ol className="divide-y divide-border border-y border-border lg:col-span-7">
          {t.why.items.map((item, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <li key={item.title}>
                <AnimatedSection
                  delay={i * 0.08}
                  className="group grid gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6"
                >
                  <span className="font-display text-sm font-medium text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex rounded-xl border border-border bg-background p-2.5 text-steel shadow-[var(--shadow-card)] transition-colors group-hover:border-steel/30">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="text-h3 text-foreground">{item.title}</h3>
                    </div>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
