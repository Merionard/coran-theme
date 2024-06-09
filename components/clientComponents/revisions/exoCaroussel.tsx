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
import { useEffect, useMemo, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { Button } from "@/components/ui/button";
import { Disc, icons } from "lucide-react";
import SpeechRecognition from "react-speech-recognition";
import { cn } from "@/lib/utils";

type props = {
  ayats: ayat[];
};
export const ExoCaroussel = ({ ayats }: props) => {
  const [api, setApi] = useState<CarouselApi>();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [recording, setRecording] = useState(false);
  const startSound = useMemo(() => new Audio("/sounds/stop-13692.mp3"), []);
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      resetTranscript();
    });
  }, [api, transcript, resetTranscript]);
  const startListening = () => {
    startSound.play();
    SpeechRecognition.startListening({ language: "ar-SA", continuous: true });
    setRecording(true);
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setRecording(false);
  };
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

      <div className="mt-10 flex justify-center">
        <Button
          variant={"destructive"}
          size={"lg"}
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          className="active:bg-white rounded-full"
        >
          <Disc className={cn({ "text-black": recording })} />
        </Button>
      </div>
    </div>
  );
};
