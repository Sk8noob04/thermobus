import Link from "next/link";
import type { Producto } from "@/content/products";
import { Icono } from "./ui";

export default function ProductCard({ producto }: { producto: Producto }) {
  const btu = producto.specs.refrigeracion;

  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-marca-300 hover:shadow-lg"
    >
      {/* Imagen — placeholder hasta recibir el material oficial de ARCO.
          Para reemplazar: colocar la foto en /public/productos/<slug>.jpg
          y sustituir este div por <Image src={...} .../> */}
      <div className="placeholder-tecnico relative flex aspect-16/10 items-center justify-center">
        <Icono nombre="bus" className="h-14 w-14 text-white/25" />
        <span className="absolute top-3 left-3 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
          {producto.tipo}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-marca-900 group-hover:text-marca-700">
          {producto.modelo}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {producto.descripcion}
        </p>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm">
          {btu && (
            <div>
              <dt className="text-xs text-slate-500">Refrigeración</dt>
              <dd className="font-semibold text-marca-900">{btu}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs text-slate-500">Pasajeros</dt>
            <dd className="font-semibold text-marca-900">hasta {producto.pasajeros}</dd>
          </div>
        </dl>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-marca-700">
          Ver ficha técnica
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
