import Image from "next/image";
import { Edit3, Calendar, MapPin, CheckCircle } from "lucide-react";

interface HotDate {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  isAttending?: boolean;
}

interface ProfileHotDateProps {
  hotDate: HotDate;
}

export function ProfileHotDate({ hotDate }: ProfileHotDateProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">My Hot Date</h2>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex gap-3 sm:gap-4">
          {hotDate.imageUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={hotDate.imageUrl}
                alt={hotDate.title}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-2 text-base truncate">{hotDate.title}</h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 line-clamp-2">{hotDate.description}</p>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span className="truncate">{new Date(hotDate.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span className="truncate">{hotDate.location}</span>
              </div>
              {hotDate.isAttending && (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium">Attending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}