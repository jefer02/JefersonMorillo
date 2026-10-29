import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { Providers } from "@/components/system/Providers";
import { getContent } from "@/content";
import { socials } from "@/content/socials";
import { htmlLang, isLocale, locales, ogLocale, type Locale } from "@/lib/i18n/config";
import { localeAlternates } from "@/lib/i18n/metadata";
import { messages } from "@/lib/i18n/messages";
import "../globals.css";

// Shippori Mincho B1 and Zen Kaku Gothic New ship from Google Fonts in ~120 CJK slices
// (14 MB if preloaded). These are self-hosted Latin + Spanish subsets of a few KB each,
// generated from the Google Fonts API (both fonts are under the SIL Open Font License).
const mincho = localFont({
  src: [
    { path: "../fonts/shippori-mincho-600.woff2", weight: "600" },
    { path: "../fonts/shippori-mincho-700.woff2", weight: "700" },
    { path: "../fonts/shippori-mincho-800.woff2", weight: "800" },
  ],
  variable: "--font-mincho",
  display: "swap",
});

const gothic = localFont({
  src: [
    { path: "../fonts/zen-kaku-gothic-400.woff2", weight: "400" },
    { path: "../fonts/zen-kaku-gothic-500.woff2", weight: "500" },
    { path: "../fonts/zen-kaku-gothic-700.woff2", weight: "700" },
  ],
  variable: "--font-gothic",
  display: "swap",
  // Body text swaps in quickly from the fallback; only the display face is preloaded.
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

// Handwritten voice for the Adicional notes and signature.
const klee = localFont({
  src: "../fonts/klee-one-600.woff2",
  weight: "600",
  variable: "--font-klee",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { profile } = getContent(locale);
  const t = messages[locale].meta;
  const title = `${profile.displayName} · ${profile.role}`;
  const description = t.description(profile.role, profile.city, profile.region, profile.welcome);
  return {
    metadataBase: new URL(profile.siteUrl),
    title: { default: title, template: `%s · ${profile.displayName}` },
    description,
    applicationName: profile.displayName,
    authors: [{ name: profile.fullName, url: socials[0].href }],
    alternates: localeAlternates(locale),
    openGraph: {
      type: "profile",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `/${locale}`,
      siteName: t.siteName,
      title,
      description,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#14161f" },
  ],
};

function personJsonLd(locale: Locale) {
  const { profile } = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.displayName,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: `${profile.siteUrl}/${locale}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.studies.university },
    birthPlace: { "@type": "Place", name: `${profile.birthplace}, ${profile.region}, ${profile.country}` },
    homeLocation: {
      "@type": "Place",
      name: `${profile.city}, ${profile.region}, ${profile.country}`,
      address: { "@type": "PostalAddress", addressLocality: profile.city, addressRegion: profile.region, addressCountry: "CO" },
    },
    sameAs: socials.map((s) => s.href),
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={`${mincho.variable} ${gothic.variable} ${mono.variable} ${klee.variable} antialiased`}
    >
      <body className="min-h-dvh">
        {/* Marks JavaScript as available before first paint (enables `js:` layouts without a re-render). */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
        <a
          href="#contenido"
          className="bg-ink text-paper fixed top-3 left-3 z-[100] -translate-y-24 rounded-md px-4 py-3 font-medium transition-transform duration-200 focus:translate-y-0"
        >
          {messages[locale].skipLink}
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
