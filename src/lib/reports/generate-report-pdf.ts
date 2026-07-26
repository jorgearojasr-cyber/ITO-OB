import "server-only";

import { headers, cookies } from "next/headers";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/db/prisma";

async function resolveOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("host");
  if (!host) {
    throw new Error("No se pudo determinar el host para generar el PDF");
  }
  const proto = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

async function resolveCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

// @sparticuz/chromium solo trae un binario para el runtime Linux de
// Vercel/Lambda — en desarrollo local (Windows/Mac) hay que apuntar
// puppeteer-core al Chrome ya instalado en la máquina vía esta env var.
async function launchBrowser() {
  if (process.env.VERCEL) {
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (!executablePath) {
    throw new Error(
      "Define PUPPETEER_EXECUTABLE_PATH en .env.local apuntando a un Chrome/Edge instalado para generar PDFs en desarrollo local.",
    );
  }
  return puppeteer.launch({ executablePath, headless: true });
}

// Se dispara vía after() desde closeInspection (o retryReportGeneration) sin
// bloquear la respuesta al usuario. Navega a la propia pantalla /informe
// (autenticado reenviando las cookies de la sesión que cerró la inspección)
// para reutilizar exactamente el HTML/CSS ya aprobado, incluido print.css.
export async function generateReportPdf(reportId: string): Promise<void> {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    select: { inspectionId: true },
  });
  if (!report) return;

  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null;
  try {
    const [origin, cookieHeader] = await Promise.all([resolveOrigin(), resolveCookieHeader()]);

    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ cookie: cookieHeader });
    await page.goto(`${origin}/inspecciones/${report.inspectionId}/informe`, {
      waitUntil: "networkidle0",
    });
    // Next.js hace streaming SSR — networkidle0 no garantiza que el
    // documento terminó de llegar completo (confirmado: informes largos
    // quedaban truncados en el PDF aunque la misma página cargada en un
    // navegador normal sí traía todo el contenido). Se espera el
    // marcador que /informe renderiza al final del todo antes de imprimir.
    await page.waitForSelector("#informe-render-complete", { timeout: 15_000 });
    await page.emulateMediaType("print");
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    const blob = await put(`reports/${report.inspectionId}.pdf`, Buffer.from(pdfBuffer), {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: true,
    });

    await prisma.report.update({
      where: { id: reportId },
      data: { status: "READY", pdfStorageKey: blob.url, errorMessage: null },
    });
  } catch (error) {
    console.error(`generateReportPdf falló para report ${reportId}:`, error);
    await prisma.report.update({
      where: { id: reportId },
      data: { status: "FAILED", errorMessage: error instanceof Error ? error.message : String(error) },
    });
  } finally {
    await browser?.close();
  }
}
