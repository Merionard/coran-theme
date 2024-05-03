"use server"

import { prisma } from "@/prisma/client"

export const createNewThemeCoran = async (themeName: string, parentId?: number) => {
    const theme = await prisma.theme.findFirst({ where: { name: themeName } })

    if (theme !== null) {
        return null
    }
    if (parentId) {
        const themeParent = await prisma.theme.findUnique({ where: { id: parentId } });
        if (themeParent) {
            const newTheme = await prisma.theme.create({ data: { name: themeName, parent: { connect: { id: parentId } } } })
            return newTheme;
        }


    }
    const newTheme = await prisma.theme.create({ data: { name: themeName } })
    return newTheme;
}