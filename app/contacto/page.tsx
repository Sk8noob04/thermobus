import type { Metadata } from "next";
import { site, whatsappLink } from "@/content/site";
import FormularioContacto from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Solicite cotización de aire acondicionado ARCO para buses en Colombia. ${site.contacto.ciudad}.`,
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  const items = [
    {
      etiqueta: "WhatsApp",
      valor: site.contacto.telefono,
      href: whatsappLink(),
      externo: true,
    },
    {
      etiqueta: "Teléfono",
      valor: site.contacto.telefono,
      href: `tel:${site.contacto.telefono.replace(/\s/g, "")}`,
    },
    {
      etiqueta: "Correo",
      valor: site.contacto.email,
      href: `mailto:${site.contacto.email}`,
    },
  ];

  return (
    <>
      <section className="bg-marca-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.14em] text-hielo-400 uppercase">
            Contacto
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
            Hablemos de su flota
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-marca-200">
            Cuéntenos qué vehículo necesita climatizar y le indicamos el equipo ARCO
            adecuado, con cotización y tiempos de entrega.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-5">
            {/* Formulario */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold tracking-tight text-marca-900">
                Solicitar cotización
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Los campos marcados con <span className="text-marca-600">*</span> son
                obligatorios.
              </p>
              <div className="mt-8">
                <FormularioContacto />
              </div>
            </div>

            {/* Datos de contacto */}
            <aside className="lg:col-span-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-marca-900">
                  Datos de contacto
                </h2>

                <dl className="mt-6 space-y-5">
                  {items.map((item) => (
                    <div key={item.etiqueta}>
                      <dt className="text-xs tracking-wide text-slate-500 uppercase">
                        {item.etiqueta}
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={item.href}
                          {...(item.externo
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="font-medium break-all text-marca-800 hover:text-marca-600"
                        >
                          {item.valor}
                        </a>
                      </dd>
                    </div>
                  ))}

                  <div>
                    <dt className="text-xs tracking-wide text-slate-500 uppercase">
                      Ubicación
                    </dt>
                    <dd className="mt-1 font-medium text-marca-800">
                      {site.contacto.ciudad}
                      {site.contacto.direccion && (
                        <span className="block text-sm font-normal text-slate-600">
                          {site.contacto.direccion}
                        </span>
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs tracking-wide text-slate-500 uppercase">
                      Horario
                    </dt>
                    <dd className="mt-1 font-medium text-marca-800">
                      {site.contacto.horario}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-semibold text-marca-900">Fabricante</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {site.fabricante.nombre} — {site.fabricante.ciudad},{" "}
                    {site.fabricante.pais}. Thermobus es su representación comercial en
                    Colombia.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
