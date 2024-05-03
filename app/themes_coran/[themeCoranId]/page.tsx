import { prisma } from "@/prisma/client";
import { NewThemeDialogForm } from "../newThemeDialogForm";
import { createNewThemeCoran } from "../themeCoranAction";
import Link from "next/link";

export default async function ViewTheme({
  params,
}: {
  params: { themeCoranId: string };
}) {
  const theme = await prisma.theme.findUnique({
    where: { id: Number(params.themeCoranId) },
    include: { ayats: true, subThemes: true },
  });



  return (
    <div>
      <NewThemeDialogForm onSubmitForm={createNewThemeCoran} parentId={Number(params.themeCoranId)} />
      <h2 className="text-center text-6xl mb-16">Thème {theme?.name}</h2>
      {theme?.ayats.map((a) => (
        <div key={a.id} className="p-5 border mb-3">
          <h3 className="text-xl font-bold">
            Sourate {a.sourate} verset {a.verset}
          </h3>
          <p className="text-right text-3xl">{a.content}</p>
        </div>
      ))}
      {theme?.subThemes.map((subTheme) => (
        <div key={subTheme.id} className="p-5 border mb-3">
          <Link href={`/themes_coran/${subTheme.id}`}>{subTheme.name}</Link>
        </div>
      ))}
    </div>
  );
}
