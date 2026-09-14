import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLinea,
  getProducto,
  productos,
  specsConValor,
  type Producto,
} from "@/content/products";
import { site, whatsappLink } from "@/content/site";
import { Boton, Icono } from "@/components/ui";
import CtaFinal from "@/components/CtaFinal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProducto(slug);
  if (!p) return { title: "Producto no encontrado" };

  const btu = p.specs.refrigeracion ? ` — ${p.specs.refrigeracion}` : "";
  return {
    title: `${p.modelo}${btu}`,
    description: p.descripcion,
    alternates: { canonical: `/productos/${p.slug}` },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const specs = specsConValor(producto);
  const relacionados = productos
    .filter((p) => p.slug !== producto.slug && p.lineas.some((l) => producto.lineas.includes(l)))
    .slice(0, 3);

  const mensajeWa = `Hola ${site.nombre}, me interesa el equipo ARCO ${producto.modelo}. ¿Me pueden enviar cotización?`;

  return (
    <>
      <article>
        {/* Encabezado */}
        <section className="bg-marca-950">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <nav aria-label="Ruta" className="text-sm text-marca-300">
              <Link href="/productos" className="transition-colors hover:text-white">
                Productos
              </Link>
              <span className="mx-2 text-marca-400">/</span>
              <span className="text-white">{producto.modelo}</span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-hielo-300">
                    {producto.tipo}
                  </span>
                  {producto.lineas.map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-marca-100"
                    >
                      {getLinea(l)?.nombre}
                    </span>
                  ))}
                </div>

                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
                  {producto.modelo}
                </h1>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-marca-200">
                  {producto.descripcion}
                </p>

                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                  {producto.specs.refrigeracion && (
                    <div>
                      <dt className="text-xs text-marca-300">Refrigeración</dt>
                      <dd className="mt-1 text-2xl font-bold text-white">
                        {producto.specs.refrigeracion}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-marca-300">Pasajeros</dt>
                    <dd className="mt-1 text-2xl font-bold text-white">
                      hasta {producto.pasajeros}
                    </dd>
                  </div>
                  {producto.specs.voltaje && (
                    <div>
                      <dt className="text-xs text-marca-300">Voltaje</dt>
                      <dd className="mt-1 text-2xl font-bold text-white">
                        {producto.specs.voltaje}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Boton href="/contacto" variante="secundario">
                    Solicitar cotización
                  </Boton>
                  <Boton href={whatsappLink(mensajeWa)} variante="fantasma" externo>
                    Consultar por WhatsApp
                  </Boton>
                </div>
              </div>

              {/* Imagen — pendiente del material oficial de ARCO.
                  Reemplazar por <Image src={`/productos/${producto.slug}.jpg`} ... /> */}
              <div className="placeholder-tecnico flex aspect-4/3 items-center justify-center rounded-xl border border-white/10">
                <Icono nombre="bus" className="h-20 w-20 text-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Ficha técnica */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold tracking-tight text-marca-900">
                  Datos técnicos
                </h2>

                {specs.length > 0 ? (
                  <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <tbody>
                        {specs.map(([etiqueta, valor], i) => (
                          <tr
                            key={etiqueta}
                            className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}
                          >
                            <th
                              scope="row"
                              className="w-1/2 px-5 py-3.5 text-left font-medium text-slate-600"
                            >
                              {etiqueta}
                            </th>
                            <td className="px-5 py-3.5 font-semibold text-marca-900">
                              {valor}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <p className="text-sm text-slate-600">
                      La ficha técnica de este modelo está disponible bajo solicitud.
                    </p>
                    <div className="mt-5">
                      <Boton href={whatsappLink(mensajeWa)} externo>
                        Solicitar ficha técnica
                      </Boton>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-500">
                  Especificaciones sujetas a cambio por parte del fabricante. Confirme
                  los datos vigentes al momento de la cotización.
                </p>
              </div>

              {/* Opcionales */}
              <aside>
                <h2 className="text-2xl font-bold tracking-tight text-marca-900">
                  Opcionales
                </h2>
                {producto.opcionales.length > 0 ? (
                  <ul className="mt-6 space-y-3">
                    {producto.opcionales.map((o) => (
                      <li key={o} className="flex gap-3 text-sm text-slate-700">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 shrink-0 text-marca-600"
                          aria-hidden="true"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-sm text-slate-600">
                    Consulte disponibilidad de opcionales para este modelo.
                  </p>
                )}

                <div className="mt-8 rounded-xl bg-marca-50 p-5">
                  <h3 className="text-sm font-semibold text-marca-900">
                    ¿Es el equipo correcto?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    La capacidad necesaria depende del chasis, la carrocería y la ruta.
                    Escríbanos y lo verificamos con usted.
                  </p>
                  <Link
                    href="/contacto"
                    className="mt-4 inline-block text-sm font-semibold text-marca-700 hover:text-marca-800"
                  >
                    Hablar con un asesor →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className="bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
              <h2 className="text-2xl font-bold tracking-tight text-marca-900">
                Otros equipos de la misma línea
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relacionados.map((p: Producto) => (
                  <Link
                    key={p.slug}
                    href={`/productos/${p.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-marca-300 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-marca-900 group-hover:text-marca-700">
                      {p.modelo}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                      {p.specs.refrigeracion || "Ficha bajo solicitud"} · hasta{" "}
                      {p.pasajeros} pasajeros
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaFinal />
    </>
  );
}
