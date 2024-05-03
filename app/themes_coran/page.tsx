import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { NewThemeDialogForm } from "./newThemeDialogForm";
import { createNewThemeCoran } from "./themeCoranAction";

export default async function Page() {
  const Themes = await prisma.theme.findMany({ where: { parent: null } });

  return (
    <div>
      <NewThemeDialogForm onSubmitForm={createNewThemeCoran} />

      <Card className="mt-5">
        <CardContent>
          <ul>
            {Themes.map((t) => (
              <li key={t.id}>
                <Link href={`/themes_coran/${t.id}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
