import { Layers } from "lucide-react";

export function ProjectCard({
  title,
  desc,
  category,
  image = "",
}: {
  title: string;
  desc: string;
  category: string;
  image?: string;
}) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="gradient-hero relative flex h-44 items-center justify-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <div className="glow absolute inset-0" />
            <Layers className="relative size-10 text-sky" />
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-steel">
          {category}
        </span>
        <h3 className="text-h3 mt-3 text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </article>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="h-44 animate-pulse bg-muted" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
