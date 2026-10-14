"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { useLocale, useT } from "@/lib/use-i18n";

export function PageBreadcrumb({ current }: { current: string }) {
  const locale = useLocale();
  const t = useT();

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            href={`/${locale}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.home}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
        </li>
        <li aria-current="page" className="font-medium text-steel">
          {current}
        </li>
      </ol>
    </nav>
  );
}
