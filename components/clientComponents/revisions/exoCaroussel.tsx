"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ayat } from "@prisma/client";
import { ExoCard } from "./exoCard";

type props = {
  ayats: ayat[];
};
export const ExoCaroussel = ({ ayats }: props) => {
  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          {ayats.map((a, index) => (
            <CarouselItem key={a.id}>
              <ExoCard ayat={a} index={index + 1} totalAyats={ayats.length} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
