import { site, whatsappLink } from "@/content/site";
import { Boton } from "./ui";

export default function CtaFinal({
  titulo = "¿Necesita climatizar su flota?",
  texto = "Cuéntenos el chasis, la carrocería y el número de pasajeros. Le indicamos el equipo ARCO adecuado y le enviamos la cotización.",
}: {
  titulo?: string;
  texto?: string;
}) {
  return (
    <section className="bg-marca-900">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {titulo}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-marca-200">
              {texto}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Boton href="/contacto" variante="secundario">
              Solicitar cotización
            </Boton>
            <Boton href={whatsappLink()} variante="fantasma" externo>
              Escribir por WhatsApp
            </Boton>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-sm text-marca-300">
          {site.contacto.ciudad} · {site.contacto.telefono} · {site.contacto.email}
        </p>
      </div>
    </section>
  );
}
