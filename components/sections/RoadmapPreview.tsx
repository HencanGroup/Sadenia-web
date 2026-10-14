"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Steps } from "@/components/ui/steps";
import { useLocale, useT } from "@/lib/use-i18n";

export function RoadmapPreview() {
  const t = useT();
  const locale = useLocale();

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            kicker={t.roadmapPreview.kicker}
            title={t.roadmapPreview.title}
            subtitle={t.roadmapPreview.subtitle}
          />
          <Link
            href={`/${locale}/roadmap`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-primary"
          >
            {t.roadmapPreview.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <Steps className="mt-14" ringClass="ring-surface" steps={t.roadmapPreview.phases} />
      </div>
    </section>
  );
}
