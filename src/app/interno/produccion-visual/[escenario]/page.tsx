import { notFound } from "next/navigation";
import Link from "next/link";
import { getScenario } from "@/lib/visual-production/production-data";
import { IMAGE_STATUS_LABEL } from "@/lib/visual-production/types";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ escenario: string }>;
};

export default async function ScenarioDetailPage({ params }: PageProps) {
  const { escenario } = await params;
  const scenario = getScenario(escenario);

  if (!scenario) {
    notFound();
  }

  return (
    <div className={styles.wrap}>
      <Link href="/interno/produccion-visual" className={styles.back}>
        ← Volver al dashboard
      </Link>

      <h1 className={styles.title}>
        {scenario.code} — {scenario.name}
      </h1>

      <div className={styles.constants}>
        <div>
          <strong>Elemento / Material:</strong> {scenario.elementName} — {scenario.materialLabel}
        </div>
        <div>
          <strong>Ubicación:</strong> {scenario.location}
        </div>
        <div>
          <strong>Cámara:</strong> {scenario.camera}
        </div>
        <div>
          <strong>Luz base:</strong> {scenario.baseLight}
        </div>
        <div>
          <strong>Color:</strong> {scenario.colorCriteria}
        </div>
        <div>
          <strong>Punto de vista:</strong> {scenario.viewpoint}
        </div>
      </div>

      {scenario.takes.map((take) => (
        <div key={take.code} className={styles.takeBlock}>
          <div className={styles.takeHeader}>
            <span className={styles.takeCode}>{take.code}</span>
            <span className={styles.takeName}>{take.name}</span>
            <span className={styles.takeMeta}>
              {take.framing} · luz {take.light}
            </span>
          </div>
          <p className={styles.takeDescription}>{take.description}</p>
          <div className={styles.takePoints}>
            Puntos de inspección referenciados: {take.inspectionPointIds.join(", ")}
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Variante</th>
                <th>Estado</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {take.images.map((image) => (
                <tr key={image.code}>
                  <td className={styles.imageCode}>{image.code}</td>
                  <td>
                    <span className={image.type === "BIEN" ? styles.tagBien : styles.tagMal}>{image.type}</span>
                  </td>
                  <td>{image.variantLabel ?? "—"}</td>
                  <td>
                    <span className={styles.statusPill}>{IMAGE_STATUS_LABEL[image.status]}</span>
                  </td>
                  <td>{image.observations ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
