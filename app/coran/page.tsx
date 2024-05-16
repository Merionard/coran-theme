import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import { Noto_Sans_Arabic } from "next/font/google";
import Link from "next/link";

const note = Noto_Sans_Arabic({ weight: "400", subsets: ["arabic"] });

export default async function Coran() {
  const sourates = await prisma.sourate.findMany({
    orderBy: { number: "asc" },
  });

  return (
    <div className="space-y-5">
      {sourates.map((s) => (
        <Card className="flex justify-center items-center gap-5" key={s.number}>
          <Link href={`coran/${s.number}`}>
            <div
              className={
                note.className +
                " text-3xl h-14 flex justify-center items-center"
              }
            >
              <p>
                {s.number} {s.titre}
              </p>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
