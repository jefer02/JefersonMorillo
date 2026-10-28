import type { NextConfig } from "next";

// Build date is fixed once per build so the colophon edition and © year match the deploy.
const BUILD_DATE = new Date().toISOString();

const nextConfig: NextConfig = {
  // Static export to `out/` for Cloudflare Pages; the contact form posts to the Pages
  // Function in functions/api/contact.ts. Cache Components (PPR) can't be combined with it.
  output: "export",
  env: {
    NEXT_PUBLIC_BUILD_DATE: BUILD_DATE,
  },
  images: {
    // A static export has no image optimization server.
    unoptimized: true,
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
