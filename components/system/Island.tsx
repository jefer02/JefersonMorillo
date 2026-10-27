import { Suspense, type ReactNode } from "react";

/**
 * A hydration boundary. The content is fully server-rendered; wrapping a below-the-fold
 * client component in Suspense lets React hydrate it as a separate unit, so hydration
 * yields to the browser instead of running as one long task.
 */
export function Island({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
