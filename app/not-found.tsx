import { Boton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-28 sm:py-36">
      <p className="text-xs font-semibold tracking-[0.14em] text-marca-600 uppercase">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-marca-900 sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600">
        La página que busca no existe o fue movida.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Boton href="/">Volver al inicio</Boton>
        <Boton href="/productos" variante="secundario">
          Ver productos
        </Boton>
      </div>
    </div>
  );
}
