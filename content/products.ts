/**
 * ============================================================================
 *  CATÁLOGO DE PRODUCTOS ARCO
 * ============================================================================
 *
 *  Fuente de los datos técnicos: fichas publicadas por ARCO Climatização
 *  (arcoclima.com.br), consultadas en septiembre de 2026.
 *
 *  IMPORTANTE ANTES DE PUBLICAR:
 *  Confirmar con ARCO que estas fichas son las vigentes para exportación a
 *  Colombia. Los campos vacíos ("") simplemente no se renderizan.
 *
 *  Esta estructura está pensada para migrar a un CMS sin tocar componentes:
 *  basta reemplazar el `export const productos` por un fetch que devuelva el
 *  mismo tipo `Producto[]`.
 * ============================================================================
 */

export type LineaId = "urbano" | "intermunicipal" | "microbus";

export interface Linea {
  id: LineaId;
  nombre: string;
  titulo: string;
  descripcion: string;
}

export interface Especificaciones {
  refrigeracion: string;
  calefaccion: string;
  caudalEvaporador: string;
  caudalCondensador: string;
  dimensiones: string;
  peso: string;
  voltaje: string;
  corriente: string;
  compresor: string;
}

export interface Producto {
  slug: string;
  modelo: string;
  titulo: string;
  descripcion: string;
  pasajeros: number;
  lineas: LineaId[];
  tipo: "Techo" | "Split" | "Chasis" | "Eléctrico";
  destacado?: boolean;
  specs: Especificaciones;
  opcionales: string[];
}

export const lineas: Linea[] = [
  {
    id: "urbano",
    nombre: "Urbano",
    titulo: "Aire acondicionado para buses urbanos",
    descripcion:
      "Equipos para operación urbana de alta frecuencia: puertas abriendo constantemente, paradas continuas y carga térmica variable. Incluye versiones exclusivas para articulados y biarticulados de sistemas BRT.",
  },
  {
    id: "intermunicipal",
    nombre: "Intermunicipal",
    titulo: "Aire acondicionado para buses intermunicipales",
    descripcion:
      "Alta performance térmica y display de manejo intuitivo para rutas largas. Incluye el sistema de climatización para buses de doble piso, con diseño compacto y módulos ocultos.",
  },
  {
    id: "microbus",
    nombre: "Microbús",
    titulo: "Aire acondicionado para microbuses y busetas",
    descripcion:
      "Equipos compactos, livianos y de alta performance térmica, en versiones de techo y split. Cubren transporte convencional y escolar de 25 a 52 pasajeros.",
  },
];

export const productos: Producto[] = [
  // ------------------------------------------------------- ARTICULADOS / BRT
  {
    slug: "a640",
    modelo: "A640",
    titulo: "A640 — A/C para bus articulado",
    descripcion:
      "Equipo de mayor capacidad de la línea, desarrollado para bus urbano articulado y biarticulado. Confort equilibrado para 80 pasajeros.",
    pasajeros: 80,
    lineas: ["urbano"],
    tipo: "Techo",
    destacado: true,
    specs: {
      refrigeracion: "240.000 BTU/h",
      calefaccion: "240.000 BTU/h",
      caudalEvaporador: "13.200 m³/h",
      caudalCondensador: "17.400 m³/h",
      dimensiones: "195 (A) × 1.860 (L) × 2.990 (C) mm",
      peso: "292 kg",
      voltaje: "12V / 24V",
      corriente: "148 A",
      compresor: "Bock / Bitzer 6NFCY",
    },
    opcionales: ["Renovación de aire", "Defroster", "Ventilador electrónico"],
  },
  {
    slug: "a610",
    modelo: "A610",
    titulo: "A610 — A/C para bus articulado",
    descripcion:
      "Proyectado para bus urbano articulado y biarticulado. Confort equilibrado para 75 pasajeros.",
    pasajeros: 75,
    lineas: ["urbano"],
    tipo: "Techo",
    specs: {
      refrigeracion: "220.000 BTU/h",
      calefaccion: "135.000 BTU/h",
      caudalEvaporador: "13.200 m³/h",
      caudalCondensador: "8.700 m³/h",
      dimensiones: "",
      peso: "146 kg",
      voltaje: "24V",
      corriente: "80 A",
      compresor: "Bitzer",
    },
    opcionales: ["Renovación de aire", "Defroster"],
  },
  {
    slug: "a620",
    modelo: "A620",
    titulo: "A620 — A/C para bus articulado",
    descripcion:
      "Desarrollado para bus urbano articulado y biarticulado. Confort equilibrado para 80 pasajeros.",
    pasajeros: 80,
    lineas: ["urbano"],
    tipo: "Techo",
    // NOTA: ficha técnica pendiente de confirmar con ARCO. Los campos vacíos
    // no se renderizan y la página muestra un CTA para solicitarla.
    specs: {
      refrigeracion: "",
      calefaccion: "",
      caudalEvaporador: "",
      caudalCondensador: "",
      dimensiones: "",
      peso: "",
      voltaje: "",
      corriente: "",
      compresor: "",
    },
    opcionales: [],
  },

  // ------------------------------------------------- DOBLE PISO / RODOVIARIO
  {
    slug: "a590-dd",
    modelo: "A590 DD",
    titulo: "A590 DD — A/C para bus de doble piso",
    descripcion:
      "Aire acondicionado split para bus de doble piso. Confort térmico ideal para hasta 70 pasajeros.",
    pasajeros: 70,
    lineas: ["intermunicipal"],
    tipo: "Split",
    destacado: true,
    specs: {
      refrigeracion: "205.000 BTU/h",
      calefaccion: "150.000 BTU/h",
      caudalEvaporador: "9.900 m³/h",
      caudalCondensador: "14.500 m³/h",
      dimensiones: "195 (A) × 1.860 (L) × 2.990 (C) mm",
      peso: "250 kg",
      voltaje: "12V / 24V",
      corriente: "115 A",
      compresor: "Bitzer",
    },
    opcionales: [
      "Renovación de aire",
      "Sistema de calefacción",
      "Desempañador de vidrios",
      "Ventilador electrónico",
    ],
  },

  // ------------------------------------------------------ URBANO / RODOVIARIO
  {
    slug: "a380",
    modelo: "A380",
    titulo: "A380 — Aire acondicionado para chasis",
    descripcion:
      "Equipo para chasis con tecnología, desempeño y calidad ARCO. Confort térmico ideal para hasta 65 pasajeros.",
    pasajeros: 65,
    lineas: ["urbano", "intermunicipal"],
    tipo: "Chasis",
    destacado: true,
    specs: {
      refrigeracion: "155.000 BTU/h",
      calefaccion: "",
      caudalEvaporador: "8.800 m³/h",
      caudalCondensador: "",
      dimensiones: "199 (A) × 1.850 (L) × 3.550 (C) mm",
      peso: "",
      voltaje: "24V",
      corriente: "88 A",
      compresor: "Bitzer / Bock",
    },
    opcionales: ["Compresores Bock o Bitzer", "Defroster", "Renovación de aire"],
  },
  {
    slug: "a370",
    modelo: "A370",
    titulo: "A370 — Aire acondicionado de techo",
    descripcion:
      "Dos velocidades en el evaporador, para mejor rendimiento y menor consumo de combustible. Confort térmico ideal para hasta 65 pasajeros.",
    pasajeros: 65,
    lineas: ["urbano", "intermunicipal"],
    tipo: "Techo",
    specs: {
      refrigeracion: "140.000 BTU/h",
      calefaccion: "135.000 BTU/h",
      caudalEvaporador: "6.600 m³/h",
      caudalCondensador: "11.600 m³/h",
      dimensiones: "195 (A) × 1.860 (L) × 2.990 (C) mm",
      peso: "148 kg",
      voltaje: "12V / 24V",
      corriente: "88 A",
      compresor: "QPS-65",
    },
    opcionales: [
      "Compresores Bock o Bitzer",
      "Sistema de calefacción",
      "Desempañador de vidrios",
      "Renovación de aire",
    ],
  },
  {
    slug: "a370-electrico",
    modelo: "A370 Eléctrico",
    titulo: "A370 Eléctrico — A/C para chasis eléctrico",
    descripcion:
      "Versión para chasis eléctrico. Confort térmico ideal para hasta 65 pasajeros, con compresor/convertidor de alta tensión.",
    pasajeros: 65,
    lineas: ["urbano", "intermunicipal"],
    tipo: "Eléctrico",
    destacado: true,
    specs: {
      refrigeracion: "110.000 BTU/h (32 kW)",
      calefaccion: "",
      caudalEvaporador: "6.600 m³/h",
      caudalCondensador: "11.600 m³/h",
      dimensiones: "195 (A) × 1.860 (L) × 3.326 (C) mm",
      peso: "192 kg",
      voltaje: "24V — compresor/convertidor 400–750 Vdc",
      corriente: "88 A (compresor/convertidor 32 A)",
      compresor: "Compresor / convertidor de alta tensión",
    },
    opcionales: ["Gas refrigerante R407C"],
  },
  {
    slug: "a340",
    modelo: "A340",
    titulo: "A340 — Aire acondicionado de techo",
    descripcion:
      "Desarrollado para bus urbano e intermunicipal. Tres ventiladores de alta performance para equalizar la temperatura para hasta 55 pasajeros.",
    pasajeros: 55,
    lineas: ["urbano", "intermunicipal"],
    tipo: "Techo",
    specs: {
      refrigeracion: "130.000 BTU/h",
      calefaccion: "130.000 BTU/h",
      caudalEvaporador: "6.600 m³/h",
      caudalCondensador: "8.700 m³/h",
      dimensiones: "195 (A) × 1.860 (L) × 2.990 (C) mm",
      peso: "146 kg",
      voltaje: "12V / 24V",
      corriente: "80 A",
      compresor: "QPS-65",
    },
    opcionales: [
      "Compresor Bock o Bitzer",
      "Sistema de calefacción",
      "Desempañador de vidrios",
      "Renovación de aire",
    ],
  },

  // ------------------------------------------------------------- MICROBUSES
  {
    slug: "a290",
    modelo: "A290",
    titulo: "A290 — A/C de techo para microbús",
    descripcion: "Aire acondicionado de techo, confort ideal para 52 pasajeros.",
    pasajeros: 52,
    lineas: ["microbus"],
    tipo: "Techo",
    destacado: true,
    specs: {
      refrigeracion: "110.000 BTU/h",
      calefaccion: "",
      caudalEvaporador: "4.400 m³/h",
      caudalCondensador: "4 un. — 9.240 m³/h",
      dimensiones: "200 (A) × 1.550 (L) × 2.350 (C) mm",
      peso: "98 kg",
      voltaje: "12V / 24V",
      corriente: "",
      compresor: "QPS43 / 430 cm³",
    },
    opcionales: ["Sistema de calefacción", "Desempañador de vidrios", "Renovación de aire"],
  },
  {
    slug: "a260t",
    modelo: "A260T",
    titulo: "A260T — A/C de techo para bus midi",
    descripcion: "Aire acondicionado para bus midi, confort ideal para 45 pasajeros.",
    pasajeros: 45,
    lineas: ["microbus"],
    tipo: "Techo",
    specs: {
      refrigeracion: "100.000 BTU/h",
      calefaccion: "74.000 BTU/h",
      caudalEvaporador: "4.400 m³/h",
      caudalCondensador: "5.800 m³/h",
      dimensiones: "200 (A) × 1.550 (L) × 2.350 (C) mm",
      peso: "88 kg",
      voltaje: "12V / 24V",
      corriente: "50 A",
      compresor: "TCCI — QP 31",
    },
    opcionales: ["Renovación de aire", "Sistema de calefacción", "Defroster"],
  },
  {
    slug: "a250t",
    modelo: "A250T",
    titulo: "A250T — A/C de techo para microbús",
    descripcion:
      "Desarrollado para microbús urbano e intermunicipal, confort equalizado para 45 pasajeros.",
    pasajeros: 45,
    lineas: ["microbus"],
    tipo: "Techo",
    specs: {
      refrigeracion: "90.000 BTU/h",
      calefaccion: "",
      caudalEvaporador: "4.400 m³/h",
      caudalCondensador: "5.800 m³/h",
      dimensiones: "199 (A) × 1.210 (L) × 2.250 (C) mm",
      peso: "80 kg",
      voltaje: "12V / 24V",
      corriente: "48 A",
      compresor: "TCCI — QP 31",
    },
    opcionales: ["Renovación de aire", "Defroster"],
  },
  {
    slug: "a250-ct",
    modelo: "A250 CT",
    titulo: "A250 CT — A/C split para microbús",
    descripcion: "Aire acondicionado split para microbús, confort ideal para 36 pasajeros.",
    pasajeros: 36,
    lineas: ["microbus"],
    tipo: "Split",
    specs: {
      refrigeracion: "80.000 BTU/h",
      calefaccion: "",
      caudalEvaporador: "3.300 m³/h",
      caudalCondensador: "5.800 m³/h",
      dimensiones: "195 (A) × 1.205 (L) × 1.115 (C) mm",
      peso: "75 kg",
      voltaje: "12V / 24V",
      corriente: "45 A",
      compresor: "QP 31",
    },
    opcionales: ["Renovación de aire", "Calefacción"],
  },
  {
    slug: "a210t",
    modelo: "A210T",
    titulo: "A210T — A/C de techo para microbús",
    descripcion: "Aire acondicionado de techo, confort térmico ideal para 29 pasajeros.",
    pasajeros: 29,
    lineas: ["microbus"],
    tipo: "Techo",
    specs: {
      refrigeracion: "75.000 BTU/h",
      calefaccion: "74.000 BTU/h",
      caudalEvaporador: "4.400 m³/h",
      caudalCondensador: "5.800 m³/h",
      dimensiones: "199 (A) × 1.210 (L) × 2.250 (C) mm",
      peso: "80 kg",
      voltaje: "12V / 24V",
      corriente: "48 A",
      compresor: "TCCI — QP 21",
    },
    opcionales: [],
  },
  {
    slug: "a210-ct",
    modelo: "A210 CT",
    titulo: "A210 CT — A/C split para microbús",
    descripcion: "Aire acondicionado split para microbús, confort ideal para 29 pasajeros.",
    pasajeros: 29,
    lineas: ["microbus"],
    tipo: "Split",
    specs: {
      refrigeracion: "70.000 BTU/h",
      calefaccion: "",
      caudalEvaporador: "3.300 m³/h",
      caudalCondensador: "5.800 m³/h",
      dimensiones: "195 (A) × 1.205 (L) × 1.115 (C) mm",
      peso: "75 kg",
      voltaje: "12V / 24V",
      corriente: "45 A",
      compresor: "QP 21",
    },
    opcionales: [],
  },
  {
    slug: "a190-ct",
    modelo: "A190 CT",
    titulo: "A190 CT — A/C split para microbús",
    descripcion:
      "Aire acondicionado split para microbús, confort ideal para 25 pasajeros. Ideal para transporte escolar y especial.",
    pasajeros: 25,
    lineas: ["microbus"],
    tipo: "Split",
    specs: {
      refrigeracion: "60.000 BTU/h",
      calefaccion: "",
      caudalEvaporador: "2.200 m³/h",
      caudalCondensador: "5.800 m³/h",
      dimensiones: "195 (A) × 1.860 (L) × 2.990 (C) mm",
      peso: "60 kg",
      voltaje: "12V / 24V",
      corriente: "40 A",
      compresor: "QP 21",
    },
    opcionales: [],
  },
];

// --------------------------------------------------------------- Utilidades

export const etiquetasSpecs: Record<keyof Especificaciones, string> = {
  refrigeracion: "Capacidad de refrigeración",
  calefaccion: "Capacidad de calefacción",
  caudalEvaporador: "Caudal de aire — evaporador",
  caudalCondensador: "Caudal de aire — condensador",
  dimensiones: "Dimensiones",
  peso: "Peso",
  voltaje: "Voltaje",
  corriente: "Corriente",
  compresor: "Compresor",
};

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function productosPorLinea(linea: LineaId): Producto[] {
  return productos.filter((p) => p.lineas.includes(linea));
}

export function getLinea(id: string): Linea | undefined {
  return lineas.find((l) => l.id === id);
}

/** Especificaciones con valor, en orden de presentación. */
export function specsConValor(p: Producto): [string, string][] {
  return (Object.keys(etiquetasSpecs) as (keyof Especificaciones)[])
    .filter((k) => p.specs[k].trim() !== "")
    .map((k) => [etiquetasSpecs[k], p.specs[k]]);
}
