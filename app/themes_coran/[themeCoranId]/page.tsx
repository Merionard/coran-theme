import { prisma } from "@/prisma/client";

export default async function ViewTheme({
  params,
}: {
  params: { themeCoranId: string };
}) {
  const theme = await prisma.theme.findUnique({
    where: { id: Number(params.themeCoranId) },
    include: { ayats: true },
  });

  return (
    <div>
      <h2 className="text-center text-6xl mb-16">Thème {theme?.name}</h2>
      {theme?.ayats.map((a) => (
        <div key={a.id} className="p-5 border mb-3">
          <h3 className="text-xl font-bold">
            Sourate {a.sourate} verset {a.verset}
          </h3>
          <p className="text-right text-3xl">{a.content}</p>
        </div>
      ))}
    </div>
  );
}
