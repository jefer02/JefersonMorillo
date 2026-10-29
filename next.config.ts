import type { NextConfig } from "next";

// Build date is fixed once per build so the colophon edition and © year never
// read the clock at request time (Cache Components treats `new Date()` as dynamic).
const BUILD_DATE = new Date().toISOString();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    NEXT_PUBLIC_BUILD_DATE: BUILD_DATE,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Case studies used to live under /volumenes, and the portfolio's own slug was renamed.
  // Other paths without a locale are redirected by proxy.ts.
  async redirects() {
    return [
      { source: "/volumenes/cronica-de-atriz", destination: "/es/proyectos/jeferson-morillo", permanent: true },
      { source: "/volumenes/:slug", destination: "/es/proyectos/:slug", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
