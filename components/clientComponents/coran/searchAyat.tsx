"use client";

import {
  AyatWithTitre,
  searchAyats,
} from "@/components/serverActions/coranAction";
import { SearchInput } from "@/components/ui/searchInput";
import { useState } from "react";

export const SearchAyat = () => {
  const [search, setSearch] = useState("");
  const [ayats, setAyats] = useState<AyatWithTitre[]>([]);

  const onSetSearch = async (value: string) => {
    setSearch(value);
    const ayats = await searchAyats(value);
    setAyats(ayats);
  };
  const highlightSearchTerm = (
    text: string,
    searchTerm: string
  ): JSX.Element => {
    if (!searchTerm.trim()) {
      return <>{text}</>;
    }
    const harakats = /[\u064B-\u0652]/g;
    const textWithoutHarakat = text.replace(harakats, "");
    const searhWithoutHarakats = searchTerm.replace(harakats, "");

    const regex = new RegExp(`(${searhWithoutHarakats})`, "gi");

    const parts = textWithoutHarakat.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part.replace(harakats, "")) ? (
            <span key={index} className="bg-yellow-400">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div>
      <SearchInput onSearch={onSetSearch} search={search} />
      <div className="mt-5 space-y-5">
        {ayats.map((a) => (
          <div key={a.id} className="border-b-2 space-y-3 bg-card">
            <div className="">
              {" "}
              Sourate {a.sourate_number} verset {a.number}{" "}
              <span>{a.titre}</span>
            </div>
            <p className="text-2xl text-right">
              {highlightSearchTerm(a.content, search)}
            </p>
            <p>{a.traduction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
