import { BackHeader } from "@/components/ui/BackHeader";
import { BottomNav } from "@/components/inicio/BottomNav";
import { LibraryCategoryGrid } from "@/components/biblioteca/LibraryCategoryGrid";
import { getLibraryCategories } from "@/lib/library/get-library-categories";
import styles from "./page.module.css";

// Sin cookies/sesión de por medio, Next.js la prerenderiza en build por
// defecto -- eso obliga a Prisma a conectar a la base DESDE el sandbox
// de build, un entorno de red distinto al runtime normal (sin ruta
// IPv6, causa intermitente de fallos de build). Forzarla a dynamic
// evita tocar la base durante el build; la consulta pasa a runtime,
// donde ya sabemos que conecta bien.
export const dynamic = "force-dynamic";

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
