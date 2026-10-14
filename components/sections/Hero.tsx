"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { serviceIcons } from "@/lib/service-icons";
import { useLocale, useT } from "@/lib/use-i18n";

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      video.currentTime = 0;
    } else {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-poster.jpg"
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    >
      <source src="/animated-video.mp4" type="video/mp4" />
    </video>
  );
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(raf);
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const t = useT();
  const locale = useLocale();

  // "Software. Infrastructure. Hardware — One technology partner." → highlight the part after the dash.
  const [lead, highlight] = t.hero.title.split(/\s+—\s+/);

  const stats = [
    { value: 10, suffix: "+", label: t.stats.projects },
    { value: 15, suffix: "+", label: t.stats.years },
  ];

  const systems = t.services.items.slice(0, 5);

  return (
    <section className="relative overflow-hidden bg-ink">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <div className="glow absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-32 lg:pb-24">
        <div className="lg:col-span-7">
          <motion.h1 {...fadeUp(0)} className="text-display text-primary-foreground">
            {lead}
            {highlight && (
              <>
                {" — "}
                <span className="bg-gradient-to-r from-sky to-primary-foreground bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-lead mt-6 max-w-xl text-primary-foreground/75"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/solutions`}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              {t.hero.cta}
              <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={buttonVariants({ variant: "onDark", size: "lg" })}
            >
              {t.hero.cta2}
            </Link>
          </motion.div>

          <motion.dl
            {...fadeUp(0.32)}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-primary-foreground/10 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-primary-foreground">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-1 text-sm text-primary-foreground/60">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:col-span-5 lg:block"
        >
          <div className="ml-auto max-w-sm rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-2 shadow-2xl backdrop-blur-xl">
            <p className="px-3 pt-2 pb-3 text-xs font-medium text-primary-foreground/60">
              {t.services.kicker}
            </p>
            <ul className="space-y-1">
              {systems.map((s, i) => {
                const Icon = serviceIcons[i]!;
                return (
                  <li key={s.title}>
                    <Link
                      href={`/${locale}/solutions`}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-foreground/10"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10 text-sky">
                        <Icon className="size-4" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-primary-foreground">
                        {s.title}
                      </span>
                      <ArrowUpRight className="size-4 text-primary-foreground/40 transition-colors group-hover:text-primary-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
