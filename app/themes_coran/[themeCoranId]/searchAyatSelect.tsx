"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { SourateWhithAyat } from "./ThemeSearchAyat";

type props = {
  sourateWhithAyat: SourateWhithAyat[];
};

export const SelectAyat = ({ sourateWhithAyat }: props) => {
  const [sourateSelected, setSourateSelected] = useState<number | null>(null);

  console.log(sourateWhithAyat);

  return (
    <div className="flex gap-2">
      <Select onValueChange={(value) => setSourateSelected(Number(value))}>
        <SelectTrigger className=" text-3xl">
          <SelectValue placeholder="Sourate" />
        </SelectTrigger>
        <SelectContent>
          {sourateWhithAyat.map((s) => (
            <SelectItem
              value={s.number.toString()}
              key={s.number}
              className="text-3xl"
            >
              {s.titre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Ayat" />
        </SelectTrigger>
        <SelectContent>
          {sourateWhithAyat
            .filter((s) => s.number === sourateSelected)
            .map((s) => s.ayats)
            .flatMap((a) => a)
            .map((a) => (
              <SelectItem key={a.number} value={a.number.toString()}>
                {a.number}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
