import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — ${site.tagline}`,
    template: `%s | ${site.nombre}`,
  },
  description: site.descripcion,
  keywords: [
    "aire acondicionado para buses",
    "aire acondicionado bus Colombia",
    "ARCO climatización Colombia",
    "aire acondicionado microbús",
    "climatización transporte de pasajeros",
    "aire acondicionado bus articulado",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: site.nombre,
    title: `${site.nombre} — ${site.tagline}`,
    description: site.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nombre} — ${site.tagline}`,
    description: site.descripcion,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nombre,
  legalName: site.nombreLegal,
  description: site.descripcion,
  url: site.url,
  ...(site.contacto.email ? { email: site.contacto.email } : {}),
  telephone: site.contacto.telefono,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contacto.ciudad,
    addressCountry: "CO",
  },
  areaServed: { "@type": "Country", name: "Colombia" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {site.analytics.ga4 && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.analytics.ga4}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-800 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
