"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, whatsappLink } from "@/content/site";
import Logo from "./Logo";
import LogoArco from "./LogoArco";
import { IconoWhatsApp } from "./ui";

export default function Header() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Barra superior de contacto */}
      <div className="hidden bg-marca-950 text-marca-100 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2 text-xs">
          <span className="text-marca-200">{site.tagline}</span>
          <div className="flex items-center gap-5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <IconoWhatsApp className="h-3.5 w-3.5 text-[#25D366]" />
              {site.contacto.telefono}
            </a>
            {site.contacto.email && (
              <a
                href={`mailto:${site.contacto.email}`}
                className="transition-colors hover:text-white"
              >
                {site.contacto.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <div className="border-b border-marca-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <Link href="/" className="shrink-0" aria-label={`${site.nombre} — inicio`}>
              <Logo className="h-10 w-auto sm:h-14" priority />
            </Link>

            {/* Co-marca: representación oficial de ARCO */}
            <div className="hidden items-center gap-3 border-l border-slate-200 pl-5 lg:flex">
              <span className="text-[10px] leading-tight font-medium tracking-wide text-slate-500 uppercase">
                Representante
                <br />
                oficial de
              </span>
              <LogoArco className="h-8 w-auto lg:h-9" sizes="130px" priority />
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const activo =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activo
                      ? "text-marca-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-marca-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-md bg-marca-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-marca-800"
            >
              Cotizar
            </a>
          </nav>

          {/* Botón móvil */}
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-label="Abrir menú"
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {abierto ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {abierto && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAbierto(false)}
                    className="block rounded-md px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-md bg-marca-700 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Solicitar cotización
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
