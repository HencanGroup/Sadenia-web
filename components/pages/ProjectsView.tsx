"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useT } from "@/lib/use-i18n";
import { cn } from "@/lib/utils";

type Filter = "all" | "networks" | "software" | "web" | "hardware";
const filters: Filter[] = ["all", "networks", "software", "web", "hardware"];

export function ProjectsView() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const items = t.projects.items.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <PageHero
        kicker={t.projects.kicker}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-primary",
                )}
              >
                {f === "all" ? t.projects.all : t.projects.categories[f]}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                >
                  <ProjectCard
                    title={p.title}
                    desc={p.desc}
                    categoryKey={p.category}
                    category={
                      t.projects.categories[p.category as keyof typeof t.projects.categories]
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
