import { NextResponse } from "next/server";
import { site } from "@/content/site";

/**
 * ============================================================================
 *  ENDPOINT DE CONTACTO
 * ============================================================================
 *
 *  Recibe el formulario, envía un correo con formato fijo a la casilla
 *  comercial y devuelve el resultado. El correo está pensado para que un flujo
 *  de Power Automate lo lea y agregue la fila al Excel online: al final del
 *  cuerpo va un bloque JSON entre marcadores, que se parsea en un solo paso.
 *
 *  Variables de entorno (se configuran en Vercel → Settings → Environment
 *  Variables). Ver .env.example:
 *
 *    RESEND_API_KEY   obligatoria para que se envíe el correo
 *    CONTACTO_TO      destino (por defecto, el correo de content/site.ts)
 *    CONTACTO_FROM    remitente (por defecto, el dominio de pruebas de Resend)
 *
 *  Si RESEND_API_KEY no está configurada, el endpoint responde
 *  { ok: false, motivo: "sin-configurar" } y el formulario cae de vuelta al
 *  método anterior (abrir WhatsApp). El sitio nunca queda roto.
 * ============================================================================
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITES = {
  nombre: 120,
  empresa: 160,
  email: 160,
  telefono: 40,
  ciudad: 80,
  linea: 120,
  cantidad: 40,
  mensaje: 2000,
} as const;

type Campo = keyof typeof LIMITES;

interface Lead {
  fecha: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  ciudad: string;
  linea: string;
  cantidad: string;
  mensaje: string;
  canal: string;
}

/** Recorta, normaliza espacios y aplica el límite del campo. */
function limpiar(valor: unknown, campo: Campo): string {
  if (typeof valor !== "string") return "";
  const plano = campo === "mensaje" ? valor : valor.replace(/[\r\n]+/g, " ");
  return plano.trim().replace(/[ \t]{2,}/g, " ").slice(0, LIMITES[campo]);
}

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* --------------------------------------------------- Límite de frecuencia
   Defensa básica contra envíos repetidos. En serverless la memoria no se
   comparte entre instancias, así que esto frena ráfagas desde un mismo
   cliente, no un ataque distribuido. Para eso está además el honeypot.      */
const recientes = new Map<string, number[]>();
const VENTANA_MS = 60_000;
const MAX_POR_VENTANA = 5;

function demasiados(ip: string): boolean {
  const ahora = Date.now();
  const previos = (recientes.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previos.push(ahora);
  recientes.set(ip, previos);
  if (recientes.size > 500) {
    for (const [clave, marcas] of recientes) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) recientes.delete(clave);
    }
  }
  return previos.length > MAX_POR_VENTANA;
}

/* ------------------------------------------------------- Cuerpo del correo */

function componerCorreo(lead: Lead): string {
  const filas: [string, string][] = [
    ["Nombre", lead.nombre],
    ["Empresa", lead.empresa],
    ["Correo", lead.email],
    ["Teléfono", lead.telefono],
    ["Ciudad", lead.ciudad],
    ["Tipo de vehículo", lead.linea],
    ["Cantidad de equipos", lead.cantidad],
    ["Canal", lead.canal],
  ].filter(([, v]) => v !== "") as [string, string][];

  const ancho = Math.max(...filas.map(([k]) => k.length));
  const detalle = filas.map(([k, v]) => `${k.padEnd(ancho)} : ${v}`).join("\n");

  return [
    "Nueva solicitud de cotización desde thermobus.com.co",
    "",
    detalle,
    "",
    lead.mensaje ? `Detalle del requerimiento:\n${lead.mensaje}` : "Sin detalle adicional.",
    "",
    "",
    "---DATOS---",
    JSON.stringify(lead),
    "---FIN---",
  ].join("\n");
}

/* ------------------------------------------------------------------ POST */

export async function POST(request: Request) {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ ok: false, motivo: "json-invalido" }, { status: 400 });
  }

  // Honeypot: campo oculto que una persona nunca completa.
  if (typeof cuerpo.website === "string" && cuerpo.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  if (demasiados(ip)) {
    return NextResponse.json({ ok: false, motivo: "demasiados-envios" }, { status: 429 });
  }

  const lead: Lead = {
    fecha: new Date().toISOString(),
    nombre: limpiar(cuerpo.nombre, "nombre"),
    empresa: limpiar(cuerpo.empresa, "empresa"),
    email: limpiar(cuerpo.email, "email"),
    telefono: limpiar(cuerpo.telefono, "telefono"),
    ciudad: limpiar(cuerpo.ciudad, "ciudad"),
    linea: limpiar(cuerpo.linea, "linea"),
    cantidad: limpiar(cuerpo.cantidad, "cantidad"),
    mensaje: limpiar(cuerpo.mensaje, "mensaje"),
    canal: cuerpo.canal === "whatsapp" ? "WhatsApp" : "Formulario web",
  };

  if (!lead.nombre || !RE_EMAIL.test(lead.email)) {
    return NextResponse.json({ ok: false, motivo: "datos-incompletos" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Todavía sin configurar: el formulario usa el método anterior.
    return NextResponse.json({ ok: false, motivo: "sin-configurar" });
  }

  const destino = process.env.CONTACTO_TO || site.contacto.email;
  const remitente = process.env.CONTACTO_FROM || "Thermobus <onboarding@resend.dev>";

  if (!destino) {
    return NextResponse.json({ ok: false, motivo: "sin-destino" }, { status: 500 });
  }

  const asunto = `[LEAD] Cotización — ${lead.empresa || lead.nombre}`;

  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        reply_to: lead.email,
        subject: asunto,
        text: componerCorreo(lead),
      }),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      console.error("Resend rechazó el envío:", respuesta.status, detalle);
      return NextResponse.json({ ok: false, motivo: "envio-fallido" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando el lead:", error);
    return NextResponse.json({ ok: false, motivo: "envio-fallido" }, { status: 502 });
  }
}
