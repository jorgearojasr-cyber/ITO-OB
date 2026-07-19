type IconCategory = "WINDOW" | "DOOR" | "FLOOR" | "ELECTRICAL" | "WATER" | "VENTILATION" | "STRUCTURE";

const CATEGORY_BY_SLUG: Record<string, IconCategory> = {
  ventanas: "WINDOW",
  "puerta-de-acceso": "DOOR",
  "puertas-correderas": "DOOR",
  piso: "FLOOR",
  "piso-exterior": "FLOOR",
  "enchufes-e-interruptores": "ELECTRICAL",
  "tablero-electrico": "ELECTRICAL",
  "llave-de-agua-y-lavaplatos": "WATER",
  griferia: "WATER",
  "llave-de-paso-de-agua": "WATER",
  "conexion-de-lavadora": "WATER",
  "impermeabilizacion-y-sellos": "WATER",
  "artefactos-sanitarios": "WATER",
  "calefont-o-termo": "WATER",
  ventilacion: "VENTILATION",
  "campana-extractora": "VENTILATION",
  canaletas: "VENTILATION",
};

const ICONS: Record<IconCategory, React.ReactNode> = {
  WINDOW: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="1" stroke="#2C5A87" strokeWidth="1.6" />
      <path d="M10 3V17M3 10H17" stroke="#2C5A87" strokeWidth="1.6" />
    </svg>
  ),
  DOOR: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="2" width="10" height="16" rx="0.8" stroke="#6B4322" strokeWidth="1.6" />
      <circle cx="12.5" cy="10" r="0.9" fill="#6B4322" />
    </svg>
  ),
  FLOOR: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="6.5" height="6.5" stroke="#5A6472" strokeWidth="1.6" />
      <rect x="11" y="2.5" width="6.5" height="6.5" stroke="#5A6472" strokeWidth="1.6" />
      <rect x="2.5" y="11" width="6.5" height="6.5" stroke="#5A6472" strokeWidth="1.6" />
      <rect x="11" y="11" width="6.5" height="6.5" stroke="#5A6472" strokeWidth="1.6" />
    </svg>
  ),
  ELECTRICAL: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="3" width="12" height="14" rx="2" stroke="#8A5A0F" strokeWidth="1.6" />
      <circle cx="8" cy="9" r="1" fill="#8A5A0F" />
      <circle cx="12" cy="9" r="1" fill="#8A5A0F" />
    </svg>
  ),
  WATER: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2.5C7 6 5 9 5 11.5C5 14.5 7.2 16.5 10 16.5C12.8 16.5 15 14.5 15 11.5C15 9 13 6 10 2.5Z"
        stroke="#2450A8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  VENTILATION: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#2E9E68" strokeWidth="1.6" />
      <path d="M10 5V10L13 12" stroke="#2E9E68" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  STRUCTURE: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M3 17V8L10 3L17 8V17" stroke="#5A6472" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 17V11H13V17" stroke="#5A6472" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
};

export function ElementIcon({ elementTemplateSlug }: { elementTemplateSlug: string }) {
  const category = CATEGORY_BY_SLUG[elementTemplateSlug] ?? "STRUCTURE";
  return ICONS[category];
}
