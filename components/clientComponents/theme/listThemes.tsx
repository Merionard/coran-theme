"use client";

import { ThemeWithSubThemes } from "@/app/themes_coran/page";
import { ThemeItem } from "./themeItem";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

export const ListThemes = (props: { themes: ThemeWithSubThemes[] }) => {
  const [search, setSearch] = useState("");

  const getAllThemesWithRecursiveSubThemes = (
    theme: ThemeWithSubThemes,
    subLevel: number
  ) => {
    if (theme.subThemes.length > 0) {
      const subThemes = props.themes.filter((t) => t.parentId === theme.id);
      const className = "ml-" + subLevel + " pl-4";
      return (
        <div className={className}>
          <ThemeItem theme={{ ...theme }} />

          {subThemes.map((s) =>
            getAllThemesWithRecursiveSubThemes(s, subLevel + 2)
          )}
        </div>
      );
    } else {
      return (
        <div className={`ml-${subLevel} pl-4`}>
          <ThemeItem theme={{ ...theme }} />
        </div>
      );
    }
  };

  const getThemes = () => {
    if (search !== "") {
      return props.themes
        .filter((t) => t.name.toUpperCase().includes(search.toUpperCase()))
        .map((t) => <ThemeItem key={t.id} theme={{ ...t }} />);
    }
    return props.themes
      .filter((t) => t.parentId === null)
      .map((t) => getAllThemesWithRecursiveSubThemes(t, 0));
  };
  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <div className="relative w-full  md:w-1/6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher thème"
          />
          <Search className="h-6 w-6 absolute top-1/2  -translate-y-1/2 right-3 text-gray-400" />
        </div>
      </div>
      <Card className="mt-5">
        <CardContent className="mt-5">{getThemes()}</CardContent>
      </Card>
    </div>
  );
};
