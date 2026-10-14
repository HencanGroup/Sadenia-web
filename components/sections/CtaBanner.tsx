"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { buttonVariants } from "@/components/ui/button";
import { company } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/use-i18n";

export function CtaBanner() {
  const t = useT();
  const locale = useLocale();
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <AnimatedSection className="gradient-primary relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-20">
        <div className="glow absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 size-80 rounded-full border border-primary-foreground/10"
        />
        <div
          aria-hidden="true"
          className="absolute -top-8 -right-8 size-48 rounded-full border border-primary-foreground/10"
        />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-primary-foreground">{t.ctaBanner.title}</h2>
            <p className="text-lead mt-4 text-primary-foreground/75">{t.ctaBanner.subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={`/${locale}/contact`}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              {t.ctaBanner.button}
              <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${company.email}`}
              className={buttonVariants({ variant: "onDark", size: "lg" })}
            >
              <Mail />
              {company.email}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
