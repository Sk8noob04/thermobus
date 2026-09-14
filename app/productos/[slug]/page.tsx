import type { Metadata } from "next";
import Image from "next/image";
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
import { Boton } from "@/components/ui";
import CtaFinal from "@/components/CtaFinal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProducto(slug);
  if (!p) return { title: "Producto no encontrado" };

  return {
    title: `${p.modelo} — ${p.specs.capacidad}`,
    description: p.descripcion,
    alternates: { canonical: `/productos/${p.slug}` },
    openGraph: { images: [`/productos/${p.slug}.png`] },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const specs = specsConValor(producto);
  const linea = getLinea(producto.linea);
  const relacionados = productos
    .filter((p) => p.slug !== producto.slug && p.linea === producto.linea)
    .slice(0, 3);

  const mensajeWa = `Hola ${site.nombre}, me interesa el equipo ARCO ${producto.modelo} (${producto.specs.capacidad}). ¿Me pueden enviar cotización?`;

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
                {linea && (
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-hielo-300">
                    {linea.nombre}
                  </span>
                )}

                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
                  {producto.modelo}
                </h1>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-marca-200">
                  {producto.descripcion}
                </p>

                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                  <div>
                    <dt className="text-xs text-marca-300">Capacidad</dt>
                    <dd className="mt-1 text-2xl font-bold text-white tabular-nums">
                      {producto.specs.capacidad}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-marca-300">Caudal de aire</dt>
                    <dd className="mt-1 text-2xl font-bold text-white tabular-nums">
                      {producto.specs.caudal}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-marca-300">Tensión</dt>
                    <dd className="mt-1 text-2xl font-bold text-white">
                      {producto.specs.tension}
                    </dd>
                  </div>
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

              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-white">
                <Image
                  src={`/productos/${producto.slug}.png`}
                  alt={`Aire acondicionado ARCO ${producto.modelo}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
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

                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map(([etiqueta, valor], i) => (
                        <tr key={etiqueta} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                          <th
                            scope="row"
                            className="w-1/2 px-5 py-3.5 text-left font-medium text-slate-600"
                          >
                            {etiqueta}
                          </th>
                          <td className="px-5 py-3.5 font-semibold text-marca-900 tabular-nums">
                            {valor}
                            {etiqueta.startsWith("Dimensiones") && producto.nota && (
                              <span className="ml-2 font-normal text-slate-500">
                                ({producto.nota.toLowerCase()})
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Especificaciones sujetas a cambio por parte del fabricante. Confirme
                  los datos vigentes al momento de la cotización.
                </p>
              </div>

              <aside>
                <div className="rounded-xl bg-marca-50 p-6">
                  <h2 className="font-semibold text-marca-900">
                    ¿Es el equipo correcto?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    La capacidad necesaria depende del chasis, la carrocería, el número
                    de pasajeros y las condiciones de la ruta. Escríbanos con esos datos
                    y lo verificamos con usted antes de cotizar.
                  </p>
                  <Link
                    href="/contacto"
                    className="mt-4 inline-block text-sm font-semibold text-marca-700 hover:text-marca-800"
                  >
                    Hablar con un asesor →
                  </Link>
                </div>

                <div className="mt-6 rounded-xl border border-slate-200 p-6">
                  <h2 className="font-semibold text-marca-900">Fabricante</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {site.fabricante.nombre} — {site.fabricante.ciudad},{" "}
                    {site.fabricante.pais}. Cada componente está diseñado a la medida del
                    vehículo, garantizando integración, eficiencia y confiabilidad.
                  </p>
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
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-marca-300 hover:shadow-md"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-white">
                      <Image
                        src={`/productos/${p.slug}.png`}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-marca-900 group-hover:text-marca-700">
                        {p.modelo}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-600 tabular-nums">
                        {p.specs.capacidad}
                      </p>
                    </div>
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
