"use client";

import { ThemeWithSubThemes } from "@/app/themes_coran/page";
import { ThemeItem } from "./themeItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowRight, Grid3X3, List, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ThemeCard } from "./themeCard";

export const ListThemes = (props: { themes: ThemeWithSubThemes[] }) => {
  const [search, setSearch] = useState("");
  const [gridMod, setGridMode] = useState(false);

  const getAllThemesWithRecursiveSubThemes = (
    theme: ThemeWithSubThemes,
    subLevel: number
  ) => {
    if (theme.subThemes.length > 0) {
      const subThemes = props.themes.filter((t) => t.parentId === theme.id);

      if (gridMod && theme.parentId === null) {
        return (
          <ThemeCard
            key={theme.id}
            id={theme.id}
            name={theme.name}
            parentId={theme.parentId}
          >
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant={"link"} className="p-0">
                  Afficher sous thèmes
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {subThemes.map((s) =>
                  getAllThemesWithRecursiveSubThemes(s, subLevel + 2)
                )}
              </CollapsibleContent>
            </Collapsible>
          </ThemeCard>
        );
      }

      return (
        <div
          className={
            gridMod
              ? theme.parentId === null
                ? "pl-0"
                : "pl-3"
              : theme.parentId === null
              ? "pl-2"
              : "pl-10"
          }
          key={theme.id}
        >
          <div className="flex gap-1 items-center">
            {theme.parentId !== null && <ArrowRight className="h-4 w-4" />}

            <Link
              href={`/themes_coran/${theme.id}`}
              className={
                gridMod
                  ? "text-base"
                  : theme.parentId === null
                  ? "font-bold text-2xl"
                  : "text-xl"
              }
            >
              {theme.name}
            </Link>
          </div>

          {subThemes.map((s) =>
            getAllThemesWithRecursiveSubThemes(s, subLevel + 2)
          )}
        </div>
      );
    } else {
      if (gridMod && theme.parentId === null) {
        return (
          <ThemeCard
            key={theme.id}
            id={theme.id}
            name={theme.name}
            parentId={theme.parentId}
          />
        );
      }

      return (
        <div
          className={
            gridMod
              ? theme.parentId === null
                ? "pl-0"
                : "pl-3"
              : theme.parentId === null
              ? "pl-2"
              : "pl-10"
          }
          key={theme.id}
        >
          <div className="flex gap-1 items-center">
            {theme.parentId !== null && <ArrowRight className="h-4 w-4" />}
            <Link
              href={`/themes_coran/${theme.id}`}
              className={
                gridMod
                  ? "text-base"
                  : theme.parentId === null
                  ? "font-bold text-2xl"
                  : `text-xl`
              }
            >
              {theme.name}
            </Link>
          </div>
        </div>
      );
    }
  };

  const getThemes = () => {
    if (search !== "") {
      return props.themes
        .filter((t) => t.name.toUpperCase().includes(search.toUpperCase()))
        .map((t) => {
          if (gridMod)
            return (
              <ThemeCard
                key={t.id}
                name={t.name}
                id={t.id}
                parentId={t.parentId}
              />
            );
          return (
            <div key={t.id}>
              <Link
                href={`/themes_coran/${t.id}`}
                className={t.parentId === null ? "font-bold text-xl" : ""}
              >
                {t.name}
              </Link>
            </div>
          );
        });
    }
    return props.themes
      .filter((t) => t.parentId === null)
      .map((t) => getAllThemesWithRecursiveSubThemes(t, 0));
  };
  return (
    <div className="mt-5">
      <div className="flex justify-end gap-3">
        <div className="flex">
          <Button
            variant={"outline"}
            className={gridMod ? "rounded-none bg-secondary" : "rounded-none"}
            onClick={() => setGridMode(true)}
            size={"icon"}
          >
            <Grid3X3 />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setGridMode(false)}
            className={gridMod ? "rounded-none" : "rounded-none bg-secondary"}
            size={"icon"}
          >
            <List />
          </Button>
        </div>
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
        <CardHeader>
          <CardTitle className="text-5xl">
            Arborescence des thèmes coraniques
          </CardTitle>
        </CardHeader>
        {gridMod ? (
          <CardContent>
            <div className="grid grid-cols-4 gap-3">{getThemes()}</div>
          </CardContent>
        ) : (
          <CardContent>{getThemes()}</CardContent>
        )}
      </Card>
    </div>
  );
};
