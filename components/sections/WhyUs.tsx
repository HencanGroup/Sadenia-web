"use client";

import { Code2, Server, Cpu } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";
import { useT } from "@/lib/use-i18n";

const icons = [Code2, Server, Cpu];

export function WhyUs() {
  const t = useT();
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={t.why.kicker} title={t.why.title} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="h-full card-lift rounded-xl border border-border bg-card p-8 text-center">
                  <div className="mx-auto inline-flex rounded-full bg-primary p-4 text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-h3 mt-5 text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
