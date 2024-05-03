"use server"

import { prisma } from "@/prisma/client"

export const createNewThemeCoran = async (themeName: string) => {
    const theme = await prisma.theme.findFirst({ where: { name: themeName } })
    if (theme !== null) {
        return null
    }
    const newTheme = await prisma.theme.create({ data: { name: themeName } })
    return newTheme;
}