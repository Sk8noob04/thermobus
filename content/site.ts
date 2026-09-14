/**
 * ============================================================================
 *  CONFIGURACIÓN CENTRAL DEL SITIO — THERMOBUS
 * ============================================================================
 *
 *  TODO el contenido editable del sitio vive en este archivo y en products.ts.
 *  Ningún componente tiene texto "quemado". Para cambiar teléfonos, correos,
 *  textos o secciones, se edita AQUÍ y nada más.
 *
 *  Los campos marcados con  <<< COMPLETAR  deben llenarse antes de publicar.
 * ============================================================================
 */

export const site = {
  // ---------------------------------------------------------------- Identidad
  nombre: "Thermobus",
  nombreLegal: "Thermobus S.A.S.", // <<< COMPLETAR razón social real
  tagline: "Representantes de ARCO Climatização en Colombia",
  descripcion:
    "Aire acondicionado para buses urbanos, intermunicipales y microbuses. Representación oficial en Colombia de ARCO Climatização (Brasil).",

  // URL final del sitio (sin slash al final). Se usa para SEO y sitemap.
  url: "https://www.thermobus.com.co", // <<< COMPLETAR con tu dominio real

  // ------------------------------------------------------------------ Idioma
  locale: "es-CO",

  // ----------------------------------------------------------------- Contacto
  contacto: {
    ciudad: "Bogotá, Colombia", // <<< COMPLETAR
    direccion: "", // <<< COMPLETAR (opcional; si queda vacío no se muestra)
    telefono: "+57 000 000 0000", // <<< COMPLETAR
    // Solo dígitos con indicativo país, sin + ni espacios. Para el link de WhatsApp.
    whatsapp: "573000000000", // <<< COMPLETAR
    email: "comercial@thermobus.com.co", // <<< COMPLETAR
    horario: "Lunes a viernes, 8:00 a.m. – 5:00 p.m.",
  },

  // ------------------------------------------------------------------- Redes
  // Deja en "" las que no existan: no se renderizan.
  redes: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
  },

  // ------------------------------------------------------------- Fabricante
  fabricante: {
    nombre: "ARCO Climatização",
    pais: "Brasil",
    ciudad: "Caxias do Sul / RS",
    sitio: "https://www.arcoclima.com.br",
    descripcion:
      "ARCO Climatização desarrolla y fabrica aire acondicionado para línea automotiva siguiendo estándares nacionales e internacionales, con planta en Caxias do Sul, Rio Grande do Sul.",
  },

  // ------------------------------------------------------------ Propuesta de valor
  // Se muestran como tarjetas en la home. Agrega o quita libremente.
  diferenciales: [
    {
      titulo: "Representación oficial",
      texto:
        "Somos la cara comercial de ARCO Climatização en Colombia: precios de fábrica, respaldo directo y trazabilidad de cada equipo.",
      icono: "shield",
    },
    {
      titulo: "Línea completa",
      texto:
        "Desde 60.000 hasta 240.000 BTU/h. Microbús, urbano, intermunicipal, articulado, biarticulado, doble piso y chasis eléctrico.",
      icono: "grid",
    },
    {
      titulo: "Ingeniería aplicada",
      texto:
        "Seleccionamos el equipo según chasis, carrocería, número de pasajeros y ruta. No vendemos catálogo: dimensionamos la solución.",
      icono: "gauge",
    },
    {
      titulo: "Soporte en Colombia",
      texto:
        "Acompañamiento en instalación, puesta en marcha y repuestos, con canal directo a la ingeniería de fábrica en Brasil.",
      icono: "wrench",
    },
  ],

  // ----------------------------------------------------------------- Nosotros
  nosotros: {
    intro:
      "Thermobus nace para acercar al transportador colombiano la tecnología de climatización de ARCO, uno de los fabricantes de aire acondicionado para buses de mayor trayectoria en Brasil.",
    cuerpo: [
      "Operamos como la representación comercial de ARCO Climatização en Colombia. Eso significa que el transportador, el carrocero y el operador de flota tratan con un interlocutor local —en su idioma, su moneda y su marco normativo— pero compran directamente el producto de fábrica.",
      "Nuestro trabajo no termina en la cotización. Acompañamos la selección técnica del equipo según el chasis y la carrocería, coordinamos la importación, y damos soporte en instalación, puesta en marcha y repuestos.",
    ],
    // Los valores de ARCO, adaptados. Edita a gusto.
    pilares: [
      {
        titulo: "Misión",
        texto:
          "Llevar al transporte de pasajeros colombiano equipos de climatización confiables, a precio justo y con tiempos de entrega competitivos, respaldados por la ingeniería de ARCO.",
      },
      {
        titulo: "Visión",
        texto:
          "Ser el referente en climatización para buses en Colombia, reconocidos por la calidad del producto y por la seriedad del acompañamiento técnico.",
      },
      {
        titulo: "Valores",
        texto:
          "Responsabilidad por lo que entregamos. Calidad asegurada. Agilidad en la entrega. Innovación en producto.",
      },
    ],
  },

  // -------------------------------------------------------------------- Hero
  hero: {
    titulo: "Confort térmico para cada pasajero, en cada kilómetro",
    subtitulo:
      "Aire acondicionado ARCO para buses urbanos, intermunicipales y microbuses. Representación oficial en Colombia.",
    ctaPrimario: { texto: "Ver líneas de producto", href: "/productos" },
    ctaSecundario: { texto: "Solicitar cotización", href: "/contacto" },
  },

  // ------------------------------------------------------------------ Navegación
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],

  // ----------------------------------------------------- Analítica (opcional)
  // Pega aquí el ID de Google Analytics 4 (G-XXXXXXXXXX) cuando lo tengas.
  analytics: {
    ga4: "",
  },
} as const;

export type Site = typeof site;

/** Link de WhatsApp con mensaje prellenado. */
export function whatsappLink(mensaje?: string): string {
  const texto = encodeURIComponent(
    mensaje ?? `Hola ${site.nombre}, quisiera información sobre aire acondicionado para buses.`
  );
  return `https://wa.me/${site.contacto.whatsapp}?text=${texto}`;
}
