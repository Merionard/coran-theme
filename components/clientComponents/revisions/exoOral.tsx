"use client";

import { Button } from "@/components/ui/button";
import { ayat } from "@prisma/client";
import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

  const intervalRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    startListening(); // Appelle immédiatement au premier clic
    //intervalRef.current = window.setInterval(startListening, 1000); // Appelle startListening toutes les secondes
  };

  const handleMouseUp = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-3">
        <Button onMouseDown={handleMouseDown}>
          {!listening ? "start" : "record"}
        </Button>
        <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      <p>Traduisez la phrase ci-desous:</p>
      <p>{ayats[0].traduction}</p>

      <p>{transcript}</p>
      <p>{message}</p>
    </div>
  );
};
