import { prisma } from "@/prisma/client";
import { ThemeDialogForm } from "../../../components/clientComponents/theme/newThemeDialogForm";
import {
  createNewThemeCoran,
  updateThemeName,
} from "../../../components/serverActions/themeCoranAction";
import Link from "next/link";
import ThemeSearchAyat from "../../../components/serverComponents/ThemeSearchAyat";
import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";
import { getAuthSession } from "@/lib/auth";
import { ayat } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleWarning, Pencil, Trash, Undo2 } from "lucide-react";
import { DeleteThemeBtn } from "@/components/clientComponents/theme/deleteThemeBtn";
import { FavorisBtn } from "@/components/clientComponents/favoris/favorisBtn";
import { toogleFavoriteTheme } from "@/components/serverActions/favorisAction";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const allOtherThemes = await prisma.theme.findMany({
    where: { NOT: { id: Number(params.themeCoranId) } },
  });

  if (theme === null) {
    throw new Error("Ce thème n'existe pas!");
  }

  const session = await getAuthSession();
  const user = await prisma.user.findFirst({
    where: { id: session?.user.id },
    include: { myAyats: true, myThemes: true },
  });
  const isAyatFavorite = (ayat: ayat) => {
    if (!session) return false;
    if (user) return user.myAyats.some((a) => a.id === ayat.id);
    return false;
  };

  const isThemeFavorite = () => {
    if (!session) return false;
    if (user) {
      return user.myThemes.some((t) => t.id === theme.id);
    }
    return false;
  };

  const getContent = () => {
    if (!session && theme.subThemes.length === 0 && theme.ayats.length === 0) {
      return (
        <Alert>
          <MessageCircleWarning className="h-4 w-4" />

          <AlertTitle>Oups</AlertTitle>
          <AlertDescription>
            Ce thème n&apos; pas encore de Ayats associées!
          </AlertDescription>
        </Alert>
      );
    }
    if (theme?.subThemes && theme.subThemes.length > 0) {
      //si il y a des sous thèmes
      return theme?.subThemes.map((subTheme) => (
        <Link href={`/themes_coran/${subTheme.id}`} key={subTheme.id}>
          <div className="p-5 border mb-3 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer text-center text-xl bg-card">
            {subTheme.name}
          </div>
        </Link>
      ));
    }
    //si pas de sous thèmes
    return (
      <Card>
        {session && session.user.role === "ADMIN" && (
          <div className="m-auto w-3/4 my-5 md:my-16">
            <ThemeSearchAyat themeId={Number(params.themeCoranId)} />
          </div>
        )}
        <CardContent className="space-y-5 pt-5  p-3 md:p-6">
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
      <h2 className="text-4xl md:text-6xl text-center">{theme?.name}</h2>
      <div className="flex justify-end gap-2 mt-10 mb-2 ">
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
        <FavorisBtn
          isFavorite={isThemeFavorite()}
          handleClick={toogleFavoriteTheme}
          id={theme.id}
        />
        {session && session.user.role === "ADMIN" && (
          <>
            <ThemeDialogForm
              onSubmitForm={updateThemeName}
              parentId={Number(params.themeCoranId)}
              theme={theme}
              parentThemes={allOtherThemes}
            />
            <ThemeDialogForm
              onSubmitForm={createNewThemeCoran}
              parentId={Number(params.themeCoranId)}
            />
            <DeleteThemeBtn themeId={theme.id} />
          </>
        )}
      </div>
      {getContent()}
    </div>
  );
}
