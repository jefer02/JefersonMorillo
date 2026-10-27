// The home page only composes the section components, in the course guide's order:
// Menú → Bienvenida → (Origen) → Acerca de mí → (Habilidades) → Mis proyectos →
// Testimonios → Experiencia → (Adicional) → Contacto → Pie de página.
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Origen from "@/components/Origen";
import AcercaDeMi from "@/components/AcercaDeMi";
import Habilidades from "@/components/Habilidades";
import Proyectos from "@/components/Proyectos";
import Testimonios from "@/components/Testimonios";
import Experiencia from "@/components/Experiencia";
import Adicional from "@/components/Adicional";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Origen />
        <AcercaDeMi />
        <Habilidades />
        <Proyectos />
        <Testimonios />
        <Experiencia />
        <Adicional />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
