// The home page only composes the section components, in the course guide's order:
// Menú → Bienvenida → (Presentación) → Acerca de mí → (Habilidades) → Mis proyectos →
// Testimonios → Experiencia → (Adicional) → Contacto → Pie de página.
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Presentacion from "@/components/Presentacion";
import AcercaDeMi from "@/components/AcercaDeMi";
import Habilidades from "@/components/Habilidades";
import Proyectos from "@/components/Proyectos";
import Testimonios from "@/components/Testimonios";
import Experiencia from "@/components/Experiencia";
import Adicional from "@/components/Adicional";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { isLocale } from "@/lib/i18n/config";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Navbar locale={locale} />
      <main id="contenido">
        <Hero locale={locale} />
        <Presentacion locale={locale} />
        <AcercaDeMi locale={locale} />
        <Habilidades locale={locale} />
        <Proyectos locale={locale} />
        <Testimonios locale={locale} />
        <Experiencia locale={locale} />
        <Adicional locale={locale} />
        <Contacto locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
