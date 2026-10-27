import { todo } from "@/lib/todo";
import type { Testimonial } from "@/types";

/** The course requires at least 3 testimonials. */
export const MIN_TESTIMONIALS = 3;

// Real testimonials only, from people who agreed to be published.
// Never write testimonial text on someone's behalf. See docs/pedir-testimonios.md.
// Placeholders below never render in production (consent and verified are false).
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-docente",
    name: todo("nombre completo"),
    role: todo("cargo, p. ej. Docente de Ingeniería de Software, UCC"),
    relationship: todo("cómo te conoce, p. ej. Fue mi docente de …"),
    quote: todo("testimonio en sus propias palabras (25–70 palabras)"),
    consent: false,
    verified: false,
  },
  {
    id: "placeholder-equipo",
    name: todo("nombre completo"),
    role: todo("cargo o rol"),
    relationship: todo("p. ej. Compañero de equipo en LAAF / AloMedia"),
    quote: todo("testimonio en sus propias palabras (25–70 palabras)"),
    consent: false,
    verified: false,
  },
  {
    id: "placeholder-companero",
    name: todo("nombre completo"),
    role: todo("cargo o rol"),
    relationship: todo("cómo te conoce"),
    quote: todo("testimonio en sus propias palabras (25–70 palabras)"),
    consent: false,
    verified: false,
  },
];

export const publishableTestimonials = testimonials.filter((t) => t.consent && t.verified);

/** True when the section can be published (course minimum of verified, consented letters). */
export const testimonialsReady = publishableTestimonials.length >= MIN_TESTIMONIALS;
