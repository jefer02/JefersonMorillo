# Checklist de entrega

Estado al 25 de octubre de 2026. ✅ cumplido · ⚠️ cumplido en código, falta un dato tuyo · ❌ falta para poder entregar.

## Checklist final de la guía del curso (Paso 5)

| Ítem de la guía | Estado | Dónde se cumple |
|---|---|---|
| Proyecto en Next.js + TypeScript (create-next-app con --typescript) | ✅ | Next.js 16.4.3, TypeScript estricto, App Router (`app/page.tsx`) |
| Estilos con Tailwind CSS (clases utilitarias y responsive) | ✅ | Tailwind v4, utilidades en JSX con `md:` / `lg:`; tokens en `app/globals.css` |
| 1. Menú de navegación (logo, tu nombre o tus iniciales) | ✅ | `components/Navbar.tsx`: sello JM + «Jeferson Morillo», enlaces a todas las secciones, fijo arriba, menú «Índice» en celular, scroll suave |
| 2. Bienvenida / Hero con CV (botón «Descargar CV») | ✅ | `components/Hero.tsx`: botón con `download` hacia `public/cv/CV-Jeferson-Morillo.pdf` (PDF real, generado del contenido) |
| 3. Acerca de mí (párrafo de presentación personal) | ⚠️ | `components/AcercaDeMi.tsx`: párrafo redactado con tus datos, pendiente de tu aprobación |
| 4. Mis proyectos (link a GitHub + link a Vercel / demo) | ⚠️ | `components/Proyectos.tsx`: 6 proyectos, todos con «Repositorio en GitHub» y «Ver demo». Faltan las demos de Voxara, LAAF y la URL de Vercel del Vol. 0 (se ven como «próximamente») |
| 5. Testimonios (mínimo 3) | ❌ | `components/Testimonios.tsx` listo y con validación; faltan 3 testimonios reales verificados (`docs/pedir-testimonios.md`). Sin ellos la sección no se publica |
| 6. Experiencia académica 🎓 y laboral 💼 | ⚠️ | `components/Experiencia.tsx`: académica (UCC + 2 cursos Cisco) y proyectos. Falta tu experiencia laboral, o tu confirmación de que no tienes |
| 7. Contactos (correo electrónico) | ✅ | `components/Contacto.tsx`: correo visible con `mailto` y botón para copiarlo, GitHub, LinkedIn y formulario validado con expresiones regulares |
| 8. Pie de página (tu nombre y © año) | ✅ | `components/Footer.tsx`: «© 2026 Jeferson Morillo» (año del build), colofón, enlaces rápidos, redes, volver arriba, «Hecho con Next.js + Tailwind CSS» |
| Sección adicional (al menos 1 extra) | ✅ | Tres: Origen (`Origen.tsx`), Habilidades (`Habilidades.tsx`) y Adicional / Epílogo (`Adicional.tsx`) |
| Se ve bien en celular (diseño responsive) | ✅ | Revisado a 375, 768 y 1440 px en ambos temas, sin scroll horizontal |
| Código subido a GitHub (repositorio con commits) | ❌ | Lo haces tú: ver README → «Publicar en GitHub y Vercel» |
| Publicado en Vercel (URL pública funcionando) | ❌ | Lo haces tú: ver README. El build pasa sin variables de entorno |

## Recomendaciones de las diapositivas (docs/guia-curso.md)

| Recomendación | Estado | Nota |
|---|---|---|
| R17 · Menú fijo, hamburguesa en celular, scroll suave | ✅ | Header `sticky`, botón «Índice», Lenis + `scroll-behavior` |
| R18 · Hero: rol/perfil y botón secundario (Ver proyectos o Contacto) | ✅ | «Desarrollador de software», «Ver proyectos» y «Contactar» |
| R19 · Acerca de mí: foto, datos rápidos (ubicación, semestre, intereses) | ⚠️ | Ficha del protagonista con ubicación, estudios e intereses; faltan foto y semestre |
| R20 · Proyectos: tarjeta con imagen, etiquetas de tecnologías, enlaces en otra pestaña, grid 1 / 2–3 columnas | ✅ | Portadas generadas (sin capturas aún), etiquetas, `target="_blank"`, grid 1 / 2 / 3 |
| R21 · Testimonios: nombre, cargo o relación, foto opcional | ✅ | Modelo `Testimonial` con `role`, `relationship`, `avatar` opcional |
| R22 · Experiencia: fechas, institución, logros, de lo más reciente a lo más antiguo | ✅ | Ordenado en código (`lib/experience.ts`) |
| R23 · Contacto: formulario con validación y mensaje de confirmación | ✅ | Validación con regex en cliente y servidor, mensaje «Carta enviada» |
| R24 · Pie de página: redes, enlaces rápidos, volver arriba, créditos | ✅ | |

## Requisitos de Jeferson (R1–R16)

| # | Estado | Nota |
|---|---|---|
| R1 Next.js + TS + Tailwind, Vercel desde GitHub | ⚠️ | Falta el despliegue (tú) |
| R2 Hero con foto y bienvenida corta | ⚠️ | Bienvenida de 22 palabras; falta la foto (se ve el sello JM) |
| R3 «Descargar CV» con PDF real | ✅ | Generado con `npm run cv` |
| R4 Acerca de mí: vida fuera de la ingeniería | ⚠️ | Párrafo e historias paralelas redactados con tus datos; pendientes de aprobación y tus frases del estante |
| R5 Habilidades sin barras, frameworks y no lenguajes | ✅ | Validado en `content/schema.ts` |
| R6 Orgullo de origen | ✅ | Capítulo Origen (El Contadero → Pasto), temas Día de Blancos / Día de Negros, colofón |
| R7 Etiqueta «Actualmente estudiando» | ✅ | Portada, experiencia (UCC) y colofón |
| R8 Testimonios reales, mínimo 3 | ❌ | Pendientes |
| R9 Experiencia de lo más reciente a lo más antiguo | ✅ | |
| R10 Formulario validado con expresiones regulares | ✅ | `lib/validation/patterns.ts`, 46 pruebas en Vitest |
| R11 Redes solo técnicas, sin WhatsApp | ✅ | GitHub y LinkedIn |
| R12 Sección Adicional creativa, sin barras | ✅ | Epílogo del autor |
| R13 Única y creativa, 2D/3D | ✅ | Escena 3D (tablet/escritorio), SVG en celular |
| R14 Un componente por sección; `page.tsx` en el orden de la guía | ✅ | |
| R15 Responsive 375 / 768 / 1440 | ✅ | |
| R16 Repo con commits + URL pública | ❌ | Lo haces tú |

## Para poder entregar

1. Conseguir 3 testimonios reales (`docs/pedir-testimonios.md`).
2. Aprobar los textos de Origen y Acerca de mí, enviar tus frases del estante y tu foto.
3. Confirmar tu experiencia laboral (o «ninguna por ahora»).
4. Hacer commit, push e importar en Vercel; luego poner la URL en el Vol. 0.
