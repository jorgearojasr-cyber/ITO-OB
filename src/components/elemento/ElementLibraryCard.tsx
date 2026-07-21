import { ElementDetailAccordion } from "./ElementDetailAccordion";
import styles from "./ElementLibraryCard.module.css";

type ElementLibraryCardProps = {
  libraryArticle: { title: string; body: string; quickCheckItems: string[] } | null;
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10.5L8 14L15.5 6" stroke="#3FC98A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ElementLibraryCard({ libraryArticle }: ElementLibraryCardProps) {
  if (!libraryArticle) {
    return <div className={styles.empty}>Aún no hay ficha técnica para este elemento.</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.eyebrow}>CÓMO REVISARLO</div>
      <div className={styles.title}>{libraryArticle.title}</div>
      {libraryArticle.quickCheckItems.length > 0 && (
        <div className={styles.checklist}>
          {libraryArticle.quickCheckItems.map((item) => (
            <div key={item} className={styles.checklistRow}>
              <span className={styles.checklistIcon}>
                <CheckIcon />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
      <ElementDetailAccordion body={libraryArticle.body} />
    </div>
  );
}
