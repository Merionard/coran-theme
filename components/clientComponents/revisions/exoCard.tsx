"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ayat } from "@prisma/client";

import { Play, Disc, RotateCcw, Check } from "lucide-react";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type props = {
  ayat: ayat;
  index: number;
  totalAyats: number;
};

export const ExoCard = ({ ayat, index, totalAyats }: props) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [message, setMessage] = useState("");

  const reset = () => {
    resetTranscript();
    setMessage("");
  };

  const startListening = () => {
    SpeechRecognition.startListening({ language: "ar-SA" });
  };
  const validate = () => {
    const harakats = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0671]/g;
    const ayatWhitoutHarakts = ayat.content.replace(harakats, "");
    if (transcript === ayatWhitoutHarakts) {
      setMessage("BRAVO!!");
    } else {
      setMessage("Ce n'est pas parfait vérifie avec la correction!");
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
              <Button onMouseDown={startListening} size={"icon"}>
                {!listening ? <Play /> : <Disc />}
              </Button>
              <Button onClick={reset} size={"icon"}>
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
                <p className="text-center text-primary">{message}</p>
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
