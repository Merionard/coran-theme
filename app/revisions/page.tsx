import { ExoOral } from "@/components/clientComponents/revisions/exoOral";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { MessageCircleWarning } from "lucide-react";

export default async function Revisions() {
  const session = await getAuthSession();
  if (!session) {
    return (
      <Alert>
        <MessageCircleWarning className="h-4 w-4" />
        <AlertTitle>Oups</AlertTitle>
        <AlertDescription>
          Vous devez vous connecter pour accéder à vos Ayats!
        </AlertDescription>
      </Alert>
    );
  }
  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { myAyats: true },
  });
  if (!userData) {
    return (
      <Alert>
        <MessageCircleWarning className="h-4 w-4" />
        <AlertTitle>Oups</AlertTitle>
        <AlertDescription>Une erreur est survenue</AlertDescription>
      </Alert>
    );
  }

  return <ExoOral ayats={userData.myAyats} />;
}