"use client";

import {
  AyatWithTitre,
  searchAyats,
} from "@/components/serverActions/coranAction";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchInput";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const SearchAyat = () => {
  const [search, setSearch] = useState("");
  const [ayats, setAyats] = useState<AyatWithTitre[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10;

  const fetchAyats = async (searchTerm: string, pageNumber: number) => {
    const result = await searchAyats(searchTerm, pageNumber, pageSize);
    setAyats(result.ayats);
    setTotalPages(Math.ceil(result.totalCount / pageSize));
    setPage(pageNumber);
  };

  const onSetSearch = async (value: string) => {
    setSearch(value);
    if (value === "") {
      setAyats([]);
      setPage(1);
      setTotalPages(1);
      return;
    }
    setPage(1); // Reset to first page on new search
    await fetchAyats(value, 1);
  };

  const handlePreviousPage = async () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      await fetchAyats(search, newPage);
    }
  };

  const handleNextPage = async () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      await fetchAyats(search, newPage);
    }
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

  const getPagninationBtn = () => {
    const buttons = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={i === page ? "default" : "secondary"}
            onClick={() => fetchAyats(search, i)}
          >
            {i}
          </Button>
        );
      }
      return buttons;
    } else {
      const indexPages = [1, 2, 3, totalPages];
      if (!indexPages.includes(page)) {
        indexPages.push(page);
        if (page > 3) {
          indexPages.splice(0, 3);
          indexPages.push(page - 1);
          indexPages.push(page - 2);
          indexPages.push(page - 3);
        }
        indexPages.sort((a, b) => a - b);
      }
      return indexPages.map((i) => (
        <Button
          key={i}
          variant={i === page ? "default" : "secondary"}
          onClick={() => fetchAyats(search, i)}
        >
          {i}
        </Button>
      ));
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <SearchInput
          onSearch={onSetSearch}
          search={search}
          placeHolder="Tappez votre recherche"
        />
      </div>
      {ayats.length > 0 && (
        <div className="flex justify-center mt-5 gap-3 items-center">
          <Button
            onClick={handlePreviousPage}
            size={"icon"}
            disabled={page === 1}
            className="disabled:bg-gray-400"
          >
            <ChevronLeft />
          </Button>
          {getPagninationBtn()}
          <Button
            onClick={handleNextPage}
            size={"icon"}
            disabled={page === totalPages}
            className="disabled:bg-gray-400"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
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
