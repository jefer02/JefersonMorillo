import type { Testimonial } from "@/types";

/** The course requires at least 3 testimonials. */
export const MIN_TESTIMONIALS = 3;

// Real testimonials only, from people who agreed to be published with their name.
// Quotes are copied word for word and never translated. Never write testimonial text on
// someone's behalf. See docs/pedir-testimonios.md. The English relationship lines live in
// content/en.ts.
export const testimonials: Testimonial[] = [
  {
    id: "juan-manuel-guerrero",
    name: "Juan Manuel Guerrero Ibarra",
    initials: "JG",
    relationship: "Amigo · Estudiante de Ingeniería de Software, UCC Pasto · Usuario de Voxara",
    quote:
      "Antes de Voxara solo tenía la sensación de que un lugar era demasiado ruidoso o de que mis audífonos estaban muy altos, y nunca sabía si exageraba o si de verdad me estaba haciendo daño. Hoy, gracias a Jeferson Morillo y a la aplicación que diseñó y desarrolló, tengo datos concretos para cuidarme.",
    review:
      "Antes de Voxara solo tenía la sensación de que un lugar era demasiado ruidoso o de que mis audífonos estaban muy altos, y nunca sabía si exageraba o si de verdad me estaba haciendo daño. Hoy, gracias a Jeferson Morillo y a la aplicación que diseñó y desarrolló, tengo datos concretos para cuidarme. Uso Voxara todos los días. Si el ruido pasa de 85 dBA durante 3 minutos, me avisa con «Mucho ruido alrededor», y ya sé que debo alejarme o protegerme. Como estudiante de Ingeniería de Software, también revisé el código. Me llamó la atención el cuidado del proyecto. Voxara no reemplaza a un especialista, pero me dio algo que antes no tenía: saber de un vistazo si mis oídos están bien en este momento.",
    projectSlug: "voxara",
    consent: true,
    verified: true,
  },
  {
    id: "jhon-fredy-moran",
    name: "Jhon Fredy Moran Quetama",
    initials: "JM",
    relationship: "Amigo · Egresado de la UCC · Trabajamos juntos en proyectos",
    quote:
      "He tenido la oportunidad de trabajar con Jeferson y destaco su responsabilidad, puntualidad en las entregas y compromiso con cada proyecto. Se caracteriza por su buena organización, trabajo en equipo y capacidad para resolver problemas, aportando siempre al cumplimiento de los objetivos.",
    consent: true,
    verified: true,
  },
  {
    id: "jheiner-bladimir-ramirez",
    name: "Jheiner Bladimir Ramirez Figueroa",
    initials: "JR",
    relationship: "Amigo y compañero · Usuario de Elyndra",
    quote:
      "Quiero expresar mi sincero agradecimiento a mi compañero. Gracias a su iniciativa y a ELYNDRA, la aplicación que me recomendó, he podido jugar con mis otros compañeros y organizar mejor mi tiempo. Valoro enormemente su disposición para apoyar, enseñar y hacer el trabajo en equipo mucho más eficiente. ¡Excelente compañero y gran aporte!",
    projectSlug: "elyndra",
    consent: true,
    verified: true,
  },
];

export const publishableTestimonials = testimonials.filter((t) => t.consent && t.verified);

/** True when the section can be published (course minimum of verified, consented testimonials). */
export const testimonialsReady = publishableTestimonials.length >= MIN_TESTIMONIALS;
