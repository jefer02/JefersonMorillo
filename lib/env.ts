import { profile } from "@/content/profile";

// Server-only configuration for the contact form. Everything is optional so the
// first Vercel deploy builds with no environment variables at all.
export const env = {
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  contactTo: process.env.CONTACT_TO_EMAIL ?? profile.email,
  // Resend's onboarding sender works until a domain is verified.
  contactFrom: process.env.CONTACT_FROM_EMAIL ?? "Portafolio de Jeferson Morillo <onboarding@resend.dev>",
  isProduction: process.env.NODE_ENV === "production",
};
