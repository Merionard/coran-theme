"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type props = {
  ayatsBySourates: Array<{
    surahLabel: string;
    sourateNumber: number | null;
    ayahs: { number: number | null }[];
  }>;
};

export const SelectAyat = ({ ayatsBySourates }: props) => {
  const [sourateSelected, setSourateSelected] = useState<number | null>(null);

  const ayatsBySourate = ayatsBySourates
    .find((a) => a.sourateNumber === sourateSelected)
    ?.ayahs.filter((a) => a.number !== null)
    // @ts-ignore
    .sort((a, b) => a.number - b.number);
  const ayats = ayatsBySourate ? ayatsBySourate.sort() : [];

  return (
    <div className="flex gap-2">
      <Select onValueChange={(value) => setSourateSelected(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sourate" />
        </SelectTrigger>
        <SelectContent>
          {ayatsBySourates.map((s) => (
            <SelectItem
              value={s.sourateNumber != null ? s.sourateNumber.toString() : ""}
              key={s.sourateNumber}
            >
              {s.surahLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ayat" />
        </SelectTrigger>
        <SelectContent>
          {ayats.map((a) => (
            <SelectItem
              key={a.number}
              value={a.number == null ? "" : a.number.toString()}
            >
              {a.number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
