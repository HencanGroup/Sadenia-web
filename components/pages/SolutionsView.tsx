"use client";

import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { useLocale, useT } from "@/lib/use-i18n";
import { serviceIcons } from "@/lib/service-icons";
import { cn } from "@/lib/utils";

const slug = (i: number) => `system-${i + 1}`;

function SystemSection({
  id,
  index,
  icon: Icon,
  title,
  desc,
  problem,
  purpose,
  capabilities,
  sectors,
}: {
  id: string;
  index: number;
  icon: LucideIcon;
  title: string;
  desc: string;
  problem?: string | undefined;
  purpose?: string | undefined;
  capabilities?: string[] | undefined;
  sectors?: string[] | undefined;
}) {
  const t = useT();
  const locale = useLocale();
  const s = t.services;

  return (
    <AnimatedSection>
      <article
        id={id}
        className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <header className="relative overflow-hidden border-b border-border bg-surface p-6 sm:p-10">
          <div className="glow-light absolute inset-0" />
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="font-display text-sm font-medium text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-h2 mt-5 text-foreground">{title}</h2>
              <p className="text-lead mt-3 text-muted-foreground">{desc}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-px bg-border md:grid-cols-2">
          {problem && (
            <div className="bg-card p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-steel">{s.challengeLabel}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{problem}</p>
            </div>
          )}
          {purpose && (
            <div className="bg-card p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-steel">{s.purposeLabel}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{purpose}</p>
            </div>
          )}
        </div>

        {capabilities && capabilities.length > 0 && (
          <div className="border-t border-border p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-steel">{s.capabilitiesLabel}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-steel/10 text-steel">
                    <Check className="size-3" />
                  </span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-6 sm:px-8">
          {sectors && sectors.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-semibold text-steel">{s.sectorsLabel}</span>
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {sector}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}
          <Link href={`/${locale}/contact`} className={buttonVariants({ variant: "outline" })}>
            {s.enquire}
            <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
          </Link>
        </footer>
      </article>
    </AnimatedSection>
  );
}

export function SolutionsView() {
  const t = useT();
  const items = t.services.items;
  const [active, setActive] = useState(slug(0));

  // Highlight the system currently in view in the side nav: the last section
  // whose top has scrolled past ~35% of the viewport.
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.35;
      let current = slug(0);
      items.forEach((_, i) => {
        const el = document.getElementById(slug(i));
        if (el && el.getBoundingClientRect().top <= threshold) current = slug(i);
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <>
      <PageHero
        kicker={t.services.kicker}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-12 lg:px-8">
          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label={t.services.jumpTo}>
              <p className="px-3 text-xs font-medium text-muted-foreground">{t.services.jumpTo}</p>
              <ul className="mt-3 space-y-1">
                {items.map((s, i) => {
                  const Icon = serviceIcons[i % serviceIcons.length]!;
                  const id = slug(i);
                  return (
                    <li key={s.title}>
                      <a
                        href={`#${id}`}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active === id
                            ? "bg-secondary text-primary"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Mobile: horizontally scrollable jump links */}
          <nav className="-mx-4 overflow-x-auto px-4 lg:hidden" aria-label={t.services.jumpTo}>
            <ul className="flex gap-2">
              {items.map((s, i) => (
                <li key={s.title} className="shrink-0">
                  <a
                    href={`#${slug(i)}`}
                    className="block rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {items.map((s, i) => (
              <SystemSection
                key={s.title}
                id={slug(i)}
                index={i}
                icon={serviceIcons[i % serviceIcons.length]!}
                title={s.title}
                desc={s.desc}
                problem={"problem" in s ? s.problem : undefined}
                purpose={"purpose" in s ? s.purpose : undefined}
                capabilities={"capabilities" in s ? s.capabilities : undefined}
                sectors={"sectors" in s ? s.sectors : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
