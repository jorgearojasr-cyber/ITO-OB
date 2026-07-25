import styles from "./InformeSignatures.module.css";

type InformeSignaturesProps = {
  signatureOwnerUrl: string;
  signatureBuilderUrl: string;
  signedAt: Date;
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function InformeSignatures({ signatureOwnerUrl, signatureBuilderUrl, signedAt }: InformeSignaturesProps) {
  return (
    <div className={`${styles.section} informe-signatures`}>
      <div className={styles.title}>Firmas</div>
      <div className={styles.grid}>
        <div className={styles.box}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={signatureOwnerUrl} alt="Firma del propietario" className={styles.image} />
          <div className={styles.label}>Firma propietario</div>
        </div>
        <div className={styles.box}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={signatureBuilderUrl} alt="Firma de la constructora" className={styles.image} />
          <div className={styles.label}>Firma constructora</div>
        </div>
      </div>
      <div className={styles.signedAt}>Firmado el {dateFormatter.format(signedAt)}</div>
    </div>
  );
}
