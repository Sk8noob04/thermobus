"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * FORMULARIO DE CONTACTO — v1 SIN BACKEND
 *
 * Para no depender de un servidor (ni de su costo) en la versión inicial,
 * este formulario compone un mensaje estructurado y lo abre en WhatsApp o en
 * el cliente de correo del visitante. Funciona desde el día uno y sin
 * mantenimiento.
 *
 * ADDON POSTERIOR — "Formulario con backend":
 *   Reemplazar `enviar()` por un POST a /api/contacto (Route Handler de Next)
 *   que envíe el correo con Resend y opcionalmente guarde el lead en una base
 *   de datos o CRM. La estructura del estado ya coincide con el payload.
 */

const LINEAS = [
  "Microbús / buseta (25–52 pasajeros)",
  "Urbano (55–65 pasajeros)",
  "Intermunicipal",
  "Articulado / biarticulado (75–80 pasajeros)",
  "Doble piso",
  "Chasis eléctrico",
  "No estoy seguro",
];

export default function FormularioContacto() {
  const [datos, setDatos] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    ciudad: "",
    linea: "",
    cantidad: "",
    mensaje: "",
  });
  const [via, setVia] = useState<"whatsapp" | "email">("whatsapp");

  const set = (campo: keyof typeof datos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setDatos((d) => ({ ...d, [campo]: e.target.value }));

  function componerMensaje() {
    const lineas = [
      `Solicitud de cotización — ${site.nombre}`,
      "",
      `Nombre: ${datos.nombre}`,
      datos.empresa && `Empresa: ${datos.empresa}`,
      `Correo: ${datos.email}`,
      datos.telefono && `Teléfono: ${datos.telefono}`,
      datos.ciudad && `Ciudad: ${datos.ciudad}`,
      datos.linea && `Tipo de vehículo: ${datos.linea}`,
      datos.cantidad && `Cantidad de equipos: ${datos.cantidad}`,
      "",
      datos.mensaje && `Detalle: ${datos.mensaje}`,
    ].filter(Boolean);
    return lineas.join("\n");
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const cuerpo = componerMensaje();

    if (via === "whatsapp" || !site.contacto.email) {
      window.open(
        `https://wa.me/${site.contacto.whatsapp}?text=${encodeURIComponent(cuerpo)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.location.href = `mailto:${site.contacto.email}?subject=${encodeURIComponent(
        `Cotización — ${datos.empresa || datos.nombre}`
      )}&body=${encodeURIComponent(cuerpo)}`;
    }
  }

  const inputCls =
    "w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-marca-600 focus:ring-2 focus:ring-marca-100 focus:outline-none";
  const labelCls = "block text-sm font-medium text-slate-700";

  return (
    <form onSubmit={enviar} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={labelCls}>
            Nombre <span className="text-marca-600">*</span>
          </label>
          <input
            id="nombre"
            required
            value={datos.nombre}
            onChange={set("nombre")}
            className={`mt-1.5 ${inputCls}`}
            placeholder="Su nombre"
          />
        </div>
        <div>
          <label htmlFor="empresa" className={labelCls}>
            Empresa
          </label>
          <input
            id="empresa"
            value={datos.empresa}
            onChange={set("empresa")}
            className={`mt-1.5 ${inputCls}`}
            placeholder="Nombre de la empresa"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Correo <span className="text-marca-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={datos.email}
            onChange={set("email")}
            className={`mt-1.5 ${inputCls}`}
            placeholder="correo@empresa.com"
          />
        </div>
        <div>
          <label htmlFor="telefono" className={labelCls}>
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            value={datos.telefono}
            onChange={set("telefono")}
            className={`mt-1.5 ${inputCls}`}
            placeholder="+57 300 000 0000"
          />
        </div>
        <div>
          <label htmlFor="ciudad" className={labelCls}>
            Ciudad
          </label>
          <input
            id="ciudad"
            value={datos.ciudad}
            onChange={set("ciudad")}
            className={`mt-1.5 ${inputCls}`}
            placeholder="Bogotá, Medellín…"
          />
        </div>
        <div>
          <label htmlFor="cantidad" className={labelCls}>
            Cantidad de equipos
          </label>
          <input
            id="cantidad"
            value={datos.cantidad}
            onChange={set("cantidad")}
            className={`mt-1.5 ${inputCls}`}
            placeholder="Ej.: 12"
          />
        </div>
      </div>

      <div>
        <label htmlFor="linea" className={labelCls}>
          Tipo de vehículo
        </label>
        <select
          id="linea"
          value={datos.linea}
          onChange={set("linea")}
          className={`mt-1.5 ${inputCls}`}
        >
          <option value="">Seleccione una opción</option>
          {LINEAS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className={labelCls}>
          Detalle de su requerimiento
        </label>
        <textarea
          id="mensaje"
          rows={4}
          value={datos.mensaje}
          onChange={set("mensaje")}
          className={`mt-1.5 ${inputCls} resize-y`}
          placeholder="Chasis, carrocería, ruta, plazos…"
        />
      </div>

      {/* Selector de canal — el correo solo aparece si hay uno configurado */}
      <fieldset hidden={!site.contacto.email}>
        <legend className={labelCls}>Enviar por</legend>
        <div className="mt-2 flex gap-2">
          {(["whatsapp", "email"] as const).map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() => setVia(opcion)}
              aria-pressed={via === opcion}
              className={`rounded-md border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                via === opcion
                  ? "border-marca-600 bg-marca-50 text-marca-800"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {opcion === "whatsapp" ? "WhatsApp" : "Correo"}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-md bg-marca-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-marca-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-700 sm:w-auto"
      >
        Enviar solicitud
      </button>

      <p className="text-xs text-slate-500">
        Al enviar se abrirá{" "}
        {via === "whatsapp" || !site.contacto.email ? "WhatsApp" : "su cliente de correo"}{" "}
        con la solicitud ya redactada. Respondemos dentro del siguiente día hábil.
      </p>
    </form>
  );
}
