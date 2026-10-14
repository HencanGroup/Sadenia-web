import { Code2, Cpu, Globe, Layers, Network, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const covers: Record<string, { icon: LucideIcon; tone: string }> = {
  networks: { icon: Network, tone: "from-[oklch(0.3_0.08_259)] to-[oklch(0.5_0.13_240)]" },
  software: { icon: Code2, tone: "from-[oklch(0.28_0.07_270)] to-[oklch(0.5_0.14_262)]" },
  web: { icon: Globe, tone: "from-[oklch(0.3_0.07_245)] to-[oklch(0.55_0.11_225)]" },
  hardware: { icon: Cpu, tone: "from-[oklch(0.26_0.05_255)] to-[oklch(0.45_0.09_250)]" },
};

/** Branded placeholder cover used until real project imagery is available. */
function CoverArt({ categoryKey }: { categoryKey?: string | undefined }) {
  const { icon: Icon, tone } = covers[categoryKey ?? ""] ?? {
    icon: Layers,
    tone: "from-primary to-steel",
  };
  return (
    <div className={cn("absolute inset-0 bg-gradient-to-br", tone)}>
      <div className="glow absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_70%_60%,black,transparent_70%)]"
      />
      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className="absolute -right-6 -bottom-8 size-44 text-primary-foreground/15 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
      />
      <span className="absolute bottom-5 left-5 flex size-11 items-center justify-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
        <Icon className="size-5" />
      </span>
    </div>
  );
}

export function ProjectCard({
  title,
  desc,
  category,
  categoryKey,
  image = "",
}: {
  title: string;
  desc: string;
  category: string;
  categoryKey?: string;
  image?: string;
}) {
  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-2">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <CoverArt categoryKey={categoryKey} />
        )}
        <span className="absolute top-3 left-3 rounded-full border border-primary-foreground/20 bg-ink/40 px-2.5 py-1 text-xs font-medium text-primary-foreground backdrop-blur-md">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
        <h3 className="text-h3 text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </article>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-2">
      <div className="aspect-[16/10] animate-pulse rounded-xl bg-muted" />
      <div className="space-y-3 px-4 pt-5 pb-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
