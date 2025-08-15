"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface PhotoGalleryModalProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoGalleryModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose
}: PhotoGalleryModalProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(initialIndex);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (api && initialIndex !== undefined) {
      api.scrollTo(initialIndex);
    }
  }, [api, initialIndex]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        api?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        api?.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, api]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal Container with Glassmorphism */}
      <div 
        className={cn(
          "relative z-10 w-full max-w-5xl mx-4 sm:mx-8",
          "bg-white/10 dark:bg-black/20",
          "backdrop-blur-xl",
          "border border-white/20 dark:border-white/10",
          "rounded-3xl",
          "shadow-2xl shadow-black/20",
          "p-4 sm:p-6"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 z-20",
            "w-10 h-10 rounded-full",
            "bg-white/20 dark:bg-black/20",
            "backdrop-blur-md",
            "border border-white/30 dark:border-white/10",
            "flex items-center justify-center",
            "text-white hover:bg-white/30 dark:hover:bg-black/30",
            "transition-all duration-200",
            "hover:scale-110"
          )}
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className={cn(
          "absolute top-4 left-4 z-20",
          "px-3 py-1.5 rounded-full",
          "bg-white/20 dark:bg-black/20",
          "backdrop-blur-md",
          "border border-white/30 dark:border-white/10",
          "text-white text-sm font-medium"
        )}>
          {current + 1} / {images.length}
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/10] max-h-[70vh]">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-contain rounded-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                    priority={index === initialIndex}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Buttons with Glassmorphism */}
          <CarouselPrevious className={cn(
            "left-2 sm:-left-12",
            "w-12 h-12",
            "bg-white/20 dark:bg-black/20",
            "backdrop-blur-md",
            "border-white/30 dark:border-white/10",
            "text-white hover:bg-white/30 dark:hover:bg-black/30",
            "hover:scale-110"
          )} />
          <CarouselNext className={cn(
            "right-2 sm:-right-12",
            "w-12 h-12",
            "bg-white/20 dark:bg-black/20",
            "backdrop-blur-md",
            "border-white/30 dark:border-white/10",
            "text-white hover:bg-white/30 dark:hover:bg-black/30",
            "hover:scale-110"
          )} />
        </Carousel>

        {/* Thumbnail Strip */}
        <div className="mt-4 flex gap-2 justify-center overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden flex-shrink-0",
                "border-2 transition-all duration-200",
                current === index 
                  ? "border-white/60 scale-105 shadow-lg" 
                  : "border-white/20 hover:border-white/40 hover:scale-105"
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              <div className={cn(
                "absolute inset-0 transition-opacity",
                current === index ? "bg-transparent" : "bg-black/30"
              )} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}