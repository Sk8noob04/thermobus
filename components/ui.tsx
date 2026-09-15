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

/** Glifo oficial de WhatsApp. Para marcar que un número también recibe WhatsApp. */
export function IconoWhatsApp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  );
}

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
