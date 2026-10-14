"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceIcons } from "@/lib/service-icons";
import { useLocale, useT } from "@/lib/use-i18n";
import { cn } from "@/lib/utils";

/** Abstract "app window" used as the visual on the large tiles. */
function WindowVisual({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-8 overflow-hidden rounded-t-xl border border-b-0 border-border bg-background shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 h-2 w-24 rounded-full bg-secondary" />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 p-4">
        <div className="space-y-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon className="size-4" />
          </span>
          <span className="block h-2 w-8 rounded-full bg-secondary" />
          <span className="block h-2 w-8 rounded-full bg-secondary" />
          <span className="block h-2 w-8 rounded-full bg-secondary" />
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[0.55, 0.8, 0.4].map((w, i) => (
              <div key={i} className="rounded-lg border border-border p-2.5">
                <span className="block h-1.5 w-10 rounded-full bg-secondary" />
                <span
                  className="mt-2 block h-2.5 rounded-full bg-steel/70"
                  style={{ width: `${w * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex h-20 items-end gap-1.5 rounded-lg border border-border p-2.5">
            {[40, 65, 50, 80, 60, 92, 74, 88, 70, 96].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-steel/80 to-sky/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionsBento() {
  const t = useT();
  const locale = useLocale();
  const items = t.services.items.slice(0, 6);
  const href = `/${locale}/solutions`;

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            kicker={t.services.kicker}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
          <Link
            href={href}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-primary"
          >
            {t.services.all}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const Icon = serviceIcons[i]!;
            const large = i === 0;
            const dark = i === items.length - 1;

            return (
              <AnimatedSection
                key={s.title}
                delay={(i % 3) * 0.06}
                className={cn(
                  "h-full",
                  large && "md:col-span-2 lg:row-span-2",
                  dark && "md:col-span-2 lg:col-span-1",
                )}
              >
                <Link
                  href={href}
                  className={cn(
                    "card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-8",
                    dark
                      ? "gradient-primary border-transparent text-primary-foreground"
                      : "border-border bg-card",
                    large && "bg-gradient-to-b from-surface to-card pb-0 sm:pb-0",
                  )}
                >
                  {dark && <div className="glow absolute inset-0" />}

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "inline-flex rounded-xl p-3",
                          dark
                            ? "bg-primary-foreground/10 text-sky"
                            : "bg-secondary text-steel transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "size-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          dark
                            ? "text-primary-foreground/50 group-hover:text-primary-foreground"
                            : "text-muted-foreground group-hover:text-steel",
                        )}
                      />
                    </div>
                    <h3
                      className={cn(
                        "mt-6",
                        large ? "text-h2" : "text-h3",
                        dark ? "text-primary-foreground" : "text-foreground",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-md text-sm leading-relaxed",
                        large && "text-base",
                        dark ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {s.desc}
                    </p>
                  </div>

                  {large && (
                    <div className="mt-auto">
                      <WindowVisual icon={Icon} />
                    </div>
                  )}

                  {dark && (
                    <span className="relative mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-semibold text-sky">
                      {t.services.learn}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
