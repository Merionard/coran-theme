"use client";

import {
  markHadithAsLearned,
  toogleFavoriteHadith,
} from "@/components/serverActions/hadithAction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { hadith } from "@prisma/client";
import { BookCheck, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type props = {
  hadith: hadith;
  isFavorite: boolean;
  isLearned: boolean;
  metadata?: {
    bookId: number;
    bookName: string;
    chapterName: string;
    chapterNumber: number;
    chapterId: number;
  };
};

export const HadithItem = ({
  hadith,
  metadata,
  isFavorite,
  isLearned,
}: props) => {
  const router = useRouter();
  const session = useSession();

  const favoriteAction = async () => {
    try {
      await toogleFavoriteHadith(hadith.id, isFavorite);
      toast.success("Favoris mis à jour avec succès!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const learnAction = async () => {
    try {
      await markHadithAsLearned(hadith.id);
      toast.success("Marqué comme appris avec succès!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-5 border bg-card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold">
          {metadata?.bookName} {metadata?.chapterName}
        </h3>
        <div className="flex gap-2">
          {session && session.data && (
            <button
              className={cn(
                "flex justify-center items-center rounded-full border p-2"
              )}
              onClick={favoriteAction}
            >
              <Heart
                className={cn("h-4 w-4", {
                  "text-red-600 fill-current": isFavorite,
                })}
              />
            </button>
          )}
          {session && session.data && isFavorite && (
            <button
              className={cn(
                "flex justify-center items-center rounded-full border p-2"
              )}
              onClick={learnAction}
            >
              <BookCheck
                className={cn("h-4 w-4", {
                  "text-green-500 ": isLearned,
                })}
              />
            </button>
          )}
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-3xl">
            {hadith.content}
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            {hadith.traductionEn}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
