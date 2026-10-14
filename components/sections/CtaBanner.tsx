"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { buttonVariants } from "@/components/ui/button";
import { useLocale, useT } from "@/lib/use-i18n";

export function CtaBanner() {
  const t = useT();
  const locale = useLocale();
  return (
    <section className="gradient-primary relative overflow-hidden">
      <div className="glow absolute inset-0" />
      <AnimatedSection className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="text-h2 text-primary-foreground">{t.ctaBanner.title}</h2>
          <p className="text-lead mt-3 text-primary-foreground/75">{t.ctaBanner.subtitle}</p>
        </div>
        <Link
          href={`/${locale}/contact`}
          className={buttonVariants({ variant: "accent", size: "lg", className: "shrink-0" })}
        >
          {t.ctaBanner.button}
          <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
        </Link>
      </AnimatedSection>
    </section>
  );
}
