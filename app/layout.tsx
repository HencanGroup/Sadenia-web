import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "Sadenia Systems SARL — Systèmes, Réseaux & Logiciels",
  description:
    "Conception, développement et déploiement de systèmes informatiques à Kinshasa, RDC.",
  authors: [{ name: "Sadenia Systems SARL" }],
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Sadenia Systems SARL",
    description: "Systèmes innovants. Infrastructure fiable. Avenir numérique.",
    type: "website",
    siteName: "Sadenia Systems SARL",
    locale: "fr_RDC",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SadeniaSystems",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.sadenia.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${inter.variable}`}>
      <body>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
