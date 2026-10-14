"use client";

import Link from "next/link";
import { Facebook, Linkedin, Mail, Phone, Twitter } from "lucide-react";

import { company } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/use-i18n";

export function Footer() {
  const locale = useLocale();
  const t = useT();

  const companyLinks = [
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/solutions`, label: t.nav.solutions },
    { href: `/${locale}/technology`, label: t.nav.technology },
    { href: `/${locale}/hardware`, label: t.nav.hardware },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  const linkClass = "transition-colors hover:text-primary-foreground";

  return (
    <footer className="relative overflow-hidden bg-ink text-primary-foreground">
      <div className="glow absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Sadenia Systems SARL"
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/65">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { icon: Linkedin, href: company.social.linkedin, label: "LinkedIn" },
                { icon: Facebook, href: company.social.facebook, label: "Facebook" },
                { icon: Twitter, href: company.social.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/75 transition-colors hover:border-primary-foreground/30 hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-sm font-semibold text-primary-foreground">{t.footer.services}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/65">
                {t.services.items.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <Link href={`/${locale}/solutions`} className={linkClass}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary-foreground">{t.footer.company}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/65">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary-foreground">{t.footer.contact}</h3>
              <ul className="mt-4 space-y-3 text-sm text-primary-foreground/65">
                {/* <li className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sky" />
                  <span>
                    {company.address[0]}
                    <br />
                    {company.address[1]}
                  </span>
                </li> */}
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 size-4 shrink-0 text-sky" />
                  <a href={`mailto:${company.email}`} className={linkClass}>
                    {company.email}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-sky" />
                  <span className="flex flex-col gap-1">
                    {company.phones.map((p) => (
                      <a key={p} href={`tel:${p}`} className={linkClass}>
                        {p}
                      </a>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-16 bg-gradient-to-b from-primary-foreground/15 to-transparent bg-clip-text font-display text-[18vw] leading-none font-semibold tracking-[-0.05em] text-transparent select-none lg:text-[11.5rem]"
        >
          Sadenia
        </p>

        <div className="mt-2 flex flex-col gap-2 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </span>
          <a href={`https://${company.website}`} className={linkClass}>
            {company.website}
          </a>
        </div>
      </div>
    </footer>
  );
}
