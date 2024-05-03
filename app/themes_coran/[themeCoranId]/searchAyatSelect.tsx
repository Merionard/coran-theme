"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

type props = {
    ayatsBySourates: Array<{ surahLabel: string, sourateNumber: number | null, ayahs: { number: number | null }[] }>
}

export const SelectAyat = ({ ayatsBySourates }: props) => {

    const [sourateSelected, setSourateSelected] = useState<number | null>(null)
    return (
        <div>
            <Select onValueChange={(value) => setSourateSelected(Number(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sourate" />
                </SelectTrigger>
                <SelectContent>
                    {ayatsBySourates.map(s => <SelectItem value={s.sourateNumber != null ? s.sourateNumber.toString() : ""} key={s.sourateNumber}>{s.surahLabel}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

    )



}