import type { Metadata } from "next";
import { lineas, productosPorLinea } from "@/content/products";
import { Seccion } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import CtaFinal from "@/components/CtaFinal";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de aire acondicionado ARCO para buses urbanos, intermunicipales, articulados, doble piso y microbuses. De 60.000 a 240.000 BTU/h.",
  alternates: { canonical: "/productos" },
};

export default function Productos() {
  return (
    <>
      <section className="bg-marca-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.14em] text-hielo-400 uppercase">
            Catálogo
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
            Aire acondicionado ARCO para transporte de pasajeros
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-marca-200">
            De 70.000 a 240.000 BTU/h. Equipos de techo, con condensador separado y
            para chasis eléctrico, en 12V y 24V.
          </p>

          <nav className="mt-9 flex flex-wrap gap-2" aria-label="Líneas de producto">
            {lineas.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-marca-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.nombre}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {lineas.map((linea, i) => {
        const items = productosPorLinea(linea.id);
        return (
          <Seccion key={linea.id} fondo={i % 2 === 0 ? "blanco" : "gris"}>
            <div id={linea.id} className="scroll-mt-28">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.14em] text-marca-600 uppercase">
                  Línea {linea.nombre}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance text-marca-900 sm:text-4xl">
                  {linea.titulo}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-pretty text-slate-600">
                  {linea.descripcion}
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug} producto={p} />
                ))}
              </div>
            </div>
          </Seccion>
        );
      })}

      <CtaFinal
        titulo="¿No sabe cuál equipo necesita?"
        texto="Envíenos la ficha del bus y le recomendamos el modelo, con la capacidad en BTU/h adecuada para su operación."
      />
    </>
  );
}
