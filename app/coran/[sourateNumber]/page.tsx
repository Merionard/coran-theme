import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import {
  Amiri,
  Cairo,
  Inter,
  Noto_Sans_Arabic,
  Roboto,
} from "next/font/google";

const note = Noto_Sans_Arabic({ weight: "400", subsets: ["arabic"] });

export default async function SouratePage({
  params,
}: {
  params: { sourateNumber: string };
}) {
  const ayats = await prisma.ayat.findMany({
    where: {
      sourate_number: Number(params.sourateNumber),
      AND: { number: { gt: 0 } },
    },
    include: { sourate: true },
    orderBy: { number: "asc" },
  });

  return (
    <div>
      <h2 className={note.className + " text-4xl text-center"}>
        {ayats[0].sourate.titre}
      </h2>
      <h3 className={note.className + " text-4xl text-center mt-5"}>
        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
      </h3>
      <div className="pt-5">
        <CardContent className="space-y-10">
          {ayats
            .filter(
              (a) => a.content !== "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
            )
            .map((a) => (
              <div key={a.id} className="border-b-2 space-y-3 bg-card">
                <div className="rounded-full border  flex items-center justify-center w-4 h-4 p-4">
                  {a.number}
                </div>
                <p className={note.className + " text-2xl text-right"}>
                  {a.content}
                </p>
                <p>{a.traduction}</p>
              </div>
            ))}
        </CardContent>
      </div>
    </div>
  );
}
