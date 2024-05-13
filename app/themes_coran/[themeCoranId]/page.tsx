import { prisma } from "@/prisma/client";
import { NewThemeDialogForm } from "../../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../../components/serverActions/themeCoranAction";
import Link from "next/link";
import ThemeSearchAyat from "../../../components/serverComponents/ThemeSearchAyat";
import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";
import { getAuthSession } from "@/lib/auth";
import { ayat } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Undo2 } from "lucide-react";

export default async function ViewTheme({
  params,
}: {
  params: { themeCoranId: string };
}) {
  const theme = await prisma.theme.findUnique({
    where: { id: Number(params.themeCoranId) },
    include: {
      ayats: {
        include: { sourate: true },
        orderBy: [{ sourate_number: "asc" }, { number: "asc" }],
      },
      subThemes: true,
    },
  });

  const session = await getAuthSession();
  const user = await prisma.user.findFirst({
    where: { id: session?.user.id },
    include: { myAyats: true },
  });
  const isAyatFavorite = (ayat: ayat) => {
    if (!session) return false;
    if (user) return user.myAyats.some((a) => a.id === ayat.id);
    return false;
  };

  const getContent = () => {
    if (theme?.subThemes && theme.subThemes.length > 0) {
      //si il y a des sous thèmes
      return theme?.subThemes.map((subTheme) => (
        <div key={subTheme.id} className="p-5 border mb-3">
          <Link href={`/themes_coran/${subTheme.id}`}>{subTheme.name}</Link>
        </div>
      ));
    }
    //si pas de sous thèmes
    return (
      <Card>
        {session && session.user.role === "ADMIN" && (
          <div className="m-auto w-3/4 my-16">
            <ThemeSearchAyat themeId={Number(params.themeCoranId)} />
          </div>
        )}
        <CardContent>
          {theme?.ayats.map((a) => (
            <AyatCard
              key={a.id}
              ayat={a}
              titreSourate={a.sourate.titre}
              themeId={theme.id}
              isFavorite={isAyatFavorite(a)}
            />
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <h2 className="text-6xl text-center">{theme?.name}</h2>

      {session && session.user.role === "ADMIN" && (
        <div className="flex justify-end gap-2 mt-5 mb-2 ">
          <Button
            asChild
            variant={"outline"}
            size={"icon"}
            className="rounded-full"
          >
            <Link
              href={
                theme?.parentId !== null
                  ? `/themes_coran/${theme?.parentId}`
                  : "/themes_coran/"
              }
            >
              <Undo2 />
            </Link>
          </Button>
          <NewThemeDialogForm
            onSubmitForm={createNewThemeCoran}
            parentId={Number(params.themeCoranId)}
          />
          <Button
            variant={"destructive"}
            size={"icon"}
            className="rounded-full"
          >
            <Trash />
          </Button>
        </div>
      )}
      {getContent()}
    </div>
  );
}
