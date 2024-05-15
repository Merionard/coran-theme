import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { ayat } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircleWarning } from "lucide-react";

export default async function MyAyats() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Vous devez vous connecter pour accéder au favoris");
  } else {
    const data = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { myAyats: { include: { sourate: true } } },
    });

    const isAyatFavorite = (ayat: ayat) => {
      if (!session) return false;
      if (data) return data.myAyats.some((a) => a.id === ayat.id);
      return false;
    };

    return (
      <div>
        <h2 className="text-center text-4xl md:text-6xl mb-5 md:mb-16">
          Mes Ayats
        </h2>
        {data && data.myAyats.length > 0 ? (
          <div className="space-y-5">
            {data?.myAyats.map((ayat) => (
              <AyatCard
                ayat={ayat}
                titreSourate={ayat.sourate.titre}
                key={ayat.id}
                isFavorite={isAyatFavorite(ayat)}
              />
            ))}
          </div>
        ) : (
          <Alert>
            <MessageCircleWarning className="h-4 w-4" />

            <AlertTitle>Oups</AlertTitle>
            <AlertDescription>
              Vous n&apos; avez pas encore de favoris!
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
}
