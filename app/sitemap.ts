import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { productos } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const estaticas = ["", "/productos", "/nosotros", "/contacto"].map((ruta) => ({
    url: `${site.url}${ruta}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: ruta === "" ? 1 : 0.8,
  }));

  const fichas = productos.map((p) => ({
    url: `${site.url}/productos/${p.slug}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...estaticas, ...fichas];
}
