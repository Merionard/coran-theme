"use client";

import { Button } from "@/components/ui/button";
import { ayat } from "@prisma/client";
import { Check, Disc, Play, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type props = {
  ayats: ayat[];
};
export const ExoOral = ({ ayats }: props) => {
  ayats[0];
  const [message, setMessage] = useState("");

  const commands = [
    {
      command: ayats[0].content,
      callback: (command: string, spokenPhrase: string) => {
        console.log("callback");
        if (command === spokenPhrase) {
          setMessage(`Bravo!`);
        } else {
          setMessage("Non vous avez dit:" + spokenPhrase);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
  ];

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands,
  });

  const reset = () => {
    resetTranscript();
    setMessage("");
  };

  const startListening = () => {
    SpeechRecognition.startListening({ language: "ar-SA" });
  };
  const validate = () => {
    const harakats = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0671]/g;
    const ayatWhitoutHarakts = ayats[0].content.replace(harakats, "");
    if (transcript === ayatWhitoutHarakts) {
      setMessage("GG");
    } else {
      setMessage("oups");
    }
  };

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex justify-end gap-3">
                      <Button onMouseDown={startListening} size={"icon"}>
                        {!listening ? <Play /> : <Disc />}
                      </Button>
                      <Button onClick={reset} size={"icon"}>
                        <RotateCcw />
                      </Button>
                    </div>
                    <div className="flex justify-center mb-3">
                      <p className="text-xl font-bold">
                        Traduisez la phrase ci-desous
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-center">{ayats[0].traduction}</p>
                      <hr className="w-1/2 mx-auto" />
                      <p className="text-center font-bold">Votre traduction</p>
                      <p className="text-3xl text-center">{transcript}</p>
                      <div className="flex justify-end">
                        <Button
                          onClick={validate}
                          disabled={message.length > 0}
                        >
                          Valider
                          <Check />
                        </Button>
                      </div>
                    </div>

                    <p>{message}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
