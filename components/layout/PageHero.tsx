import { AnimatedSection } from "@/components/AnimatedSection";
import { Eyebrow } from "@/components/ui/eyebrow";

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
    <section className="gradient-primary relative overflow-hidden">
      <div className="glow absolute inset-0" />
      <AnimatedSection className="relative mx-auto max-w-7xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24 lg:px-8">
        <Eyebrow invert>{kicker}</Eyebrow>
        <h1 className="text-h1 mt-6 max-w-3xl text-primary-foreground">{title}</h1>
        {subtitle && (
          <p className="text-lead mt-5 max-w-2xl text-primary-foreground/75">{subtitle}</p>
        )}
      </AnimatedSection>
    </section>
  );
}
