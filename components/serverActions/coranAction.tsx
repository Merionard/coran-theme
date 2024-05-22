"use server";

import { prisma } from "@/prisma/client";
import { ayat } from "@prisma/client";

export type AyatWithTitre = ayat & {
  titre: string;
};

export const searchAyats = async (
  search: string,
  page: number,
  pageSize: number
) => {
  const harakats = /[\u064B-\u0652]/g;
  const searchWithoutHarakats = search.replace(harakats, "");

  const offset = (page - 1) * pageSize;

  const [result, totalcount] = await prisma.$transaction([
    prisma.$queryRaw<AyatWithTitre[]>`
      SELECT a.*, s.titre
      FROM "ayat" a
      JOIN "sourate" s ON a.sourate_number = s.number
      WHERE REGEXP_REPLACE(a."content", '[\u064B-\u0652]', '', 'g') ILIKE ${
        "%" + searchWithoutHarakats + "%"
      }
      ORDER BY s.number, a.number
      LIMIT ${pageSize}
      OFFSET ${offset}
    `,
    prisma.$queryRaw<number>`
      SELECT COUNT(*) as totalcount
      FROM "ayat" a
      JOIN "sourate" s ON a.sourate_number = s.number
      WHERE REGEXP_REPLACE(a."content", '[\u064B-\u0652]', '', 'g') ILIKE ${
        "%" + searchWithoutHarakats + "%"
      }
    `,
  ]);

  return {
    ayats: result,
    //@ts-ignore
    totalCount: Number(totalcount[0].totalcount),
  };
};
