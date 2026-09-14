# Thermobus — sitio web

Sitio corporativo de **Thermobus**, representación comercial de **ARCO Climatização** (Brasil) en Colombia.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · 100 % estático.

---

## 1. Arranque rápido

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

---

## 2. Dónde se edita cada cosa

**Regla de oro: ningún componente tiene texto quemado.** Todo el contenido vive en dos archivos.

| Qué querés cambiar | Archivo |
|---|---|
| Teléfono, WhatsApp, correo, ciudad, horario | `content/site.ts` → `contacto` |
| Dominio final (para SEO y sitemap) | `content/site.ts` → `url` |
| Título y subtítulo del hero | `content/site.ts` → `hero` |
| Tarjetas de "Por qué Thermobus" | `content/site.ts` → `diferenciales` |
| Textos de la página Nosotros | `content/site.ts` → `nosotros` |
| Redes sociales (vacío = no se muestra) | `content/site.ts` → `redes` |
| ID de Google Analytics | `content/site.ts` → `analytics.ga4` |
| Modelos, BTU, fichas técnicas | `content/products.ts` |
| Colores de marca | `app/globals.css` → bloque `@theme` |
| Logo | `components/Logo.tsx` (instrucciones dentro) |

### Campos pendientes antes de publicar

Buscá `<<< COMPLETAR` en `content/site.ts`. Son 7 campos:

- Razón social
- Dominio real
- Ciudad y dirección
- Teléfono
- Número de WhatsApp (solo dígitos, con indicativo: `573001234567`)
- Correo comercial

---

## 3. Hosting y dominio

### Publicar en Vercel (gratis para este sitio)

1. Subí el proyecto a un repositorio de GitHub.
2. Entrá a [vercel.com](https://vercel.com) → **Add New… → Project** → importá el repo.
3. Vercel detecta Next.js solo. Dale **Deploy**. Queda online en ~1 minuto.

El plan **Hobby** cubre este sitio sin costo. Si el cliente quiere factura a nombre de empresa o el sitio es comercial de forma estricta, Vercel pide plan **Pro (USD 20/mes)** — considerá venderlo como parte del mantenimiento.

**Alternativa sin costo comercial:** Cloudflare Pages, también gratis y sin esa restricción. Requiere agregar `output: "export"` en `next.config.ts` (el sitio ya es 100 % estático, no rompe nada).

### Conectar el dominio

En Vercel: **Project → Settings → Domains → Add** e ingresá el dominio.
Después, en el panel donde compraste el dominio, apuntá los registros:

| Tipo | Nombre | Valor |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Vercel emite el certificado SSL solo. Propaga en minutos (a veces hasta 24 h).

> Verificá los valores exactos en el panel de Vercel al momento de configurar: pueden cambiar.

### Correo corporativo

El dominio **no** incluye correo. Para `comercial@thermobus.com.co` hace falta contratarlo aparte: Google Workspace (~USD 7/usuario/mes), Zoho Mail (plan gratis limitado) o el correo que incluya el registrador.

---

## 4. Fotografía y logo — pendientes

El sitio funciona hoy con **placeholders geométricos** en lugar de fotos. Es intencional y se cambia en un solo lugar por imagen.

**Recomendación fuerte:** en vez de bajar las fotos del sitio de ARCO, pedile a la fábrica el **media kit oficial**. Como representantes en Colombia tienen derecho a pedirlo, y conviene por tres razones:

1. Las fotos del sitio están comprimidas para web — se ven mal en pantallas grandes.
2. El media kit suele traer PNG con fondo transparente y renders limpios de cada equipo.
3. Deja por escrito el permiso de uso de la marca, que es exactamente lo que respalda la venta.

Es un correo a `comercial.ketlyn@arcoclima.com.br`. Mientras llega, el sitio se puede publicar tal cual.

**Para reemplazar una imagen:**

```
public/productos/a640.jpg     ← foto del equipo
public/hero.jpg               ← foto de fondo del hero
public/logo.svg               ← logo definitivo
```

Los archivos que la usan tienen un comentario indicando exactamente qué línea cambiar (`ProductCard.tsx`, `app/page.tsx`, `components/Logo.tsx`).

---

## 5. Datos técnicos del catálogo

`content/products.ts` contiene **15 modelos** con fichas tomadas del sitio público de ARCO (consultado en septiembre de 2026).

⚠️ **Antes de publicar, confirmá con ARCO que esas fichas son las vigentes para exportación a Colombia.** Un BTU equivocado en una ficha pública es un problema comercial serio.

Pendiente puntual: el modelo **A620** no tiene ficha propia (la página de ARCO muestra los datos del A610). Quedó con los campos vacíos y la página muestra un botón de "solicitar ficha técnica" en su lugar — funciona, pero conviene pedir los datos reales.

---

## 6. Arquitectura: por qué esto escala

La decisión central es que **el contenido es data tipada, no JSX**. `Producto` y `Linea` son interfaces de TypeScript, y los componentes solo saben renderizar esas formas.

Consecuencia práctica: migrar a un CMS **no toca ni un componente**. Basta cambiar

```ts
export const productos: Producto[] = [ ... ]
```

por

```ts
export async function getProductos(): Promise<Producto[]> {
  return fetch(...)   // Sanity, Payload, Contentful, una hoja de cálculo…
}
```

Las rutas ya están armadas para crecer: `/productos/[slug]` genera una página estática por modelo, el sitemap se arma solo desde la data, y el formulario tiene el payload con la misma forma que necesitaría un endpoint real.

---

## 7. Roadmap de addons

Referencia de qué se puede vender después. Los precios son sugeridos — ajustalos a tu mercado.

### Nivel 1 — rápidos

| Addon | Qué implica | Sugerido |
|---|---|---|
| Fichas técnicas en PDF descargables | Subir los PDF y agregar el botón en cada ficha | USD 80 |
| Galería de fotos por producto | Carrusel en la página de detalle | USD 120 |
| Formulario con backend real | Route Handler + Resend, correo formateado + autorespuesta | USD 150 |
| Multi-idioma (ES / PT / EN) | `next-intl`, útil para hablar con la fábrica | USD 250 |

### Nivel 2 — sustanciales

| Addon | Qué implica | Sugerido |
|---|---|---|
| Panel de administración (CMS) | El cliente edita productos y textos sin tocar código | USD 400–600 |
| Blog / noticias | Sección de contenidos, clave para posicionamiento | USD 250 |
| Selector de equipo interactivo | El visitante ingresa chasis y pasajeros → recomienda modelo | USD 350 |
| Sección de repuestos | Catálogo de compresores y componentes | USD 300 |

### Nivel 3 — recurrentes (lo más rentable)

| Servicio | Qué incluye | Sugerido |
|---|---|---|
| Mantenimiento mensual | Hosting, actualizaciones, backups, cambios menores | USD 40–60/mes |
| SEO local | Google Business, contenido, reportes mensuales | USD 150/mes |
| Portal de distribuidores | Login, precios mayoristas, historial de pedidos | USD 800+ |
| Integración CRM | Los leads entran directo a HubSpot / Pipedrive | USD 300 |

**Consejo de venta:** el sitio base se entrega con SEO técnico, sitemap, datos estructurados y analítica listos. Eso ya es más de lo que se entrega por USD 300 en el mercado — usalo para justificar el precio y para que el addon se sienta continuidad, no reparación de algo incompleto.

---

## 8. Checklist antes de entregar

- [ ] Completar los 7 campos `<<< COMPLETAR` en `content/site.ts`
- [ ] Confirmar fichas técnicas con ARCO
- [ ] Conseguir logo definitivo → `public/logo.svg`
- [ ] Pedir media kit a ARCO y reemplazar placeholders
- [ ] Crear el correo corporativo
- [ ] Deploy en Vercel y conectar el dominio
- [ ] Crear la propiedad de Google Analytics y pegar el ID
- [ ] Enviar el sitemap en Google Search Console
- [ ] Probar el botón de WhatsApp desde un celular real
- [ ] Definir por escrito quién paga el hosting a partir del año 2
