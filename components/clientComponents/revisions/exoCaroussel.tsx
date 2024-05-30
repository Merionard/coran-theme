"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ayat } from "@prisma/client";
import { ExoCard } from "./exoCard";
import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

type props = {
  ayats: ayat[];
};
export const ExoCaroussel = ({ ayats }: props) => {
  const [api, setApi] = useState<CarouselApi>();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      resetTranscript();
    });
  }, [api, transcript, resetTranscript]);
  return (
    <div>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {ayats.map((a, index) => (
            <CarouselItem key={a.id}>
              <ExoCard
                ayat={a}
                index={index + 1}
                totalAyats={ayats.length}
                listening={listening}
                resetTranscript={resetTranscript}
                transcript={transcript}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
