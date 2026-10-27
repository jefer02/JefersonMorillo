# Crónica de Atriz — Vol. 1

Portafolio personal de **Jeferson Morillo**, estudiante de Ingeniería de Software en la Universidad Cooperativa de Colombia (UCC), campus Pasto. Proyecto final del curso **Diseño de Interfaces** ("Entrega Proyecto").

El sitio está diseñado como el primer volumen de una novela ligera: la portada (Bienvenida), el índice (menú), los capítulos (secciones), el epílogo del autor (Adicional) y el colofón (pie de página), con los colores del barniz de Pasto y el Galeras.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + TypeScript estricto
- Tailwind CSS v4 (tokens en `app/globals.css` con `@theme`)
- React Three Fiber (escena 3D de la portada, carga diferida) · GSAP + Lenis (scroll) · cmdk (paleta de comandos)
- zod (validación de contenido y del formulario) · Resend (correo de contacto)
- Vitest (expresiones regulares) · Playwright (pruebas de humo y generación del CV)
- Despliegue en Vercel

## Ejecutar en local

Requiere Node.js 20.9 o superior.

```bash
npm install
npm run dev          # http://localhost:3000
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Valida el contenido (`check:content`) y compila para producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` · `npm run typecheck` | ESLint y TypeScript |
| `npm test` | Pruebas de las expresiones regulares del formulario (Vitest) |
| `npm run test:e2e` | Pruebas de humo con Playwright (con el sitio corriendo; usa `E2E_BASE_URL`) |
| `npm run cv` | Genera `public/cv/CV-Jeferson-Morillo.pdf` desde la ruta `/cv` (con el sitio corriendo; usa `CV_BASE_URL`, por defecto `http://localhost:3000`) |
| `npm run check:content` | Valida `content/` y lista los `TODO(jeferson)` pendientes |

## Estructura

```
app/page.tsx              # solo compone las secciones, en el orden de la guía
components/               # un componente por sección:
  Navbar  Hero  Origen  AcercaDeMi  Habilidades  Proyectos
  Testimonios  Experiencia  Adicional  Contacto  Footer
  fx/  ui/  three/  system/   # piezas de apoyo (círculo mágico, sigilos, índice…)
content/                  # TODO el contenido del sitio, tipado
types/                    # tipos de proyectos, testimonios, experiencia…
lib/validation/           # expresiones regulares del formulario (cliente y servidor)
app/volumenes/[slug]/     # caso de estudio de cada proyecto
app/cv/                   # versión imprimible del CV (se convierte en PDF)
docs/                     # brief, guía del curso, checklist de entrega, cómo pedir testimonios
```

## Editar el contenido

Todo está en `content/`. Los datos que faltan están marcados con `todo("…")` y se ven como un sello rojo `TODO(jeferson)` en desarrollo; en producción no se muestran. `npm run check:content` los lista todos.

- **Agregar un proyecto:** añade un objeto a `content/projects.ts` (número de volumen único, `repo` y `demo`). Las imágenes van en `public/projects/<slug>/` y se registran en `cover` y `gallery`.
- **Agregar una experiencia:** añade una entrada a `content/experience.ts` con `kind: "academico" | "laboral" | "proyecto"`. El orden (de lo más reciente a lo más antiguo) se calcula solo.
- **Agregar un testimonio:** sigue `docs/pedir-testimonios.md`. Solo se publica con `consent: true` y `verified: true`, y la sección aparece cuando hay al menos 3.
- **Habilidades:** solo frameworks, librerías y herramientas (nunca lenguajes), en `content/skills.ts`. Cada una debe enlazar al menos un proyecto.
- **Foto de perfil:** deja la foto en `_material/` y pídele a Claude que la procese (recorte cuadrado y metadatos eliminados), o ponla en `public/images/profile.jpg` y registra sus dimensiones en `content/profile.ts` (`photo`).
- **CV:** después de cambiar el contenido, corre el sitio y `npm run cv` para regenerar el PDF. Súbelo con tu commit: el build falla si falta.

## Publicar en GitHub y Vercel

Estos pasos los haces tú (el repositorio ya tiene `origin` en `https://github.com/jefer02/JefersonMorillo.git`).

1. Revisa los cambios:
   ```bash
   git status
   git diff
   ```
2. Haz tu commit y súbelo:
   ```bash
   git add .
   git commit -m "Portafolio Crónica de Atriz"
   git push -u origin main
   ```
3. En [vercel.com/new](https://vercel.com/new), importa el repositorio `jefer02/JefersonMorillo`. Vercel detecta Next.js solo; no cambies los comandos.
4. Opcional, para que el formulario envíe correos: en **Settings → Environment Variables** agrega las variables de `.env.example` (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Sin ellas el sitio funciona igual y el formulario ofrece el enlace `mailto`.
5. **Deploy.** Luego, en **Settings → Domains**, cambia el subdominio a `jeferson-morillo.vercel.app`.
6. Cuando tengas la URL, ponla en `content/projects.ts` (demo del Vol. 0) y confirma `siteUrl` en `content/profile.ts`. Cada `git push` publica una nueva versión.

Entregables del curso: la URL del repositorio en GitHub y la URL pública `.vercel.app`.

## Créditos

Diseño y código: Jeferson Morillo. Fuentes: Shippori Mincho B1, Zen Kaku Gothic New, Klee One y JetBrains Mono (SIL Open Font License; las tres primeras como subconjuntos propios en `app/fonts/`). Todas las ilustraciones, runas y sigilos son originales y se generan en código. Inspirado en el género isekai; no usa personajes, arte ni material de ninguna obra.
