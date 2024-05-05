import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { SelectAyat } from "./searchAyatSelect";

export const sourateWhithAyat = Prisma.validator<Prisma.sourateDefaultArgs>()({
  include: {
    ayats: true,
  },
});
export type SourateWhithAyat = Prisma.sourateGetPayload<
  typeof sourateWhithAyat
>;

export default async function ThemeSearchAyat() {
  const souratesWhithAyats = await prisma.sourate.findMany({
    include: {
      ayats: {
        where: {
          number: {
            gt: 0,
          },
        },
        orderBy: {
          number: "asc",
        },
      },
    },
    orderBy: {
      number: "asc",
    },
  });

  return (
    <div>
      <SelectAyat sourateWhithAyat={souratesWhithAyats} />
    </div>
  );
}
