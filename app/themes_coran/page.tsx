import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NewThemeDialogForm } from "../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../components/serverActions/themeCoranAction";
import Link from "next/link";
import { ThemeItem } from "@/components/clientComponents/theme/themeItem";
import { ListThemes } from "@/components/clientComponents/theme/listThemes";

export const themeWithSubThemes =
  Prisma.validator<Prisma.theme$subThemesArgs>()({
    include: {
      subThemes: true,
    },
  });
export type ThemeWithSubThemes = Prisma.themeGetPayload<
  typeof themeWithSubThemes
>;

export default async function Page() {
  const themes = await prisma.theme.findMany({
    include: { subThemes: true },
  });

  const getAllThemesWithRecursiveSubThemes = (
    theme: ThemeWithSubThemes,
    subLevel: number
  ) => {
    if (theme.subThemes.length > 0) {
      const subThemes = themes.filter((t) => t.parentId === theme.id);
      const className = "ml-" + subLevel + " pl-4";
      return (
        <div className={className}>
          <ThemeItem theme={{ ...theme }} />

          {subThemes.map((s) =>
            getAllThemesWithRecursiveSubThemes(s, subLevel + 2)
          )}
        </div>
      );
    } else {
      return (
        <div className={`ml-${subLevel} pl-4`}>
          <ThemeItem theme={{ ...theme }} />
        </div>
      );
    }
  };

  return (
    <div>
      <NewThemeDialogForm onSubmitForm={createNewThemeCoran} />

      <ListThemes themes={themes} />
    </div>
  );
}
