"use server";

import { prisma } from "@/prisma/client";

export const createNewThemeCoran = async (
  themeName: string,
  parentId?: number
) => {
  const theme = await prisma.theme.findFirst({ where: { name: themeName } });

  if (theme !== null) {
    return null;
  }
  if (parentId) {
    const themeParent = await prisma.theme.findUnique({
      where: { id: parentId },
    });
    if (themeParent) {
      const newTheme = await prisma.theme.create({
        data: { name: themeName, parent: { connect: { id: parentId } } },
      });
      return newTheme;
    }
  }
  const newTheme = await prisma.theme.create({ data: { name: themeName } });
  return newTheme;
};

export const addAyatOnTheme = async (themeId: number, ayatId: number) => {
  return await prisma.theme.update({
    where: { id: themeId },
    data: {
      ayats: {
        connect: { id: ayatId },
      },
    },
  });
};

export const removeAyatOnTheme = async (themeId: number, ayatId: number) => {
  return await prisma.theme.update({
    where: { id: themeId },
    data: {
      ayats: {
        disconnect: { id: ayatId },
      },
    },
  });
};

export const updateThemeName = async (themeId: number, name: string) => {
  return await prisma.theme.update({
    where: { id: themeId },
    data: {
      name: name,
    },
  });
};
