import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!/^observations\/[^/]+\/[^/]+$/.test(pathname)) {
          throw new Error("Ruta de subida inválida");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
          maximumSizeInBytes: 15 * 1024 * 1024,
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
