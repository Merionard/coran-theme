import { prisma } from "@/prisma/client";
import { NewThemeDialogForm } from "../newThemeDialogForm";
import { createNewThemeCoran } from "../themeCoranAction";
import Link from "next/link";
import ThemeSearchAyat from "./ThemeSearchAyat";

export default async function ViewTheme({
  params,
}: {
  params: { themeCoranId: string };
}) {
  const theme = await prisma.theme.findUnique({
    where: { id: Number(params.themeCoranId) },
    include: { ayats: { include: { sourate: true } }, subThemes: true },
  });

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
      <div>
        <ThemeSearchAyat />
        {theme?.ayats.map((a) => (
          <div key={a.id} className="p-5 border mb-3">
            <h3 className="text-xl font-bold">
              Sourate {a.sourate.titre} verset {a.content}
            </h3>
            <p className="text-right text-3xl">{a.content}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <NewThemeDialogForm
        onSubmitForm={createNewThemeCoran}
        parentId={Number(params.themeCoranId)}
      />
      <h2 className="text-center text-6xl mb-16">{theme?.name}</h2>
      {getContent()}
    </div>
  );
}
