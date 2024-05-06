import { prisma } from "@/prisma/client";
import { NewThemeDialogForm } from "../../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../../components/serverActions/themeCoranAction";
import Link from "next/link";
import ThemeSearchAyat from "../../../components/serverComponents/ThemeSearchAyat";
import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";

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
        <ThemeSearchAyat themeId={Number(params.themeCoranId)} />
        {theme?.ayats.map((a) => (
          <AyatCard
            key={a.id}
            ayat={a}
            titreSourate={a.sourate.titre}
            themeId={theme.id}
          />
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
