import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/system/Providers";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import "./globals.css";

// Shippori Mincho B1 and Zen Kaku Gothic New ship from Google Fonts in ~120 CJK slices
// (14 MB if preloaded). These are self-hosted Latin + Spanish subsets of a few KB each,
// generated from the Google Fonts API (both fonts are under the SIL Open Font License).
const mincho = localFont({
  src: [
    { path: "./fonts/shippori-mincho-600.woff2", weight: "600" },
    { path: "./fonts/shippori-mincho-700.woff2", weight: "700" },
    { path: "./fonts/shippori-mincho-800.woff2", weight: "800" },
  ],
  variable: "--font-mincho",
  display: "swap",
});

const gothic = localFont({
  src: [
    { path: "./fonts/zen-kaku-gothic-400.woff2", weight: "400" },
    { path: "./fonts/zen-kaku-gothic-500.woff2", weight: "500" },
    { path: "./fonts/zen-kaku-gothic-700.woff2", weight: "700" },
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

// Handwritten voice for the author's afterword and signature.
const klee = localFont({
  src: "./fonts/klee-one-600.woff2",
  weight: "600",
  variable: "--font-klee",
  display: "swap",
  preload: false,
});

// 12 KB subset with only the decorative CJK glyphs (表紙, 目次, 第…章, あとがき, 奥付…).
const cjk = localFont({
  src: "./fonts/shippori-cjk.woff2",
  variable: "--font-cjk-subset",
  weight: "700",
  display: "swap",
  preload: false,
});

const description = `${profile.displayName}: ${profile.role.toLowerCase()} en ${profile.city}, ${profile.region}. ${profile.welcome}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.displayName} · ${profile.seriesTitle}`,
    template: `%s · ${profile.displayName}`,
  },
  description,
  applicationName: profile.seriesTitle,
  authors: [{ name: profile.fullName, url: socials[0].href }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: "/",
    siteName: `${profile.seriesTitle} — ${profile.volume}`,
    title: `${profile.displayName} · ${profile.seriesTitle}`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#14161f" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.displayName,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.studies.university },
  birthPlace: {
    "@type": "Place",
    name: `${profile.birthplace}, ${profile.region}, ${profile.country}`,
  },
  homeLocation: {
    "@type": "Place",
    name: `${profile.city}, ${profile.region}, ${profile.country}`,
    address: { "@type": "PostalAddress", addressLocality: profile.city, addressRegion: profile.region, addressCountry: "CO" },
  },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      suppressHydrationWarning
      className={`${mincho.variable} ${gothic.variable} ${mono.variable} ${klee.variable} ${cjk.variable} antialiased`}
    >
      <body className="min-h-dvh">
        {/* Marks JavaScript as available before first paint (enables `js:` layouts without a re-render). */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
        <a
          href="#contenido"
          className="bg-ink text-paper fixed top-3 left-3 z-[100] -translate-y-24 rounded-md px-4 py-3 font-medium transition-transform duration-200 focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
