"use client";

import { BackHeader } from "@/components/ui/BackHeader";
import { ShareReportButton } from "@/components/ui/ShareReportButton";
import styles from "./InformeToolbar.module.css";

type InformeToolbarProps = {
  title: string;
  subtitle: string;
  backHref: string;
  shareUrl: string;
  shareText: string;
};

export function InformeToolbar({ title, subtitle, backHref, shareUrl, shareText }: InformeToolbarProps) {
  return (
    <div className="no-print">
      <BackHeader
        title={title}
        subtitle={subtitle}
        backHref={backHref}
        action={
          <div className={styles.actions}>
            <button type="button" className={styles.exportBtn} onClick={() => window.print()}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6 8V3.5H14V8M6 8H4.5C3.7 8 3 8.7 3 9.5V14.5C3 15.3 3.7 16 4.5 16H6M6 8H14M14 8H15.5C16.3 8 17 8.7 17 9.5V14.5C17 15.3 16.3 16 15.5 16H14M6 12H14V17H6V12Z"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Exportar a PDF
            </button>
            <ShareReportButton url={shareUrl} title="Informe de recepción" text={shareText} />
          </div>
        }
      />
    </div>
  );
}
