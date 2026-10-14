"use client";

import type { LucideIcon } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

type Step = { title: string; desc: string; icon?: LucideIcon | undefined };

/**
 * Numbered steps on a connecting line: vertical on mobile, horizontal on desktop.
 * `ringClass` should match the section background so the line appears to pass behind the markers.
 */
export function Steps({
  steps,
  ringClass = "ring-background",
  className,
}: {
  steps: Step[];
  ringClass?: string;
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "relative grid gap-8 lg:gap-6",
        steps.length === 3 && "lg:grid-cols-3",
        steps.length === 4 && "lg:grid-cols-4",
        steps.length >= 5 && "lg:grid-cols-5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-steel via-border to-border lg:top-[19px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
      />
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="relative">
            <AnimatedSection delay={i * 0.08} className="flex gap-5 lg:block">
              <span
                className={cn(
                  "relative flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-4",
                  ringClass,
                  i === 0
                    ? "bg-steel text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground",
                )}
              >
                {Icon ? <Icon className="size-4" /> : i + 1}
              </span>
              <div className="lg:mt-6 lg:pr-6">
                {Icon && (
                  <span className="text-xs font-medium text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <h3 className={cn("text-h3 text-foreground", Icon && "mt-1")}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </AnimatedSection>
          </li>
        );
      })}
    </ol>
  );
}

type TimelineItem = { label: string; title: string; desc: string; icon?: LucideIcon | undefined };

/** Vertical timeline with a label column (year / month) on larger screens. */
export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[19px] w-px bg-gradient-to-b from-steel via-border to-transparent sm:left-[171px]"
      />
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="relative pb-10 last:pb-0">
            <AnimatedSection
              delay={i * 0.06}
              className="grid grid-cols-[40px_1fr] gap-x-5 sm:grid-cols-[132px_40px_1fr]"
            >
              <span className="col-start-2 row-start-1 font-display text-sm font-semibold text-steel sm:col-start-1 sm:pt-2.5 sm:text-right">
                {item.label}
              </span>
              <span className="col-start-1 row-span-2 row-start-1 flex size-10 items-center justify-center rounded-full border border-border bg-background text-steel shadow-[var(--shadow-card)] sm:col-start-2">
                {Icon ? (
                  <Icon className="size-4" />
                ) : (
                  <span className="size-2 rounded-full bg-steel" />
                )}
              </span>
              <div className="col-start-2 row-start-2 mt-2 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:col-start-3 sm:row-start-1 sm:mt-0 sm:p-6">
                <h3 className="text-h3 text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </AnimatedSection>
          </li>
        );
      })}
    </ol>
  );
}
