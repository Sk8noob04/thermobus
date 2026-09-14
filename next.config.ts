import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Habilitar cuando se usen imágenes remotas (CDN, CMS, etc.)
    remotePatterns: [],
  },
};

export default nextConfig;
