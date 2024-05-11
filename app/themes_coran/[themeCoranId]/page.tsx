import { prisma } from "@/prisma/client";
import { NewThemeDialogForm } from "../../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../../components/serverActions/themeCoranAction";
import Link from "next/link";
import ThemeSearchAyat from "../../../components/serverComponents/ThemeSearchAyat";
import { AyatCard } from "@/components/clientComponents/ayat/ayatCard";
import { getAuthSession } from "@/lib/auth";

export default async function ViewTheme({
  params,
}: {
  params: { themeCoranId: string };
}) {
  const theme = await prisma.theme.findUnique({
    where: { id: Number(params.themeCoranId) },
    include: { ayats: { include: { sourate: true } }, subThemes: true },
  });

  const session = await getAuthSession();

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
        {session && session.user.role === "ADMIN" && (
          <ThemeSearchAyat themeId={Number(params.themeCoranId)} />
        )}
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
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-6xl">{theme?.name}</h2>

        {session && session.user.role === "ADMIN" && (
          <NewThemeDialogForm
            onSubmitForm={createNewThemeCoran}
            parentId={Number(params.themeCoranId)}
          />
        )}
      </div>
      {getContent()}
    </div>
  );
}
