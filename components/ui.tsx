import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ Botones */

type BotonProps = {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario" | "fantasma";
  externo?: boolean;
  className?: string;
};

const variantes = {
  primario:
    "bg-marca-700 text-white hover:bg-marca-800 shadow-sm focus-visible:outline-marca-700",
  secundario:
    "bg-white text-marca-900 hover:bg-marca-50 shadow-sm focus-visible:outline-white",
  fantasma:
    "border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white",
} as const;

export function Boton({
  href,
  children,
  variante = "primario",
  externo = false,
  className = "",
}: BotonProps) {
  const clases = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${variantes[variante]} ${className}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}

/* ----------------------------------------------------------------- Secciones */

export function Seccion({
  children,
  className = "",
  fondo = "blanco",
}: {
  children: ReactNode;
  className?: string;
  fondo?: "blanco" | "gris" | "oscuro";
}) {
  const fondos = {
    blanco: "bg-white",
    gris: "bg-slate-50",
    oscuro: "bg-marca-950 text-white",
  } as const;

  return (
    <section className={`${fondos[fondo]} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">{children}</div>
    </section>
  );
}

export function TituloSeccion({
  sobretitulo,
  titulo,
  descripcion,
  centrado = false,
  invertido = false,
}: {
  sobretitulo?: string;
  titulo: string;
  descripcion?: string;
  centrado?: boolean;
  invertido?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${centrado ? "mx-auto text-center" : ""}`}>
      {sobretitulo && (
        <p
          className={`text-xs font-semibold tracking-[0.14em] uppercase ${
            invertido ? "text-hielo-400" : "text-marca-600"
          }`}
        >
          {sobretitulo}
        </p>
      )}
      <h2
        className={`mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          invertido ? "text-white" : "text-marca-900"
        }`}
      >
        {titulo}
      </h2>
      {descripcion && (
        <p
          className={`mt-4 text-base leading-relaxed text-pretty ${
            invertido ? "text-marca-200" : "text-slate-600"
          }`}
        >
          {descripcion}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Iconografía */

const paths: Record<string, ReactNode> = {
  shield: <path d="M12 3l7 3v6c0 4.2-2.8 7.6-7 9-4.2-1.4-7-4.8-7-9V6l7-3z" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 15a8 8 0 1116 0" />
      <path d="M12 15l4-4" />
    </>
  ),
  wrench: (
    <path d="M15.5 4a5 5 0 00-4.6 6.9L4 17.8 6.2 20l6.9-6.9A5 5 0 0019.6 8l-2.8 2.8-2.1-.6-.6-2.1L16.9 5.3A5 5 0 0015.5 4z" />
  ),
  snowflake: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="M12 6.5l2.2-2.2M12 6.5L9.8 4.3M12 17.5l2.2 2.2M12 17.5l-2.2 2.2" />
    </>
  ),
  bus: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M3 11h18M7 17v2M17 17v2" />
      <circle cx="7.5" cy="14" r="1" />
      <circle cx="16.5" cy="14" r="1" />
    </>
  ),
};

export function Icono({
  nombre,
  className = "h-6 w-6",
}: {
  nombre: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[nombre] ?? paths.snowflake}
    </svg>
  );
}
