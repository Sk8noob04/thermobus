/**
 * ============================================================================
 *  CATÁLOGO DE PRODUCTOS ARCO — THERMOBUS
 * ============================================================================
 *
 *  Fuente única: ficha comercial oficial de ARCO Climatização / Thermobus
 *  ("Línea de aire acondicionado", tecnología brasileña).
 *
 *  Todos los datos técnicos de este archivo salen de esa ficha. No se mezcla
 *  con otras fuentes: si algún dato falta, se deja vacío ("") y simplemente
 *  no se renderiza, en vez de rellenarlo por aproximación.
 *
 *  Las imágenes están en /public/productos/<slug>.png
 *
 *  Esta estructura está pensada para migrar a un CMS sin tocar componentes:
 *  basta reemplazar `export const productos` por un fetch que devuelva el
 *  mismo tipo `Producto[]`.
 * ============================================================================
 */

export type LineaId = "urbano" | "electrico" | "articulado" | "microbus";

export interface Linea {
  id: LineaId;
  nombre: string;
  titulo: string;
  descripcion: string;
}

export interface Especificaciones {
  capacidad: string;
  caudal: string;
  tension: string;
  gas: string;
  dimensiones: string;
}

export interface Producto {
  slug: string;
  modelo: string;
  descripcion: string;
  linea: LineaId;
  /** BTU/h como número, para ordenar y comparar. */
  btu: number;
  destacado?: boolean;
  /** Nota adicional de la ficha, p. ej. "por módulo". */
  nota?: string;
  specs: Especificaciones;
}

export const lineas: Linea[] = [
  {
    id: "urbano",
    nombre: "Urbanos e interurbanos",
    titulo: "Aire acondicionado para autobuses urbanos e interurbanos",
    descripcion:
      "La línea de mayor capacidad para operación convencional: de 130.000 a 175.000 BTU/h, en 24V y refrigerante R134a. Cubre desde el bus urbano de alta frecuencia hasta la ruta interurbana de trayecto largo.",
  },
  {
    id: "electrico",
    nombre: "Eléctricos",
    titulo: "Aire acondicionado para autobús eléctrico urbano",
    descripcion:
      "Equipos desarrollados para chasis eléctrico, con refrigerante R407c y consumo optimizado para no comprometer la autonomía de la batería.",
  },
  {
    id: "articulado",
    nombre: "Articulados",
    titulo: "Aire acondicionado para autobús articulado y biarticulado",
    descripcion:
      "Sistemas modulares de 220.000 y 240.000 BTU/h para flotas BRT. Cada equipo se compone de dos módulos que climatizan el vehículo completo de forma equilibrada.",
  },
  {
    id: "microbus",
    nombre: "Microbús",
    titulo: "Aire acondicionado para microbuses y busetas",
    descripcion:
      "Equipos compactos y livianos de 70.000 a 110.000 BTU/h, en versiones de techo y con condensador separado. Disponibles en 12V y 24V para transporte convencional, escolar y especial.",
  },
];

export const productos: Producto[] = [
  // ------------------------------------------ URBANOS E INTERURBANOS
  {
    slug: "a450",
    modelo: "A450",
    descripcion:
      "El equipo de mayor capacidad de la línea convencional. Pensado para autobuses de gran porte con alta carga térmica y operación continua.",
    linea: "urbano",
    btu: 175000,
    destacado: true,
    specs: {
      capacidad: "175.000 Btu/h",
      caudal: "8.800 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "199 × 1.850 × 3.550 mm",
    },
  },
  {
    slug: "a380",
    modelo: "A380",
    descripcion:
      "Alta capacidad con el mismo caudal de aire del A450 en un equipo de referencia para flotas urbanas e interurbanas exigentes.",
    linea: "urbano",
    btu: 155000,
    destacado: true,
    specs: {
      capacidad: "155.000 Btu/h",
      caudal: "8.800 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "199 × 1.850 × 3.550 mm",
    },
  },
  {
    slug: "a370",
    modelo: "A370",
    descripcion:
      "Equilibrio entre capacidad y consumo para la operación diaria. Uno de los modelos de mayor rotación de la línea.",
    linea: "urbano",
    btu: 140000,
    specs: {
      capacidad: "140.000 Btu/h",
      caudal: "6.600 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "195 × 1.860 × 2.990 mm",
    },
  },
  {
    slug: "a340",
    modelo: "A340",
    descripcion:
      "La opción de entrada de la línea convencional, para vehículos de menor carga térmica sin resignar desempeño.",
    linea: "urbano",
    btu: 130000,
    specs: {
      capacidad: "130.000 Btu/h",
      caudal: "6.600 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "195 × 1.860 × 2.990 mm",
    },
  },

  // --------------------------------------------------- ELÉCTRICOS
  {
    slug: "a370-electrico",
    modelo: "A370 Eléctrico",
    descripcion:
      "Versión para chasis eléctrico urbano, con refrigerante R407c y el caudal de aire de la línea A370.",
    linea: "electrico",
    btu: 110000,
    destacado: true,
    specs: {
      capacidad: "110.000 Btu/h",
      caudal: "6.600 m³/h",
      tension: "24V",
      gas: "R407c",
      dimensiones: "195 × 1.860 × 3.326 mm",
    },
  },
  {
    slug: "a260-electrico",
    modelo: "A260 Eléctrico",
    descripcion:
      "Equipo compacto para chasis eléctrico de menor porte, con refrigerante R407c y condensador integrado.",
    linea: "electrico",
    btu: 90000,
    specs: {
      capacidad: "90.000 Btu/h",
      caudal: "4.400 m³/h",
      tension: "24V",
      gas: "R407c",
      dimensiones: "200 × 1.550 × 2.653 mm",
    },
  },

  // -------------------------------------------------- ARTICULADOS
  {
    slug: "a640",
    modelo: "A640",
    descripcion:
      "Sistema modular de máxima capacidad para articulados y biarticulados. Climatiza el vehículo completo de forma equilibrada en toda su longitud.",
    linea: "articulado",
    btu: 240000,
    destacado: true,
    nota: "Dimensiones por módulo",
    specs: {
      capacidad: "240.000 Btu/h",
      caudal: "13.200 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "195 × 1.860 × 2.990 mm",
    },
  },
  {
    slug: "a620",
    modelo: "A620",
    descripcion:
      "Sistema modular para articulados y biarticulados, con el mismo caudal de aire del A640 en una capacidad ajustada a flotas de recorrido medio.",
    linea: "articulado",
    btu: 220000,
    nota: "Dimensiones por módulo",
    specs: {
      capacidad: "220.000 Btu/h",
      caudal: "13.200 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "195 × 1.860 × 2.990 mm",
    },
  },

  // ----------------------------------------------------- MICROBÚS
  {
    slug: "a290",
    modelo: "A290",
    descripcion:
      "El equipo de mayor capacidad de la línea microbús, para vehículos midi de recorrido urbano e interurbano.",
    linea: "microbus",
    btu: 110000,
    destacado: true,
    specs: {
      capacidad: "110.000 Btu/h",
      caudal: "4.400 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "200 × 1.550 × 2.350 mm",
    },
  },
  {
    slug: "a260",
    modelo: "A260",
    descripcion:
      "Equipo de techo para microbús y bus midi, con el mismo formato del A290 en una capacidad más ajustada.",
    linea: "microbus",
    btu: 100000,
    specs: {
      capacidad: "100.000 Btu/h",
      caudal: "4.400 m³/h",
      tension: "24V",
      gas: "R134a",
      dimensiones: "200 × 1.550 × 2.350 mm",
    },
  },
  {
    slug: "a250t",
    modelo: "A250T",
    descripcion:
      "Equipo de techo compacto disponible en 12V y 24V, para microbús urbano e interurbano.",
    linea: "microbus",
    btu: 90000,
    specs: {
      capacidad: "90.000 Btu/h",
      caudal: "4.400 m³/h",
      tension: "12V y 24V",
      gas: "R134a",
      dimensiones: "199 × 1.210 × 2.250 mm",
    },
  },
  {
    slug: "a210t",
    modelo: "A210T",
    descripcion:
      "El equipo de techo más liviano de la línea, para microbuses de menor porte y transporte escolar.",
    linea: "microbus",
    btu: 75000,
    specs: {
      capacidad: "75.000 Btu/h",
      caudal: "4.400 m³/h",
      tension: "12V y 24V",
      gas: "R134a",
      dimensiones: "199 × 1.210 × 2.250 mm",
    },
  },
  {
    slug: "a250ct",
    modelo: "A250CT",
    descripcion:
      "Versión con condensador separado, para vehículos donde el espacio en el techo es limitado o la altura total es una restricción.",
    linea: "microbus",
    btu: 80000,
    nota: "Dimensiones del condensador",
    specs: {
      capacidad: "80.000 Btu/h",
      caudal: "3.300 m³/h",
      tension: "12V y 24V",
      gas: "R134a",
      dimensiones: "195 × 1.205 × 1.115 mm",
    },
  },
  {
    slug: "a210ct",
    modelo: "A210CT",
    descripcion:
      "La configuración más compacta del catálogo, con condensador separado, para busetas y transporte especial.",
    linea: "microbus",
    btu: 70000,
    nota: "Dimensiones del condensador",
    specs: {
      capacidad: "70.000 Btu/h",
      caudal: "3.300 m³/h",
      tension: "12V y 24V",
      gas: "R134a",
      dimensiones: "195 × 1.205 × 1.115 mm",
    },
  },
];

// --------------------------------------------------------------- Utilidades

export const etiquetasSpecs: Record<keyof Especificaciones, string> = {
  capacidad: "Capacidad",
  caudal: "Caudal de aire",
  tension: "Tensión",
  gas: "Gas refrigerante",
  dimensiones: "Dimensiones (A × L × C)",
};

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function productosPorLinea(linea: LineaId): Producto[] {
  return productos.filter((p) => p.linea === linea);
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

/** Rango de capacidad del catálogo, para los textos de la home. */
export const rangoBtu = {
  min: Math.min(...productos.map((p) => p.btu)),
  max: Math.max(...productos.map((p) => p.btu)),
};
