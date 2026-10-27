# Cómo pedir un testimonio

La guía del curso exige **mínimo 3 testimonios** reales. Envía este mensaje (por WhatsApp, correo o en persona) a docentes, compañeros de equipo (por ejemplo, en LAAF o AloMedia) o personas con las que hayas trabajado. Ajusta el saludo y el proyecto.

---

> Hola, [nombre]. ¿Cómo estás?
>
> Estoy terminando mi portafolio para la materia de Diseño de Interfaces y me encantaría incluir unas palabras tuyas sobre cómo fue trabajar conmigo en [materia / proyecto].
>
> Si te parece bien, ¿me podrías escribir:
>
> 1. **Un testimonio corto** (entre 25 y 70 palabras, unas 3 o 4 líneas), con tus propias palabras: qué hicimos juntos y qué destacarías de mí.
> 2. **Tu nombre completo** y **tu cargo o rol** (por ejemplo, «Docente de Ingeniería de Software, UCC» o «Compañero de equipo en LAAF»).
> 3. Si quieres, el enlace a tu **LinkedIn** y una **foto** (son opcionales).
>
> Lo publicaré en mi portafolio en [jeferson-morillo.vercel.app]. ¿Me confirmas que **estás de acuerdo con que lo publique** con tu nombre?
>
> ¡Muchas gracias!
> Jeferson

---

## Cuando te respondan

Agrega cada testimonio en `content/testimonials.ts` copiando exactamente lo que te escribieron (sin editarlo):

```ts
{
  id: "nombre-apellido",
  name: "Nombre Apellido",
  role: "Docente de Ingeniería de Software, UCC",
  relationship: "Fue mi docente de Diseño de Software",
  quote: "El texto tal como te lo enviaron.",
  link: "https://www.linkedin.com/in/…", // opcional
  consent: true,  // la persona aceptó que se publique
  verified: true, // confirmas que es real y aprobado
},
```

Borra los tres marcadores de posición (`placeholder-…`). La sección **Testimonios** aparece en producción solo cuando hay 3 o más entradas con `consent: true` y `verified: true`; mientras tanto, `npm run build` muestra una advertencia.
