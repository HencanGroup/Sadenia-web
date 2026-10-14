import type { Metadata } from "next";
import { Mail, MapPin, Phone, Quote } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/steps";
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

  const contactCards = [
    { icon: MapPin, label: t.contact.address, lines: company.address },
    { icon: Mail, label: "Email", lines: [company.email], href: `mailto:${company.email}` },
    { icon: Phone, label: t.contact.phones, lines: company.phones },
  ];

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} subtitle={a.body} />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <AnimatedSection className="lg:col-span-6">
            <Eyebrow>{a.missionTitle}</Eyebrow>
            <blockquote className="relative mt-8">
              <Quote aria-hidden="true" className="size-10 text-sky" />
              <p className="mt-4 font-display text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
                {a.mission}
              </p>
            </blockquote>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-6">
            <h2 className="text-h3 text-foreground">{a.visionTitle}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {a.values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-steel/30"
                >
                  <span className="font-display text-sm font-medium text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={a.timelineTitle} />
          <Timeline
            className="mt-14"
            items={a.timeline.map((item) => ({
              label: item.year,
              title: item.title,
              desc: item.desc,
            }))}
          />
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center={false} title={a.teamTitle} subtitle={a.teamSubtitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.team.map((m, i) => (
              <AnimatedSection
                key={m.name}
                delay={(i % 3) * 0.06}
                className="card-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                {"photo" in m && m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={(m as { photo: string }).photo}
                    alt={m.name}
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="gradient-primary flex size-14 shrink-0 items-center justify-center rounded-full">
                    <span className="font-display text-base font-semibold text-primary-foreground">
                      {m.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-base font-semibold text-foreground">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center={false} title={a.addressTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contactCards.map(({ icon: Icon, label, lines, href }, i) => (
              <AnimatedSection
                key={label}
                delay={i * 0.06}
                className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-card)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-steel">
                  <Icon className="size-4" />
                </span>
                <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
                <div className="mt-1.5 space-y-0.5 text-sm text-muted-foreground">
                  {lines.map((l) =>
                    href ? (
                      <a key={l} href={href} className="block hover:text-steel">
                        {l}
                      </a>
                    ) : (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ),
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
