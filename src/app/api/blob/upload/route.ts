import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const organizationId = session.user.organizationId;

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const photoMatch = /^observations\/([^/]+)\/[^/]+$/.exec(pathname);
        const signatureMatch = /^signatures\/([^/]+)\/(owner|builder)-[^/]+\.png$/.exec(pathname);
        const coverMatch = /^inspections\/([^/]+)\/cover-[^/]+$/.exec(pathname);
        const isPhotoPath = photoMatch !== null;
        const isSignaturePath = signatureMatch !== null;
        const isCoverPath = coverMatch !== null;
        if (!isPhotoPath && !isSignaturePath && !isCoverPath) {
          throw new Error("Ruta de subida inválida");
        }

        // Defensa en profundidad: attachPhoto/setInspectionCoverPhoto ya
        // revalidan propiedad antes de escribir en la base, pero sin esto
        // cualquier usuario autenticado (de cualquier organización) podía
        // pedir un token de subida válido apuntando a un
        // Observation.id/Inspection.id ajeno.
        if (photoMatch) {
          const observationId = photoMatch[1];
          const owned = await prisma.observation.findFirst({
            where: {
              id: observationId,
              elementInstance: { roomInstance: { inspection: { organizationId } } },
            },
            select: { id: true },
          });
          if (!owned) {
            throw new Error("Observación no encontrada en esta organización.");
          }
        } else if (signatureMatch || coverMatch) {
          const inspectionId = (signatureMatch ?? coverMatch)![1];
          const owned = await prisma.inspection.findFirst({
            where: { id: inspectionId, organizationId },
            select: { id: true },
          });
          if (!owned) {
            throw new Error("Inspección no encontrada en esta organización.");
          }
        }

        return {
          allowedContentTypes: isSignaturePath
            ? ["image/png"]
            : ["image/jpeg", "image/png", "image/webp", "image/heic"],
          maximumSizeInBytes: isSignaturePath ? 1 * 1024 * 1024 : 15 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // La persistencia del Photo ocurre en el cliente vía el Server
        // Action attachPhoto una vez que upload() resuelve — este callback
        // no es alcanzable de forma confiable en desarrollo local.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al generar el token de subida" },
      { status: 400 },
    );
  }
}
