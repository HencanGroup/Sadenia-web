import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}

const sectionVariants = cva("relative", {
  variants: {
    tone: {
      default: "bg-background",
      muted: "bg-surface",
      dark: "gradient-primary overflow-hidden text-primary-foreground",
    },
    spacing: {
      default: "py-20 sm:py-28",
      compact: "py-14 sm:py-20",
      none: "",
    },
  },
  defaultVariants: { tone: "default", spacing: "default" },
});

export function Section({
  className,
  tone,
  spacing,
  ...props
}: ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return <section className={cn(sectionVariants({ tone, spacing }), className)} {...props} />;
}
