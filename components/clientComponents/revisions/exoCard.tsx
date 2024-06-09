"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cleanTashkeel, cn } from "@/lib/utils";
import { ayat } from "@prisma/client";

import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import { stringSimilarity } from "string-similarity-js";

type props = {
  ayat: ayat;
  index: number;
  totalAyats: number;
  transcript: string;
  listening: boolean;
  resetTranscript: () => void;
};

export const ExoCard = ({
  ayat,
  index,
  totalAyats,
  listening,
  resetTranscript,
  transcript,
}: props) => {
  const [message, setMessage] = useState("");

  const reset = () => {
    resetTranscript();
    setMessage("");
  };

  const validate = () => {
    const ayatWhitoutHarakts = cleanTashkeel(ayat.content);
    const score = stringSimilarity(ayatWhitoutHarakts, transcript);
    if (score > 0.88) {
      setMessage("BRAVO!!");
    } else {
      setMessage("Concordance insuffisante");
    }
  };

  return (
    <div className="p-1 space-y-3">
      <Card>
        <CardContent className="p-5">
          <div className="flex justify-between gap-3">
            <p>
              {index}/{totalAyats}
            </p>
            <div className="flex gap-2">
              <Button onClick={reset} size={"icon"} variant={"ghost"}>
                <RotateCcw />
              </Button>
            </div>
          </div>
          <div className="flex justify-center mb-3">
            <p className="text-xl font-bold">Traduisez la phrase ci-desous</p>
          </div>
          <div className="space-y-3">
            <p className="text-center">{ayat.traduction}</p>
            <hr className="w-1/2 mx-auto" />
            <p className="text-center font-bold">Votre traduction</p>
            <p className="text-3xl text-center">{transcript}</p>
            {message.length > 0 && (
              <>
                <hr className="w-1/2 mx-auto" />
                <p className="text-center font-bold">Résultat</p>
                <p
                  className={cn(
                    "text-center",
                    { "text-primary": message === "BRAVO!!" },
                    { "text-destructive": message !== "BRAVO!!" }
                  )}
                >
                  {message}
                </p>
              </>
            )}

            <div className="flex justify-end ">
              <Button onClick={validate} disabled={message.length > 0}>
                Valider
                <Check />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {message.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Correction</AccordionTrigger>
                <AccordionContent className="text-3xl">
                  {ayat.content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
