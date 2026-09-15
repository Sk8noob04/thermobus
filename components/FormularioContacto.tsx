"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * FORMULARIO DE CONTACTO
 *
 * Al enviar:
 *   1. Registra el lead en /api/contacto — el servidor manda el correo a la
 *      casilla comercial con un formato fijo, y de ahí Power Automate lo pasa
 *      al Excel online. Esto ocurre SIEMPRE, sin importar el canal elegido,
 *      así que ningún contacto se pierde.
 *   2. Si el visitante eligió WhatsApp, abre la conversación con el mensaje
 *      ya redactado.
 *
 * Si el endpoint todavía no está configurado (falta RESEND_API_KEY) o falla,
 * el formulario cae de vuelta al método anterior: abrir WhatsApp o el cliente
 * de correo. Nunca se queda sin salida.
 */

const LINEAS = [
  "Microbús / buseta",
  "Urbano",
  "Interurbano",
  "Articulado / biarticulado",
  "Autobús eléctrico",
  "No estoy seguro",
];

type Estado = "libre" | "enviando" | "enviado" | "error";

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
    website: "", // honeypot
  });
  const [via, setVia] = useState<"whatsapp" | "email">("whatsapp");
  const [estado, setEstado] = useState<Estado>("libre");

  const set =
    (campo: keyof typeof datos) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setDatos((d) => ({ ...d, [campo]: e.target.value }));

  function componerMensaje() {
    return [
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
    ]
      .filter(Boolean)
      .join("\n");
  }

  function abrirCanal() {
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

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === "enviando") return;
    setEstado("enviando");

    let registrado = false;
    try {
      const r = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, canal: via }),
      });
      const json = await r.json().catch(() => ({ ok: false }));
      registrado = json?.ok === true;
    } catch {
      registrado = false;
    }

    if (via === "whatsapp") {
      // Siempre abre WhatsApp: es lo que el visitante pidió.
      abrirCanal();
      setEstado(registrado ? "enviado" : "libre");
      return;
    }

    if (registrado) {
      setEstado("enviado");
      return;
    }

    // El servidor no pudo: se abre el cliente de correo como respaldo.
    abrirCanal();
    setEstado("libre");
  }

  const inputCls =
    "w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-marca-600 focus:ring-2 focus:ring-marca-100 focus:outline-none";
  const labelCls = "block text-sm font-medium text-slate-700";

  if (estado === "enviado") {
    return (
      <div className="rounded-xl border border-marca-200 bg-marca-50 p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-marca-700">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-marca-900">
          Solicitud enviada
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Recibimos sus datos. Le respondemos dentro del siguiente día hábil
          {datos.email && ` al correo ${datos.email}`}.
        </p>
        <button
          type="button"
          onClick={() => {
            setDatos({
              nombre: "",
              empresa: "",
              email: "",
              telefono: "",
              ciudad: "",
              linea: "",
              cantidad: "",
              mensaje: "",
              website: "",
            });
            setEstado("libre");
          }}
          className="mt-5 text-sm font-semibold text-marca-700 hover:text-marca-800"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

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

      {/* Honeypot: invisible para personas, tentador para bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No completar</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={datos.website}
          onChange={set("website")}
        />
      </div>

      <fieldset hidden={!site.contacto.email}>
        <legend className={labelCls}>Prefiero que me contacten por</legend>
        <div className="mt-2 flex gap-2">
          {(["whatsapp", "email"] as const).map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() => setVia(opcion)}
              aria-pressed={via === opcion}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
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
        disabled={estado === "enviando"}
        className="w-full rounded-md bg-marca-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-marca-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar solicitud"}
      </button>

      <p className="text-xs text-slate-500">
        {via === "whatsapp"
          ? "Registramos su solicitud y se abre WhatsApp con el mensaje redactado."
          : "Respondemos dentro del siguiente día hábil."}
      </p>
    </form>
  );
}
