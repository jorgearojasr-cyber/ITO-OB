import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { LibraryCategoryGrid } from "@/components/biblioteca/LibraryCategoryGrid";
import { getLibraryCategories } from "@/lib/library/get-library-categories";
import styles from "./page.module.css";

export default async function BibliotecaPage() {
  const categories = await getLibraryCategories();

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <BackHeader title="Biblioteca técnica" backHref="/" />
        <LibraryCategoryGrid categories={categories} />
      </div>
      <BottomNav active="biblioteca" />
    </div>
  );
}
