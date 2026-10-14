"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Cpu, Layers, Menu, Server } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLocale, useT } from "@/lib/use-i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  // Close the desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120);
  };

  const solutionLinks = [
    {
      href: `/${locale}/solutions`,
      label: t.nav.solutions,
      desc: t.nav.solutionsDesc,
      icon: Layers,
    },
    {
      href: `/${locale}/technology`,
      label: t.nav.technology,
      desc: t.nav.technologyDesc,
      icon: Server,
    },
    { href: `/${locale}/hardware`, label: t.nav.hardware, desc: t.nav.hardwareDesc, icon: Cpu },
  ];

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);
  const solutionsActive = solutionLinks.some((l) => isActive(l.href));

  const linkClass = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-secondary text-primary"
        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-4 rounded-full border pr-2.5 pl-5 backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "max-w-6xl border-border/80 bg-background/90 shadow-[var(--shadow-float)]"
            : "max-w-7xl border-border/50 bg-background/75 shadow-[var(--shadow-card)]",
        )}
      >
        <Link href={`/${locale}`} className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Sadenia Systems SARL" className="h-8 w-auto" />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          <li>
            <Link href={`/${locale}`} className={linkClass(isActive(`/${locale}`, true))}>
              {t.nav.home}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/about`} className={linkClass(isActive(`/${locale}/about`))}>
              {t.nav.about}
            </Link>
          </li>
          <li
            ref={menuRef}
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((v) => !v)}
              className={linkClass(solutionsActive)}
            >
              {t.nav.solutions}
              <ChevronDown
                className={cn("size-3.5 transition-transform", menuOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3"
                >
                  <ul className="rounded-2xl border border-border bg-popover p-2 shadow-[var(--shadow-float)]">
                    {solutionLinks.map(({ href, label, desc, icon: Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            "group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary",
                            isActive(href) && "bg-secondary",
                          )}
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-steel transition-colors group-hover:border-steel/30">
                            <Icon className="size-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              {label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                              {desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              href={`/${locale}/projects`}
              className={linkClass(isActive(`/${locale}/projects`))}
            >
              {t.nav.projects}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/contact`} className={linkClass(isActive(`/${locale}/contact`))}>
              {t.nav.contact}
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Link href={`/${locale}/contact`} className={buttonVariants()}>
            {t.nav.cta}
            <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
          </Link>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            aria-label={t.nav.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground lg:hidden"
          >
            <Menu className="size-4.5" />
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-sm">
            <div className="flex h-16 items-center border-b border-border px-5">
              <SheetTitle className="text-sm font-semibold text-muted-foreground">
                {t.nav.menu}
              </SheetTitle>
            </div>
            <ul className="flex-1 overflow-y-auto px-3 py-4">
              {[
                { href: `/${locale}`, label: t.nav.home, exact: true },
                { href: `/${locale}/about`, label: t.nav.about },
                ...solutionLinks,
                { href: `/${locale}/projects`, label: t.nav.projects },
                { href: `/${locale}/contact`, label: t.nav.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 font-display text-lg font-medium tracking-tight transition-colors",
                      isActive(l.href, "exact" in l)
                        ? "bg-secondary text-primary"
                        : "text-foreground hover:bg-secondary/70",
                    )}
                  >
                    {l.label}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-border p-5">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className={buttonVariants()}
              >
                {t.nav.cta}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
