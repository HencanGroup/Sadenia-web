"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Map, MapPin, Phone, Send } from "lucide-react";
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
    "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-steel";

  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} subtitle={c.subtitle} />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          <AnimatedSection>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-primary">
                    {c.name}
                  </label>
                  <input id="name" {...register("name")} className={cn(field, "mt-2")} />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-primary">
                    {c.email}
                  </label>
                  <input id="email" {...register("email")} className={cn(field, "mt-2")} />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-primary">
                    {c.phone}
                  </label>
                  <input id="phone" {...register("phone")} className={cn(field, "mt-2")} />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-primary">
                    {c.subject}
                  </label>
                  <select id="subject" {...register("subject")} className={cn(field, "mt-2")}>
                    <option value="services">{c.subjects.services}</option>
                    <option value="partnership">{c.subjects.partnership}</option>
                    <option value="support">{c.subjects.support}</option>
                    <option value="other">{c.subjects.other}</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-primary">
                  {c.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message")}
                  className={cn(field, "mt-2 resize-y")}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonVariants({ size: "lg" })}
              >
                {isSubmitting ? c.sending : c.send}
                <Send className="size-4" />
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="rounded-md bg-surface p-8">
            <h2 className="text-xl text-primary">{c.infoTitle}</h2>
            <dl className="mt-6 space-y-6 text-sm">
              {/* <div>
                <dt className="flex items-center gap-2 font-semibold text-primary">
                  <MapPin className="size-4 text-steel" /> {c.address}
                </dt>
                <dd className="mt-1.5 text-muted-foreground">
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-steel"
                  >
                    {company.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </a>
                </dd>
              </div> */}
              <div>
                <dt className="flex items-center gap-2 font-semibold text-primary">
                  <Phone className="size-4 text-steel" /> {c.phones}
                </dt>
                <dd className="mt-1.5 space-y-1 text-muted-foreground">
                  {company.phones.map((p) => (
                    <a key={p} href={`tel:${p}`} className="block hover:text-steel">
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-semibold text-primary">
                  <Mail className="size-4 text-steel" /> Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${company.email}`}
                    className="text-muted-foreground hover:text-steel"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              {/* <div>
                <dt className="flex items-center gap-2 font-semibold text-primary">
                  <Map className="size-4 text-steel" /> {c.map}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-steel"
                  >
                    {c.mapLink}
                  </a>
                </dd>
              </div> */}
            </dl>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
