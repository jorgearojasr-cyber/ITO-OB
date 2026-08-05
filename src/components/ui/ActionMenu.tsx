"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./ActionMenu.module.css";

export type ActionMenuAction = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
};

type ActionMenuProps = {
  actions: ActionMenuAction[];
  ariaLabel: string;
};

// Mecanismo genérico de "acciones por inspección" (Sprint UX-02): un botón
// trigger + menú flotante, reutilizable para Observaciones, Eliminar,
// Duplicar, etc. Sin ninguna acción concreta todavía -- cada pantalla decide
// qué `actions` pasarle. Si `actions` viene vacío, no renderiza nada, para
// poder integrarse en una fila ya existente sin exponer funcionalidad nueva.
export function ActionMenu({ actions, ariaLabel }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="4.5" r="1.6" fill="currentColor" />
          <circle cx="10" cy="10" r="1.6" fill="currentColor" />
          <circle cx="10" cy="15.5" r="1.6" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div className={styles.menu} role="menu" id={menuId}>
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              role="menuitem"
              disabled={action.disabled}
              className={`${styles.item} ${action.variant === "danger" ? styles.itemDanger : ""}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOpen(false);
                action.onSelect();
              }}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
