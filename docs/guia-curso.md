# Guía del curso — "Construye tu Portafolio personal"

Fuente: https://structure-portfolio.vercel.app (Diseño de Interfaces · Entrega Proyecto). Extraído literalmente de los datos de las diapositivas (app.js), el 2026-10-25.

Los ítems marcados **· obligatorio** son los que la guía marca como obligatorios.

## 1. Menú de navegación

- **Archivo sugerido:** `components/Navbar.tsx`
- **Propósito:** Es la barra superior que permite moverse por todo el portafolio. Debe estar siempre visible y llevar a cada sección con un clic.

**Debe incluir:**

- Logo, tu nombre o tus iniciales
- Enlaces a todas las secciones (anclas #id)
- Fijo arriba al hacer scroll (sticky)
- Menú hamburguesa en celular
- Scroll suave hacia cada sección

> Tip: Agrega `className="scroll-smooth"` a la etiqueta `` en `app/layout.tsx` y pon un `id` a cada sección.

## 2. Bienvenida / Hero con CV

- **Archivo sugerido:** `components/Hero.tsx`
- **Propósito:** Es la primera impresión: en segundos el visitante debe saber quién eres, qué haces y poder descargar tu hoja de vida.

**Debe incluir:**

- Tu nombre bien visible (título grande)
- Tu rol o perfil: ej. Desarrollador/a Frontend
- Foto o avatar
- Frase corta que te describa
- Botón «Descargar CV» **· obligatorio**
- Botón secundario: Ver proyectos o Contacto

> Tip: Guarda tu hoja de vida en `public/cv.pdf`. Un enlace con `href="/cv.pdf"` y el atributo `download` la descarga directamente.

## 3. Acerca de mí

- **Archivo sugerido:** `components/About.tsx`
- **Propósito:** Cuenta tu historia: quién eres, qué estudias, qué te apasiona y qué sabes hacer.

**Debe incluir:**

- Párrafo de presentación personal
- Foto o ilustración
- Habilidades / tecnologías que manejas
- Datos rápidos: ubicación, semestre, intereses
- Texto cercano y sin errores de ortografía

> Tip: Escribe en primera persona y en 3–5 líneas. Menos es más: que se pueda leer en 20 segundos.

## 4. Mis proyectos

- **Archivo sugerido:** `components/Projects.tsx + data/projects.ts`
- **Propósito:** La sección más importante: demuestra lo que sabes hacer. Cada proyecto debe poder verse en vivo y su código en GitHub.

**Debe incluir:**

- Tarjeta por proyecto: imagen, título y descripción
- Tecnologías usadas (etiquetas)
- Link a GitHub (repositorio) **· obligatorio**
- Link a Vercel / Demo en vivo **· obligatorio**
- Grid responsive: 1 columna en móvil, 2–3 en escritorio
- Abrir enlaces en otra pestaña (target="_blank")

> Tip: Guarda tus proyectos en un arreglo tipado en `data/projects.ts` y recórrelo con `.map()`: agregar un proyecto será agregar un objeto.

## 5. Testimonios

- **Archivo sugerido:** `components/Testimonials.tsx`
- **Propósito:** Opiniones de otras personas sobre tu trabajo: profesores, compañeros, clientes o jefes. Generan confianza.

**Debe incluir:**

- Mínimo 3 testimonios **· obligatorio**
- Nombre de la persona
- Cargo o relación contigo (Profesor, Compañera…)
- Foto o avatar
- Texto del testimonio
- Opcional: estrellas, carrusel o grid

> Tip: Crea un tipo `Testimonial` en TypeScript y guarda los testimonios en un arreglo de al menos 3 elementos.

## 6. Experiencia académica y laboral

- **Archivo sugerido:** `components/Experience.tsx`
- **Propósito:** Muestra tu trayectoria en dos partes: lo que has estudiado (académica) y dónde has trabajado o hecho prácticas (laboral).

**Debe incluir:**

- Experiencia académica 🎓 (universidad, cursos) **· obligatorio**
- Experiencia laboral 💼 (empleos, prácticas, freelance) **· obligatorio**
- Fechas de inicio y fin
- Institución o empresa + cargo / título
- Breve descripción de logros
- Orden: de lo más reciente a lo más antiguo

> Tip: Una línea de tiempo vertical se logra con `border-l-2` en la lista y un punto con posición absoluta en cada elemento.

## 7. Contactos

- **Archivo sugerido:** `components/Contact.tsx`
- **Propósito:** Facilita que te escriban: un formulario y/o tus medios de contacto directos.

**Debe incluir:**

- Correo electrónico
- LinkedIn y GitHub
- Teléfono / WhatsApp (opcional)
- Formulario: nombre, correo y mensaje
- Validación de campos (required, type="email")
- Mensaje de confirmación al enviar

> Tip: Para que el formulario envíe correos sin backend puedes usar servicios como Formspree o EmailJS. Un formulario con estado necesita `"use client"`.

## 8. Pie de página

- **Archivo sugerido:** `components/Footer.tsx`
- **Propósito:** Cierra la página. Repite lo esencial y ofrece una salida rápida a tus redes.

**Debe incluir:**

- Tu nombre y © año
- Íconos de redes sociales
- Enlaces rápidos a las secciones
- Botón «volver arriba»
- Créditos: Hecho con Next.js + Tailwind

> Tip: Usa `new Date().getFullYear()` para que el año se actualice solo.

## ⭐ Sección adicional (tú eliges)

- **Archivo sugerido:** `components/Skills.tsx (ejemplo)`
- **Propósito:** ¡Tu toque personal! Agrega una o más secciones que te diferencien. Ubícala antes del pie de página.

**Debe incluir:**

- Al menos 1 sección extra **· obligatorio**
- Que aporte valor y se vea integrada al diseño
- Ideas: Habilidades, Certificados, Blog, Idiomas
- Ideas: Modo oscuro, Logros, Servicios, Galería
- Ubícala en un orden lógico (antes del footer)

> Tip: Crea un componente nuevo, por ejemplo `components/Skills.tsx`, e impórtalo en `app/page.tsx` antes del ``.

## Orden de la página según la guía

nav → hero → about → projects → testi → exp → contact → extra → footer (la sección adicional se ubica "en un orden lógico (antes del footer)").
