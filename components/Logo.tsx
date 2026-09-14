/**
 * Logotipo provisional en SVG (wordmark).
 *
 * CUANDO LLEGUE EL LOGO DEFINITIVO:
 *   1. Guardar el archivo en /public/logo.svg
 *   2. Reemplazar el cuerpo de este componente por:
 *        import Image from "next/image";
 *        export default function Logo({ className }: { className?: string }) {
 *          return <Image src="/logo.svg" alt="Thermobus" width={180} height={36}
 *                        className={className} priority />;
 *        }
 *   No hay que tocar ningún otro archivo.
 */

export default function Logo({
  className = "",
  invertido = false,
}: {
  className?: string;
  invertido?: boolean;
}) {
  const principal = invertido ? "#ffffff" : "#0d1b3e";
  const acento = invertido ? "#38c6ea" : "#12a9d1";

  return (
    <svg
      viewBox="0 0 220 40"
      className={className}
      role="img"
      aria-label="Thermobus"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Marca gráfica: copo/ventilador dentro de un cuadro */}
      <rect x="0" y="4" width="32" height="32" rx="7" fill={principal} />
      <g stroke={acento} strokeWidth="2.2" strokeLinecap="round">
        <path d="M16 11v18M8.5 15.25l15 9.5M23.5 15.25l-15 9.5" />
      </g>
      <circle cx="16" cy="20" r="3.4" fill={acento} />

      {/* Wordmark */}
      <text
        x="42"
        y="26"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="-0.4"
        fill={principal}
      >
        Thermo
        <tspan fill={acento}>bus</tspan>
      </text>
    </svg>
  );
}
