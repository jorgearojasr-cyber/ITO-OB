import Link from "next/link";
import { getAllScenarioProgress } from "@/lib/visual-production/production-data";
import styles from "./page.module.css";

// Herramienta interna de producción -- no forma parte de la Biblioteca
// Técnica ni de la navegación de usuarios. No está enlazada desde
// ningún menú; el middleware de sesión (src/proxy.ts) ya exige login
// para llegar acá, igual que el resto de la app.

export default function ProduccionVisualDashboardPage() {
  const scenarios = getAllScenarioProgress();
  const totals = scenarios.reduce(
    (acc, s) => ({
      takes: acc.takes + s.takeCount,
      images: acc.images + s.imageCount,
      pending: acc.pending + s.pendingCount,
      approved: acc.approved + s.approvedCount + s.integratedCount,
    }),
    { takes: 0, images: 0, pending: 0, approved: 0 },
  );

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Sistema Maestro de Producción Visual</h1>
      <p className={styles.subtitle}>
        Herramienta interna — administra escenarios, tomas e imágenes de la Biblioteca Visual. No visible para
        usuarios de ObraBien.
      </p>

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{scenarios.length}</div>
          <div className={styles.summaryLabel}>Escenarios</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{totals.takes}</div>
          <div className={styles.summaryLabel}>Tomas</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{totals.images}</div>
          <div className={styles.summaryLabel}>Imágenes</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{totals.pending}</div>
          <div className={styles.summaryLabel}>Pendientes</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryValue}>{totals.approved}</div>
          <div className={styles.summaryLabel}>Aprobadas/Integradas</div>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Escenario</th>
            <th>Elemento / Material</th>
            <th>Tomas</th>
            <th>Imágenes</th>
            <th>Pendientes</th>
            <th>Aprobadas</th>
            <th>Avance</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map(({ scenario, takeCount, imageCount, pendingCount, approvedCount, integratedCount, progressPercent }) => (
            <tr key={scenario.code}>
              <td>
                <Link href={`/interno/produccion-visual/${scenario.code}`} className={styles.link}>
                  {scenario.code}
                </Link>
              </td>
              <td>
                {scenario.elementName} — {scenario.materialLabel}
              </td>
              <td>{takeCount}</td>
              <td>{imageCount}</td>
              <td>{pendingCount}</td>
              <td>{approvedCount + integratedCount}</td>
              <td>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                </div>
                <span className={styles.progressLabel}>{progressPercent}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
