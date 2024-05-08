import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NewThemeDialogForm } from "../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../components/serverActions/themeCoranAction";
import Link from "next/link";

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
    where: { parentId: null },
    include: { subThemes: true },
  });

  const test = async (theme: ThemeWithSubThemes, subLevel: number) => {
    if (theme.subThemes.length > 0) {
      const subThemes = await prisma.theme.findMany({
        where: { parentId: theme.id },
        include: { subThemes: true },
      });
      const className = "ml-" + subLevel + " pl-4";
      return (
        <div className={className}>
          <Link
            href={`/themes_coran/${theme.id}`}
            className={theme.parentId === null ? "font-bold text-xl" : ""}
          >
            {theme.name}
          </Link>
          {subThemes.map((s) => test(s, subLevel + 2))}
        </div>
      );
    } else {
      return (
        <div className={`ml-${subLevel} pl-4`}>
          <Link
            href={`/themes_coran/${theme.id}`}
            className={theme.parentId === null ? "font-bold text-xl" : ""}
          >
            {theme.name}
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <NewThemeDialogForm onSubmitForm={createNewThemeCoran} />

      <Card className="mt-5">
        <CardContent>{themes.map((t) => test(t, 0))}</CardContent>
      </Card>
    </div>
  );
}
