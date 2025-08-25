"use client";

import Image from "next/image";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";

interface ConventionCardProps {
  convention: {
    name: string;
    description: string;
    date: string;
    location: string;
    price?: string;
    attendeeCount: number;
    imageUrl: string;
  };
}

export function ConventionCard({ convention }: ConventionCardProps) {
  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl bg-card p-4 sm:p-6 lg:p-8 border border-border">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
          {/* Text Content - Left Side */}
          <div className="lg:w-full xl:w-1/2 lg:pr-6">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="inline-block w-fit px-2.5 py-1 rounded-full text-sm sm:text-base font-semibold mb-4 sm:mb-8 bg-primary/20 text-primary border border-primary/30">
                Lifestyle
              </div>
              
              <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
                  {convention.name}
                </h2>
                
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                  {convention.description}
                </p>
                
                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span className="font-medium truncate">
                      {new Date(convention.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span className="font-medium truncate">{convention.location}</span>
                  </div>
                  {convention.price && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">{convention.price.replace('$', '')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span className="font-medium truncate">{convention.attendeeCount} attending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground rounded-xl font-semibold transition-colors min-h-[44px]">
                  Register Now
                </button>
                <button className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 border border-border hover:bg-accent text-foreground hover:text-accent-foreground rounded-xl font-semibold transition-colors min-h-[44px]">
                  Event Details
                </button>
              </div>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="lg:w-1/4 xl:w-1/2 hidden xl:block">
            <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden">
              <Image
                src={convention.imageUrl}
                alt={convention.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
        
        {/* Decorative background elements matching welcome section */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
      </div>
    </section>
  );
}