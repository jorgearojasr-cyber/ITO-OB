import styles from "./ElementLibraryCard.module.css";

type ElementLibraryCardProps = {
  libraryArticle: { title: string; summary: string; body: string } | null;
};

export function ElementLibraryCard({ libraryArticle }: ElementLibraryCardProps) {
  if (!libraryArticle) {
    return <div className={styles.empty}>Aún no hay ficha técnica para este elemento.</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.eyebrow}>CÓMO REVISARLO</div>
      <div className={styles.title}>{libraryArticle.title}</div>
      <div className={styles.summary}>{libraryArticle.summary}</div>
      <p className={styles.body}>{libraryArticle.body}</p>
    </div>
  );
}
