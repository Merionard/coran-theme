"use server";

import { prisma } from "@/prisma/client";
import { ayat } from "@prisma/client";

export const searchAyats = async (search: string) => {
  const harakats = /[\u064B-\u0652]/g;

  const result = await prisma.$queryRaw<ayat[]>`
  SELECT * FROM "ayat"
  WHERE REGEXP_REPLACE("content", '[\u064B-\u0652]', '', 'g') ILIKE ${
    "%" + search + "%"
  }
`;

  console.log(result);
  return result;
};
