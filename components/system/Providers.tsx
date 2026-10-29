"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Dark is the default; the toggle saves the visitor's choice.
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <SmoothScroll />
      {children}
    </ThemeProvider>
  );
}
