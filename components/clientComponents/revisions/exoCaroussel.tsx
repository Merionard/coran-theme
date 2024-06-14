"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ayat } from "@prisma/client";
import { Disc, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ExoCard } from "./exoCard";

type props = {
  ayats: ayat[];
};
export const ExoCaroussel = ({ ayats }: props) => {
  const [api, setApi] = useState<CarouselApi>();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      SpeechRecognition.stopListening();
      resetTranscript();
    });
  }, [api, transcript, resetTranscript]);
  const startListening = (
    event:
      | React.TouchEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    SpeechRecognition.startListening({ language: "ar-SA", continuous: true });
  };
  const stopListening = (
    event:
      | React.TouchEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    SpeechRecognition.stopListening();
  };
  return (
    <div className="relative mx-auto">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {ayats.map((a, index) => (
            <CarouselItem key={a.id}>
              <ExoCard
                ayat={a}
                index={index + 1}
                totalAyats={ayats.length}
                resetTranscript={resetTranscript}
                transcript={transcript}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div className="fixed bottom-20   left-1/2 transform -translate-x-1/2 ">
        {!listening ? (
          <Button
            variant={"default"}
            size={"icon"}
            onClick={startListening}
            className="active:bg-white  opacity-30 rounded-full"
          >
            <Disc />
          </Button>
        ) : (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={stopListening}
            className="active:bg-white  opacity-30 rounded-full"
          >
            <StopCircle />
          </Button>
        )}
      </div>
    </div>
  );
};
