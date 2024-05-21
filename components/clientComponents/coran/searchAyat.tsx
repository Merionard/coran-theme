"use client";

import { searchAyats } from "@/components/serverActions/coranAction";
import { SearchInput } from "@/components/ui/searchInput";
import { useState } from "react";

export const SearchAyat = () => {
  const [search, setSearch] = useState("");

  const onSetSearch = async (value: string) => {
    setSearch(value);
    const ayats = await searchAyats(value);
  };

  return <SearchInput onSearch={onSetSearch} search={search} />;
};
