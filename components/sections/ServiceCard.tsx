"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { useLocale, useT } from "@/lib/use-i18n";

export function ServiceCard({
  icon: Icon,
  title,
  desc,
  href = "solutions",
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  href?: string;
}) {
  const locale = useLocale();
  const t = useT();
  return (
    <div className="card-lift group relative overflow-hidden flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <div className="inline-flex self-start rounded-lg bg-secondary p-3 text-steel transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </div>
      <h3 className="text-h3 mt-5 text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <Link
        href={`/${locale}/${href}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-steel"
      >
        {t.services.learn}
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
