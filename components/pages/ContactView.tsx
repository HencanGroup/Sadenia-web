"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AnimatedSection } from "@/components/AnimatedSection";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { company } from "@/lib/i18n";
import { useT } from "@/lib/use-i18n";
import { cn } from "@/lib/utils";

const MAP_URL = "https://maps.app.goo.gl/6YvEHwRrVSH3RUt68?g_st=aw";

export function ContactView() {
  const t = useT();
  const c = t.contact;

  const schema = z.object({
    name: z.string().min(2, c.errors.name),
    email: z.string().email(c.errors.email),
    phone: z
      .string()
      .regex(/^[+()\d\s-]{6,20}$/, c.errors.phone)
      .optional()
      .or(z.literal("")),
    subject: z.string().min(1, c.errors.subject),
    message: z.string().min(10, c.errors.message),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "services", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    toast.success(c.success);
    reset();
  };

  const field =
    "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-[0.9375rem] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-steel focus:ring-4 focus:ring-steel/15 aria-[invalid=true]:border-destructive";
  const label = "text-sm font-medium text-foreground";
  const error = "mt-1.5 text-xs text-destructive";

  const methods = [
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    ...company.phones.map((p) => ({ icon: Phone, label: c.phones, value: p, href: `tel:${p}` })),
    // { icon: MapPin, label: c.address, value: company.address.join(", "), href: MAP_URL },
  ];

  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} subtitle={c.subtitle} />

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <AnimatedSection className="lg:col-span-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={label}>
                    {c.name}
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                    className={field}
                  />
                  {errors.name && <p className={error}>{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={label}>
                    {c.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    className={field}
                  />
                  {errors.email && <p className={error}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={label}>
                    {c.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                    className={field}
                  />
                  {errors.phone && <p className={error}>{errors.phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className={label}>
                    {c.subject}
                  </label>
                  <select id="subject" {...register("subject")} className={cn(field, "h-[50px]")}>
                    <option value="services">{c.subjects.services}</option>
                    <option value="partnership">{c.subjects.partnership}</option>
                    <option value="support">{c.subjects.support}</option>
                    <option value="other">{c.subjects.other}</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className={label}>
                  {c.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  aria-invalid={!!errors.message}
                  {...register("message")}
                  className={cn(field, "resize-y")}
                />
                {errors.message && <p className={error}>{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
              >
                {isSubmitting ? c.sending : c.send}
                <Send />
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-4">
            <h2 className="text-h3 text-foreground">{c.infoTitle}</h2>
            <ul className="mt-5 space-y-3">
              {methods.map(({ icon: Icon, label: methodLabel, value, href }) => (
                <li key={value}>
                  <a
                    href={href}
                    className="card-lift group flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-steel transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground">{methodLabel}</span>
                      <span className="block truncate font-medium text-foreground">{value}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-steel" />
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
