import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/content/products";
import LogoArco from "./LogoArco";

export default function ProductCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-marca-300 hover:shadow-lg"
    >
      <div className="relative aspect-16/9 overflow-hidden border-b border-slate-100 bg-white">
        <Image
          src={`/productos/${producto.slug}.png`}
          alt={`Aire acondicionado ARCO ${producto.modelo}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <LogoArco
          className="absolute top-3 left-3 h-4 w-auto opacity-70"
          sizes="70px"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-marca-900 group-hover:text-marca-700">
          {producto.modelo}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {producto.descripcion}
        </p>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm">
          <div>
            <dt className="text-xs text-slate-500">Capacidad</dt>
            <dd className="font-semibold text-marca-900 tabular-nums">
              {producto.specs.capacidad}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Tensión</dt>
            <dd className="font-semibold text-marca-900">{producto.specs.tension}</dd>
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
