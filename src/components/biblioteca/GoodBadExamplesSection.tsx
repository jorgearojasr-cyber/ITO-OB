import type { GoodBadExample } from "@/lib/library/good-bad-examples";
import styles from "./GoodBadExamplesSection.module.css";

type GoodBadExamplesSectionProps = {
  examples?: GoodBadExample[];
};

function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10.5L8 14L15.5 6" stroke="#3FC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
      <path d="M5 5L15 15M15 5L5 15" stroke="#b3261e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ExampleCard({
  kind,
  caption,
  imageUrl,
}: {
  kind: "good" | "bad";
  caption: string;
  imageUrl?: string;
}) {
  const isGood = kind === "good";
  return (
    <div className={isGood ? `${styles.card} ${styles.cardGood}` : `${styles.card} ${styles.cardBad}`}>
      <div className={isGood ? `${styles.thumb} ${styles.thumbGood}` : `${styles.thumb} ${styles.thumbBad}`}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className={styles.thumbImg} />
        ) : isGood ? (
          <CheckIcon />
        ) : (
          <CrossIcon />
        )}
      </div>
      <div className={isGood ? `${styles.label} ${styles.labelGood}` : `${styles.label} ${styles.labelBad}`}>
        {isGood ? "Bien" : "Mal"}
      </div>
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}

export function GoodBadExamplesSection({ examples }: GoodBadExamplesSectionProps) {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.sectionTitle}>Bien hecho vs. Mal hecho</div>
      {examples.map((example) => (
        <div key={example.title} className={styles.example}>
          <div className={styles.exampleTitle}>{example.title}</div>
          <div className={styles.exampleRef}>{example.toleranceRef}</div>
          <div className={styles.pair}>
            <ExampleCard kind="good" caption={example.good.caption} imageUrl={example.good.imageUrl} />
            <ExampleCard kind="bad" caption={example.bad.caption} imageUrl={example.bad.imageUrl} />
          </div>
        </div>
      ))}
    </div>
  );
}
