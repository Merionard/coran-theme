import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { ayat } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircleWarning } from "lucide-react";
import { ThemeCard } from "@/components/clientComponents/theme/themeCard";
import Link from "next/link";

export default async function myThemes() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Vous devez vous connecter pour accéder au favoris");
  } else {
    const data = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        myThemes: { include: { ayats: { include: { sourate: true } } } },
      },
    });

    const isAyatFavorite = (themeId: number) => {
      if (!session) return false;
      if (data) return data.myThemes.some((a) => a.id === themeId);
      return false;
    };

    return (
      <div>
        <h2 className="text-center text-6xl mb-16">Mes thèmes</h2>
        {data && data.myThemes.length > 0 ? (
          data.myThemes.map((t) => (
            <Link href={`/themes_coran/${t.id}`} key={t.id}>
              <div className="p-5 border mb-3 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer text-center text-xl bg-card">
                {t.name}
              </div>
            </Link>
          ))
        ) : (
          <Alert>
            <MessageCircleWarning className="h-4 w-4" />

            <AlertTitle>Oups</AlertTitle>
            <AlertDescription>
              Vous n&apos; avez pas encore de thèmes favoris!
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
}
