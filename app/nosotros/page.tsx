import type { Metadata } from "next";
import { site } from "@/content/site";
import { Icono, Seccion, TituloSeccion } from "@/components/ui";
import CtaFinal from "@/components/CtaFinal";

export const metadata: Metadata = {
  title: "Nosotros",
  description: site.nosotros.intro,
  alternates: { canonical: "/nosotros" },
};

export default function Nosotros() {
  return (
    <>
      {/* Encabezado */}
      <section className="bg-marca-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.14em] text-hielo-400 uppercase">
            Nosotros
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
            La representación de {site.fabricante.nombre} en Colombia
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-marca-200">
            {site.nosotros.intro}
          </p>
        </div>
      </section>

      {/* Cuerpo */}
      <Seccion>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {site.nosotros.cuerpo.map((parrafo, i) => (
                <p key={i} className="text-base leading-relaxed text-pretty text-slate-700">
                  {parrafo}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {site.nosotros.pilares.map((p) => (
                <div key={p.titulo} className="border-t-2 border-marca-600 pt-5">
                  <h2 className="font-semibold text-marca-900">{p.titulo}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ficha del fabricante */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-marca-900 text-hielo-400">
                <Icono nombre="snowflake" />
              </div>
              <h2 className="mt-4 font-semibold text-marca-900">
                {site.fabricante.nombre}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {site.fabricante.descripcion}
              </p>
              <dl className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
                <div>
                  <dt className="text-slate-500">Planta</dt>
                  <dd className="font-medium text-marca-900">
                    {site.fabricante.ciudad}, {site.fabricante.pais}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Representación</dt>
                  <dd className="font-medium text-marca-900">Colombia — {site.nombre}</dd>
                </div>
              </dl>
              <a
                href={site.fabricante.sitio}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-marca-700 hover:text-marca-800"
              >
                Sitio del fabricante
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </aside>
        </div>
      </Seccion>

      {/* Cómo trabajamos */}
      <Seccion fondo="gris">
        <TituloSeccion
          sobretitulo="Cómo trabajamos"
          titulo="Del requerimiento al equipo instalado"
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Levantamiento técnico",
              d: "Chasis, carrocería, número de pasajeros, ruta y condiciones de operación.",
            },
            {
              t: "Selección y cotización",
              d: "Definimos el modelo ARCO adecuado y entregamos la propuesta con tiempos de entrega.",
            },
            {
              t: "Importación",
              d: "Coordinamos el proceso con la fábrica en Brasil hasta la entrega en Colombia.",
            },
            {
              t: "Instalación y soporte",
              d: "Acompañamiento en montaje, puesta en marcha y suministro de repuestos.",
            },
          ].map((paso, i) => (
            <li key={paso.t}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marca-700 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-marca-900">{paso.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{paso.d}</p>
            </li>
          ))}
        </ol>
      </Seccion>

      <CtaFinal />
    </>
  );
}
