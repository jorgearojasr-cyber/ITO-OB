import styles from "./CoverPhotoBanner.module.css";

type CoverPhotoBannerProps = {
  url: string | null;
  alt: string;
  // "card": miniatura dentro de la tarjeta de proyecto (lista de inspecciones).
  // "header": banda ancha bajo la cabecera al entrar al proyecto (recintos).
  // "hero": elemento visual principal del resumen.
  variant: "card" | "header" | "hero";
};

export function CoverPhotoBanner({ url, alt, variant }: CoverPhotoBannerProps) {
  return (
    <div className={`${styles.wrap} ${styles[variant]}`}>
      {url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={url} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderGlyph} aria-hidden="true">
            📷
          </span>
          <span className={styles.placeholderText}>Agregar fotografía de la vivienda</span>
        </div>
      )}
    </div>
  );
}
