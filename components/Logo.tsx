import Image from "next/image";

/**
 * Logotipo oficial de Thermobus.
 *
 *  /public/logo.png         — versión para fondos claros
 *  /public/logo-blanco.png  — versión para fondos oscuros (invertido:false/true)
 *
 * Ambos son PNG con fondo transparente, recortados del original.
 */

export default function Logo({
  className = "",
  invertido = false,
  priority = false,
}: {
  className?: string;
  invertido?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={invertido ? "/logo-blanco.png" : "/logo.png"}
      alt="Thermobus — climatización para transporte"
      width={1493}
      height={204}
      sizes="(max-width: 640px) 220px, 420px"
      className={className}
      priority={priority}
    />
  );
}
