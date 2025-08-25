"use client";

import Image from "next/image";
import { Camera, MoreHorizontal } from "lucide-react";

interface PhotoGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export function PhotoGrid({ images, onImageClick }: PhotoGridProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Photos</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Camera className="w-4 h-4" />
          <span className="font-medium">Add Photo</span>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <Image
              src={image}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button 
              className="absolute top-1 right-1 p-1 rounded-lg bg-background/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}