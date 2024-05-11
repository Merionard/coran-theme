"use client";

import { removeAyatOnTheme } from "@/components/serverActions/themeCoranAction";
import { ayat } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AyatCard = (props: {
  ayat: ayat;
  titreSourate: string;
  themeId?: number;
}) => {
  const router = useRouter();
  const removeAyat = async () => {
    if (props.themeId) {
      try {
        await removeAyatOnTheme(props.themeId, props.ayat.id);
        toast.success("Suppression effectuée avec succès!");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="p-5 border mb-3">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold">
          Sourate {props.ayat.sourate_number} verset {props.ayat.number}{" "}
          <span>{props.titreSourate}</span>
        </h3>
        <button
          className="flex justify-center items-center rounded-full border p-2 hover:bg-red-500"
          onClick={removeAyat}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-3xl">
            {props.ayat.content}
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            {props.ayat.traduction}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
