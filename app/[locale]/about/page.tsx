import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/layout/PageHero";
import { company, defaultLocale, getMessages, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(isLocale(locale) ? locale : defaultLocale);
  const title = `${t.about.title} — Sadenia Systems SARL`;
  return {
    title,
    description: t.about.body,
    openGraph: { title, description: t.about.body },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getMessages(isLocale(locale) ? locale : defaultLocale);
  const a = t.about;

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} subtitle={a.body} />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <AnimatedSection className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h2 className="text-2xl text-primary">{a.missionTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{a.mission}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl text-primary">{a.visionTitle}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {a.values.map((v) => (
                <div key={v.title} className="rounded-md bg-surface p-5">
                  <h3 className="text-base text-primary">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={a.timelineTitle} />
          <div className="relative mt-12 border-l-2 border-border pl-8">
            {a.timeline.map((item, i) => (
              <AnimatedSection
                key={item.year}
                delay={i * 0.06}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute top-1.5 -left-[41px] size-4 rounded-full border-2 border-steel bg-background" />
                <span className="font-display text-sm font-bold text-steel">{item.year}</span>
                <h3 className="mt-1 text-lg text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={a.teamTitle} subtitle={a.teamSubtitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.team.map((m, i) => (
              <AnimatedSection
                key={m.name}
                delay={i * 0.06}
                className="card-lift rounded-xl border border-border bg-card p-6 text-center"
              >
                {"photo" in m && m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={(m as { photo: string }).photo}
                    alt={m.name}
                    className="mx-auto size-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="gradient-primary mx-auto flex size-16 items-center justify-center rounded-full">
                    <span className="font-display text-lg font-bold text-primary-foreground">
                      {m.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <h3 className="mt-4 text-base text-primary">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading title={a.addressTitle} />
          <AnimatedSection className="mt-8 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <MapPin className="size-4 text-steel" /> {company.address.join(", ")}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="size-4 text-steel" /> {company.email}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="size-4 text-steel" /> {company.phones.join(" · ")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
