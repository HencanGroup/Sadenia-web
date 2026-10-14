import { AnimatedSection } from "@/components/AnimatedSection";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="glow-light absolute inset-0" />
      <div className="grid-fade absolute inset-0" />
      <AnimatedSection className="relative mx-auto max-w-7xl px-4 pt-36 pb-16 sm:px-6 sm:pt-40 sm:pb-20 lg:px-8">
        <PageBreadcrumb current={kicker} />
        <h1 className="text-h1 mt-6 max-w-3xl text-foreground">{title}</h1>
        {subtitle && <p className="text-lead mt-5 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </AnimatedSection>
    </section>
  );
}
