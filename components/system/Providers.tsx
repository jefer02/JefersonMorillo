"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SmoothScroll />
      {children}
    </ThemeProvider>
  );
}
