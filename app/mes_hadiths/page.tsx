import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { MessageCircleWarning } from "lucide-react";

export default async function MesHadiths() {
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
  } else {
    const data = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        myHadiths: {
          include: { hadithChapter: { include: { hadithBook: true } } },
        },
        hadithsLearned: {
          include: { hadithChapter: { include: { hadithBook: true } } },
        },
      },
    });
  }
}
