import { AnimatedSection } from "@/components/AnimatedSection";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  center = true,
  invert = false,
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  invert?: boolean;
  className?: string;
}) {
  return (
    <AnimatedSection className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {kicker && <Eyebrow invert={invert}>{kicker}</Eyebrow>}
      <h2
        className={cn(
          "text-h2",
          kicker && "mt-5",
          invert ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lead mt-4",
            invert ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
