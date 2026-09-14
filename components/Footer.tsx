import Link from "next/link";
import { site } from "@/content/site";
import Logo from "./Logo";

export default function Footer() {
  const anio = new Date().getFullYear();
  const redes = Object.entries(site.redes).filter(([, url]) => url !== "");

  return (
    <footer className="bg-marca-950 text-marca-200">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Logo className="h-9 w-auto" invertido />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-marca-300">
              {site.descripcion}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-white">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>{site.contacto.ciudad}</li>
              {site.contacto.direccion && <li>{site.contacto.direccion}</li>}
              <li>
                <a
                  href={`tel:${site.contacto.telefono.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {site.contacto.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contacto.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {site.contacto.email}
                </a>
              </li>
            </ul>

            {redes.length > 0 && (
              <ul className="mt-5 flex gap-4 text-sm">
                {redes.map(([nombre, url]) => (
                  <li key={nombre}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="capitalize transition-colors hover:text-white"
                    >
                      {nombre}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-marca-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anio} {site.nombreLegal}. Todos los derechos reservados.
          </p>
          <p>
            Representante en Colombia de{" "}
            <a
              href={site.fabricante.sitio}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
            >
              {site.fabricante.nombre}
            </a>{" "}
            — {site.fabricante.pais}
          </p>
        </div>
      </div>
    </footer>
  );
}
