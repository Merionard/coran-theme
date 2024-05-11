import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { ayat } from "@prisma/client";

export default async function Myfavorites() {
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
        {data?.myAyats.map((ayat) => (
          <AyatCard
            ayat={ayat}
            titreSourate={ayat.sourate.titre}
            key={ayat.id}
            isFavorite={isAyatFavorite(ayat)}
          />
        ))}
      </div>
    );
  }
}
