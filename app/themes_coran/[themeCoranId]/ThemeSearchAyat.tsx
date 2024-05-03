import { prisma } from "@/prisma/client";



export default async function ThemeSearchAyat() {

    const coran = await prisma.quran.findMany();
    const ayatsBySourates = new Array<{ surahLabel: string, sourateNumber: number | null, ayahs: { number: number | null }[] }>

    const getKey = (sourateName: string | null, sourateNumber: number | null) => {
        return sourateName + " (" + sourateNumber + ")"
    }

    for (const c of coran) {
        const ayatsBySourate = ayatsBySourates.find(a => a.surahLabel === getKey(c.surrahname, c.surah))
        if (!ayatsBySourate) {
            ayatsBySourates.push({ surahLabel: getKey(c.surrahname, c.surah), sourateNumber: c.surah, ayahs: [{ number: c.ayah }] })
        } else {
            ayatsBySourate?.ayahs.push({ number: c.ayah })
        }
    }

    return (<div>


    </div>)



}