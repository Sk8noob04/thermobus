import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { lineas, productos, productosPorLinea } from "@/content/products";
import { Boton, Icono, Seccion, TituloSeccion } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import CtaFinal from "@/components/CtaFinal";
import LogoArco from "@/components/LogoArco";

export default function Home() {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <>
      {/* ------------------------------------------------------------- HERO */}
      <section className="placeholder-tecnico relative isolate overflow-hidden">
        {/* Cuando llegue la fotografía oficial, reemplazar la clase
            `placeholder-tecnico` por un <Image fill> de fondo. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-marca-950 via-marca-900 to-marca-950 opacity-95"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-hielo-300 backdrop-blur">
              <Icono nombre="snowflake" className="h-3.5 w-3.5" />
              {site.tagline}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              {site.hero.titulo}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-marca-200">
              {site.hero.subtitulo}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Boton href={site.hero.ctaPrimario.href} variante="secundario">
                {site.hero.ctaPrimario.texto}
              </Boton>
              <Boton href={site.hero.ctaSecundario.href} variante="fantasma">
                {site.hero.ctaSecundario.texto}
              </Boton>
            </div>
          </div>

          {/* Sello de representación: la marca del fabricante como respaldo */}
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-8 text-center backdrop-blur sm:p-10">
            <LogoArco
              className="mx-auto h-auto w-full max-w-[320px]"
              invertido
              sizes="(max-width: 1024px) 320px, 340px"
              priority
            />
            <div className="mx-auto mt-7 h-px w-16 bg-hielo-400/50" aria-hidden="true" />
            <p className="mt-7 text-xl font-bold tracking-tight text-balance text-white sm:text-2xl">
              Representación oficial
              <br />
              en Colombia
            </p>
            <p className="mt-3 text-sm leading-relaxed text-marca-200">
              Tecnología brasileña fabricada por {site.fabricante.nombre} en{" "}
              {site.fabricante.ciudad}.
            </p>
          </div>
        </div>

        {/* Franja de datos */}
        <div className="border-t border-white/10 bg-marca-950/60 backdrop-blur">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-8 sm:grid-cols-4">
            {[
              { k: "70k – 240k", v: "BTU/h de capacidad" },
              { k: `${productos.length}`, v: "modelos disponibles" },
              { k: "4", v: "líneas de aplicación" },
              { k: "12V / 24V", v: "y chasis eléctrico" },
            ].map((item) => (
              <div key={item.v}>
                <dt className="text-2xl font-bold text-white sm:text-3xl">{item.k}</dt>
                <dd className="mt-1 text-xs text-marca-300 sm:text-sm">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------- DIFERENCIALES */}
      <Seccion>
        <TituloSeccion
          sobretitulo="Por qué Thermobus"
          titulo="Producto de fábrica, representante en Colombia"
          descripcion="Compra ARCO Climatização con acompañamiento técnico y comercial en Colombia."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.diferenciales.map((d) => (
            <div
              key={d.titulo}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-marca-50 text-marca-700">
                <Icono nombre={d.icono} />
              </div>
              <h3 className="mt-4 font-semibold text-marca-900">{d.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.texto}</p>
            </div>
          ))}
        </div>
      </Seccion>

      {/* ----------------------------------------------------------- LÍNEAS */}
      <Seccion fondo="gris">
        <TituloSeccion
          sobretitulo="Líneas de producto"
          titulo="Un equipo para cada tipo de operación"
          descripcion="Seleccionamos el modelo según el chasis, la carrocería, el número de pasajeros y las condiciones de la ruta."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lineas.map((linea) => {
            const items = productosPorLinea(linea.id);
            return (
              <Link
                key={linea.id}
                href={`/productos#${linea.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-marca-300 hover:shadow-lg"
              >
                <div className="relative aspect-16/9 border-b border-slate-100 bg-white">
                  <Image
                    src={`/productos/${items[0].slug}.png`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-3"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-marca-900 group-hover:text-marca-700">
                    {linea.nombre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {linea.descripcion}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-marca-700">
                    {items.length} {items.length === 1 ? "modelo" : "modelos"} →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Seccion>

      {/* -------------------------------------------------------- DESTACADOS */}
      <Seccion>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TituloSeccion
            sobretitulo="Catálogo"
            titulo="Equipos destacados"
            descripcion="Los modelos con mayor rotación en el mercado colombiano."
          />
          <Boton href="/productos" variante="primario">
            Ver catálogo completo
          </Boton>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      </Seccion>

      {/* --------------------------------------------------------- FABRICANTE */}
      <Seccion fondo="oscuro">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-hielo-400 uppercase">
              El fabricante
            </p>
            <LogoArco
              className="mt-5 h-auto w-full max-w-[380px]"
              invertido
              sizes="(max-width: 1024px) 300px, 380px"
            />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-marca-200">
              {site.fabricante.descripcion}
            </p>
            <p className="mt-4 text-sm text-marca-300">
              Planta en {site.fabricante.ciudad}, {site.fabricante.pais}.
            </p>
            <div className="mt-8">
              <Boton href="/nosotros" variante="fantasma">
                Conocer la representación
              </Boton>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Línea automotiva", d: "Diseño y fabricación especializados en transporte de pasajeros." },
              { t: "Estándares", d: "Producción bajo normas nacionales e internacionales." },
              { t: "Compresores", d: "Bitzer, Bock y TCCI según modelo y aplicación." },
              { t: "Opcionales", d: "Calefacción, defroster, renovación de aire, ventilador electrónico." },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-semibold text-white">{item.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-marca-300">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Seccion>

      <CtaFinal />
    </>
  );
}
