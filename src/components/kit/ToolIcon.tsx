const ICONS: Record<string, React.ReactNode> = {
  "regla-huincha": (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="8" width="15" height="4" rx="1" transform="rotate(-15 2.5 8)" stroke="#DD7A36" strokeWidth="1.5" />
      <path d="M5.3 8.6L5.9 10.4M8 7.7L8.6 9.5M10.7 6.8L11.3 8.6M13.4 5.9L14 7.7" stroke="#DD7A36" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  nivel: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="8.5" width="15" height="4" rx="1" stroke="#DD7A36" strokeWidth="1.5" />
      <circle cx="10" cy="10.5" r="1.4" stroke="#DD7A36" strokeWidth="1.3" />
    </svg>
  ),
  "nivel-carpintero": (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="8.5" width="15" height="4" rx="1" stroke="#DD7A36" strokeWidth="1.5" />
      <circle cx="6.5" cy="10.5" r="1.1" stroke="#DD7A36" strokeWidth="1.2" />
      <circle cx="13.5" cy="10.5" r="1.1" stroke="#DD7A36" strokeWidth="1.2" />
    </svg>
  ),
  escuadra: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M4 16V5C4 4.4 4.4 4 5 4H16" stroke="#DD7A36" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16H14" stroke="#DD7A36" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  plomada: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5V6" stroke="#DD7A36" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 6C7 6 5.5 8.5 7 11L10 17.5L13 11C14.5 8.5 13 6 10 6Z" stroke="#DD7A36" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  laina: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M3 6L14 4L17 15L6 17L3 6Z" stroke="#DD7A36" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5.5 6.5L7.5 15.5" stroke="#DD7A36" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M8.5 6L10.5 15" stroke="#DD7A36" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  galga: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M3 10C3 8 4.5 6 8 6H15" stroke="#DD7A36" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.5 3.5L15.5 6L12.5 8.5" stroke="#DD7A36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 10C17 12 15.5 14 12 14H5" stroke="#DD7A36" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 11.5L4.5 14L7.5 16.5" stroke="#DD7A36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  martillo: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="10.5" y="3" width="6" height="4" rx="1" transform="rotate(45 10.5 3)" stroke="#DD7A36" strokeWidth="1.5" />
      <path d="M9.5 8.5L4 14" stroke="#DD7A36" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  linterna: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M6 8H12L11 3H7L6 8Z" stroke="#DD7A36" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="6" y="8" width="6" height="8" rx="1" stroke="#DD7A36" strokeWidth="1.4" />
      <path d="M14 6L16 5M14 9H16.5M14 12L16 13" stroke="#DD7A36" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "detector-corriente": (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="4" width="12" height="12" rx="2" stroke="#DD7A36" strokeWidth="1.5" />
      <path d="M11 7L7.5 11H10L9 13.5L12.5 9.5H10L11 7Z" fill="#DD7A36" />
    </svg>
  ),
  "cinta-adhesiva": (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#DD7A36" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3" stroke="#DD7A36" strokeWidth="1.5" />
    </svg>
  ),
  celular: (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="6" y="2.5" width="8" height="15" rx="1.5" stroke="#DD7A36" strokeWidth="1.5" />
      <path d="M9 15.2H11" stroke="#DD7A36" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7" stroke="#DD7A36" strokeWidth="1.5" />
  </svg>
);

export function ToolIcon({ id }: { id: string }) {
  return <>{ICONS[id] ?? FALLBACK_ICON}</>;
}
