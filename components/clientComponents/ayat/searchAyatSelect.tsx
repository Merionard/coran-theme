"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { SourateWhithAyat } from "../../serverComponents/ThemeSearchAyat";
import { Button } from "@/components/ui/button";
import { addAyatOnTheme } from "../../serverActions/themeCoranAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type props = {
  sourateWhithAyat: SourateWhithAyat[];
  themeId: number;
};

export const SelectAyat = ({ sourateWhithAyat, themeId }: props) => {
  const [sourateSelected, setSourateSelected] = useState<number | null>(null);
  const [selectedAyatId, setSelectedAyatId] = useState<number | null>(null);
  const router = useRouter();

  const AddAyat = async () => {
    const updatedAyat = await addAyatOnTheme(themeId, Number(selectedAyatId));
    if (updatedAyat) {
      toast.success("Ayat rajoutée avec succès!");
      router.refresh();
    }
  };

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
              {s.titre} ({s.number})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(ayat) => setSelectedAyatId(Number(ayat))}>
        <SelectTrigger className="">
          <SelectValue placeholder="Ayat" />
        </SelectTrigger>
        <SelectContent>
          {sourateWhithAyat
            .filter((s) => s.number === sourateSelected)
            .map((s) => s.ayats)
            .flatMap((a) => a)
            .map((a) => (
              <SelectItem key={a.number} value={a.id.toString()}>
                {a.number}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button onClick={AddAyat}>Ajouter au thème</Button>
    </div>
  );
};
