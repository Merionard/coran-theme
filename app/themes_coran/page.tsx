import { ListThemes } from "@/components/clientComponents/theme/listThemes";
import { ThemeItem } from "@/components/clientComponents/theme/themeItem";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NewThemeDialogForm } from "../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../components/serverActions/themeCoranAction";
import { getAuthSession } from "@/lib/auth";

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

  const session = await getAuthSession();

  return (
    <div>
      <ListThemes
        themes={themes}
        admin={session !== null && session.user.role === "ADMIN"}
      />
    </div>
  );
}
