import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["700", "800"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ObraBien Inspección",
  description: "Recorrido guiado para la recepción de tu vivienda nueva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
