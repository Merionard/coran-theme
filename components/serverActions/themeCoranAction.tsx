"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";

export const createNewThemeCoran = async (
  themeName: string,
  parentId?: number
) => {
  const session = await getAuthSession();

  if (!session || session?.user.role !== "ADMIN") {
    throw new Error("Vous devez être admin!");
  }
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
  const session = await getAuthSession();
  if (!session || session?.user.role !== "ADMIN") {
    throw new Error("Vous devez être admin!");
  }
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
  const session = await getAuthSession();
  if (!session || session?.user.role !== "ADMIN") {
    throw new Error("Vous devez être admin!");
  }
  return await prisma.theme.update({
    where: { id: themeId },
    data: {
      ayats: {
        disconnect: { id: ayatId },
      },
    },
  });
};

export const updateThemeName = async (
  name: string,
  themeId: number,
  parentId?: number
) => {
  const session = await getAuthSession();
  if (!session || session?.user.role !== "ADMIN") {
    throw new Error("Vous devez être admin!");
  }
  const data = parentId
    ? {
        name: name,
        parentId: parentId,
      }
    : {
        name: name,
      };
  return await prisma.theme.update({
    where: { id: themeId },
    data: data,
  });
};

export const deleteTheme = async (themeId: number) => {
  const session = await getAuthSession();
  if (!session || session?.user.role !== "ADMIN") {
    throw new Error("Vous devez être admin!");
  }

  return await prisma.theme.delete({ where: { id: themeId } });
};
