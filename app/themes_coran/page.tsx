import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { NewThemeDialogForm } from "../../components/clientComponents/theme/newThemeDialogForm";
import { createNewThemeCoran } from "../../components/serverActions/themeCoranAction";
import { Pencil } from "lucide-react";
import { ThemeItem } from "@/components/clientComponents/theme/themeItem";

export default async function Page() {
  const Themes = await prisma.theme.findMany({ where: { parent: null } });

  return (
    <div>
      <NewThemeDialogForm onSubmitForm={createNewThemeCoran} />

      <Card className="mt-5">
        <CardContent>
          <ul>
            {Themes.map((t) => (
              <ThemeItem theme={t} key={t.id} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
