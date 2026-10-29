# Jeferson Morillo — Portafolio

Portafolio personal de **Jeferson Morillo**, estudiante de Ingeniería de Software en la Universidad Cooperativa de Colombia (UCC), campus Pasto. Proyecto final del curso **Diseño de Interfaces** ("Entrega Proyecto").

Los textos son profesionales y las secciones usan nombres simples (Presentación, Acerca de mí, Habilidades, Proyectos, Testimonios, Experiencia, Adicional, Contacto). El toque de novela ligera está solo en lo visual: el círculo mágico alrededor de la foto, la franja roja, la tipografía serif, los sigilos y el estante de libros, con los colores del barniz de Pasto y el Galeras.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + TypeScript estricto
- Tailwind CSS v4 (tokens en `app/globals.css` con `@theme`)
- React Three Fiber (escena 3D del inicio, carga diferida) · GSAP + Lenis (scroll) · cmdk (paleta de comandos)
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
| `npm run cv` | Genera los dos CV, `public/cv/CV-Jeferson-Morillo.pdf` (español, desde `/es/cv`) y `public/cv/CV-Jeferson-Morillo-EN.pdf` (inglés, desde `/en/cv`), con el sitio corriendo (usa `CV_BASE_URL`, por defecto `http://localhost:3000`) |
| `npm run check:content` | Valida `content/` y lista los `TODO(jeferson)` pendientes |

## Estructura

```
app/[locale]/page.tsx     # solo compone las secciones, en el orden de la guía (/es y /en)
components/               # un componente por sección:
  Navbar  Hero  Presentacion  AcercaDeMi  Habilidades  Proyectos
  Testimonios  Experiencia  Adicional  Contacto  Footer
  fx/  ui/  three/  system/   # piezas de apoyo (círculo mágico, sigilos, menú…)
content/                  # TODO el contenido del sitio, tipado
types/                    # tipos de proyectos, testimonios, experiencia…
lib/validation/           # expresiones regulares del formulario (cliente y servidor)
app/[locale]/proyectos/[slug]/  # caso de estudio de cada proyecto (las URL /volumenes/* redirigen aquí)
app/[locale]/cv/          # versión imprimible del CV en cada idioma (se convierte en PDF)
proxy.ts                  # manda las rutas sin idioma a /es (o al idioma que elegiste)
lib/i18n/                 # idiomas, textos de la interfaz (messages.ts) y ayudas de rutas
docs/                     # brief, guía del curso, checklist de entrega, cómo pedir testimonios
```

## Editar el contenido

Todo está en `content/`. Los datos que faltan están marcados con `todo("…")` y se ven como un sello rojo `TODO(jeferson)` en desarrollo; en producción no se muestran. `npm run check:content` los lista todos.

- **Agregar un proyecto:** añade un objeto a `content/projects.ts` (número de proyecto único en `volume`, `repo` y `demo`). Las imágenes van en `public/projects/<slug>/` y se registran en `cover` y `gallery`.
- **Agregar una experiencia:** añade una entrada a `content/experience.ts` con `kind: "academico" | "laboral" | "proyecto"`. El orden (de lo más reciente a lo más antiguo) se calcula solo.
- **Agregar un testimonio:** sigue `docs/pedir-testimonios.md`. Solo se publica con `consent: true` y `verified: true`, y la sección aparece cuando hay al menos 3.
- **Habilidades:** solo frameworks, librerías y herramientas (nunca lenguajes), en `content/skills.ts`. Cada una debe enlazar al menos un proyecto.
- **Foto de perfil:** deja la foto en `_material/` y pídele a Claude que la procese (recorte cuadrado y metadatos eliminados), o ponla en `public/images/profile.jpg` y registra sus dimensiones en `content/profile.ts` (`photo`).
- **Inglés:** el sitio está en español (`/es`, por defecto) e inglés (`/en`). El texto en inglés del contenido va en `content/en.ts`, con la misma clave (slug o id) que en español; los textos de la interfaz, en `lib/i18n/messages.ts`. `npm run check:content` avisa si falta una traducción. Los testimonios no se traducen.
- **CV:** después de cambiar el contenido, corre el sitio y `npm run cv` para regenerar los dos PDF. Súbelos con tu commit: el build falla si falta alguno.

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
   git commit -m "Portafolio de Jeferson Morillo"
   git push -u origin main
   ```
3. En [vercel.com/new](https://vercel.com/new), importa el repositorio `jefer02/JefersonMorillo`. Vercel detecta Next.js solo; no cambies los comandos.
4. Opcional, para que el formulario envíe correos: en **Settings → Environment Variables** agrega las variables de `.env.example` (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Sin ellas el sitio funciona igual y el formulario ofrece el enlace `mailto`.
5. **Deploy.** Luego, en **Settings → Domains**, cambia el subdominio a `jeferson-morillo.vercel.app`.
6. Cuando tengas la URL, ponla en `content/projects.ts` (demo del proyecto `jeferson-morillo`, el portafolio) y confirma `siteUrl` en `content/profile.ts`. Cada `git push` publica una nueva versión.

Entregables del curso: la URL del repositorio en GitHub y la URL pública `.vercel.app`.

## Créditos

Diseño y código: Jeferson Morillo. Fuentes: Shippori Mincho B1, Zen Kaku Gothic New, Klee One y JetBrains Mono (SIL Open Font License; las tres primeras como subconjuntos propios en `app/fonts/`). Todas las ilustraciones, runas y sigilos son originales y se generan en código; las runas son un alfabeto propio que se puede leer (`docs/runas.md`). Inspirado en el género isekai; no usa personajes, arte ni material de ninguna obra.
