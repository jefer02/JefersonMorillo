// Tech-related networks only. No phone, no WhatsApp, no personal social media.
export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "jefer02",
    href: "https://github.com/jefer02",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "jeferson-morillo",
    href: "https://co.linkedin.com/in/jeferson-morillo-2a931b368",
  },
] as const;

export type Social = (typeof socials)[number];
