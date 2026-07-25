"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/ui/BackHeader";
import { ShareReportButton } from "@/components/ui/ShareReportButton";
import { retryReportGeneration } from "@/lib/inspections/actions";
import type { ReportStatus } from "@prisma/client";
import styles from "./InformeToolbar.module.css";

type InformeToolbarProps = {
  title: string;
  subtitle: string;
  backHref: string;
  shareUrl: string;
  shareText: string;
  inspectionId: string;
  report: { status: ReportStatus; pdfStorageKey: string | null } | null;
};

const PdfIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path
      d="M6 8V3.5H14V8M6 8H4.5C3.7 8 3 8.7 3 9.5V14.5C3 15.3 3.7 16 4.5 16H6M6 8H14M14 8H15.5C16.3 8 17 8.7 17 9.5V14.5C17 15.3 16.3 16 15.5 16H14M6 12H14V17H6V12Z"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function InformeToolbar({ title, subtitle, backHref, shareUrl, shareText, inspectionId, report }: InformeToolbarProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  // El PDF se genera en background — mientras esté PENDING, revalidamos
  // la pantalla cada 3s hasta que pase a READY/FAILED (sin infra de
  // polling nueva, es lo más simple dado que no hay websockets ni SSE
  // en el proyecto).
  useEffect(() => {
    if (report?.status !== "PENDING") return;
    const interval = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(interval);
  }, [report?.status, router]);

  async function handleRetry() {
    setIsRetrying(true);
    try {
      await retryReportGeneration(inspectionId);
      router.refresh();
    } finally {
      setIsRetrying(false);
    }
  }

  return (
    <div className="no-print">
      <BackHeader
        title={title}
        subtitle={subtitle}
        backHref={backHref}
        action={
          <div className={styles.actions}>
            {!report && (
              <button type="button" className={styles.exportBtn} onClick={() => window.print()}>
                <PdfIcon />
                Exportar a PDF
              </button>
            )}
            {report?.status === "PENDING" && (
              <button type="button" className={styles.exportBtn} disabled>
                <PdfIcon />
                Generando…
              </button>
            )}
            {report?.status === "READY" && report.pdfStorageKey && (
              <a href={report.pdfStorageKey} download className={styles.exportBtn}>
                <PdfIcon />
                Descargar PDF
              </a>
            )}
            {report?.status === "FAILED" && (
              <button type="button" className={styles.exportBtn} onClick={handleRetry} disabled={isRetrying}>
                <PdfIcon />
                {isRetrying ? "Reintentando…" : "Reintentar generación"}
              </button>
            )}
            <ShareReportButton url={shareUrl} title="Informe de recepción" text={shareText} />
          </div>
        }
      />
    </div>
  );
}
