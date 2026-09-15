import Image from "next/image";

/**
 * Logotipo oficial de ARCO Climatização.
 *
 *  /public/arco.png         — versión a color, para fondos claros
 *  /public/arco-blanco.png  — versión en blanco, para fondos oscuros
 */

export default function LogoArco({
  className = "",
  invertido = false,
  sizes = "260px",
  priority = false,
}: {
  className?: string;
  invertido?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={invertido ? "/arco-blanco.png" : "/arco.png"}
      alt="ARCO Climatização"
      width={1200}
      height={385}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
