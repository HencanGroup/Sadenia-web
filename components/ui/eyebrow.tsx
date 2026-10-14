import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  invert = false,
  className,
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        invert
          ? "border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/85"
          : "border-border bg-background text-steel shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", invert ? "bg-sky" : "bg-steel")} />
      {children}
    </span>
  );
}
