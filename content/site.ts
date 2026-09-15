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
  nombreLegal: "Thermo Bus S.A.S.",
  tagline: "Representantes de ARCO Climatização en Colombia",
  descripcion:
    "Aire acondicionado para autobuses urbanos, interurbanos, articulados, eléctricos y microbuses. Representación oficial en Colombia de ARCO Climatização (Brasil).",

  // URL final del sitio (sin slash al final). Se usa para SEO y sitemap.
  // El dominio apunta al apex, sin www: www.thermobus.com.co redirige aquí.
  url: "https://thermobus.com.co",

  // ------------------------------------------------------------------ Idioma
  locale: "es-CO",

  // ----------------------------------------------------------------- Contacto
  contacto: {
    ciudad: "Bogotá, Colombia",
    direccion: "", // opcional: dirección de la oficina. Vacío = no se muestra.
    telefono: "+57 310 702 5510",
    // Solo dígitos con indicativo país, sin + ni espacios. Para el link de WhatsApp.
    whatsapp: "573107025510",
    // <<< COMPLETAR: correo comercial. Mientras esté vacío no se muestra en
    // ninguna parte del sitio y el formulario envía solo por WhatsApp.
    email: "",
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
        "Somos la cara comercial de ARCO Climatização en Colombia: precios competitivos en el mercado nacional, con equipos de renombre internacional.",
      icono: "shield",
    },
    {
      titulo: "Soluciones eficientes",
      texto:
        "Cada equipo se configura para el vehículo: capacidad, tensión y tipo de montaje según el chasis y la carrocería.",
      icono: "gauge",
    },
    {
      titulo: "Mayor seguridad",
      texto:
        "Equipos fabricados en Brasil bajo estándares nacionales e internacionales, con componentes de marcas reconocidas.",
      icono: "grid",
    },
    {
      titulo: "Alto rendimiento",
      texto:
        "De 70.000 a 240.000 BTU/h, en 12V y 24V, para microbús, urbano, interurbano, articulado y chasis eléctrico.",
      icono: "wrench",
    },
  ],

  // ----------------------------------------------------------------- Nosotros
  nosotros: {
    intro:
      "Thermobus nace para acercar al transportador colombiano la tecnología de climatización de ARCO, uno de los fabricantes de aire acondicionado para buses de mayor trayectoria en Brasil.",
    cuerpo: [
      "Operamos como la representación comercial de ARCO Climatização en Colombia. Eso significa que el transportador, el carrocero y el operador de flota tratan con un representante local —en su idioma, su moneda y su marco normativo— con el respaldo directo de la fábrica.",
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
    titulo: "Tecnología brasileña en movimiento",
    subtitulo:
      "Aire acondicionado ARCO para autobuses urbanos, interurbanos, articulados, eléctricos y microbuses. Representación oficial en Colombia.",
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
