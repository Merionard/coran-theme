"use server";

import { prisma } from "@/prisma/client";
import { ayat } from "@prisma/client";

export type AyatWithTitre = ayat & {
  titre: string;
};

export const searchAyats = async (search: string) => {
  const harakats = /[\u064B-\u0652]/g;
  const searhWithoutHarakats = search.replace(harakats, "");

  const result = await prisma.$queryRaw<AyatWithTitre[]>`
  SELECT a.*, s.titre  FROM "ayat" a
  JOIN "sourate" s ON a.sourate_number = s.number
  WHERE REGEXP_REPLACE(a."content", '[\u064B-\u0652]', '', 'g') ILIKE ${
    "%" + searhWithoutHarakats + "%"
  } order by s.number, a.number
`;

  console.log(result);

  return result;
};
