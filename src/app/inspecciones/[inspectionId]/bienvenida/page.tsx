import { notFound } from "next/navigation";
import { InspectionWelcome } from "@/components/onboarding/InspectionWelcome";
import { getInspectionWelcomeData } from "@/lib/inspections/get-inspection-welcome-data";

type PageProps = {
  params: Promise<{ inspectionId: string }>;
};

export default async function InspectionWelcomePage({ params }: PageProps) {
  const { inspectionId } = await params;
  const data = await getInspectionWelcomeData(inspectionId);

  if (!data) {
    notFound();
  }

  return (
    <InspectionWelcome
      userName={data.userName}
      projectName={data.projectName}
      unitLabel={data.unitLabel}
      continueHref={`/inspecciones/${inspectionId}/recintos/${data.firstRoomId}`}
    />
  );
}
