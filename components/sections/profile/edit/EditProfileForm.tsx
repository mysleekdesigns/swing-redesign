"use client";

import { useState, useEffect } from "react";
import { LocationSection } from "./LocationSection";
import { PreferencesSection } from "./PreferencesSection";
import { AboutSection } from "./AboutSection";
import { FiltersSection } from "./FiltersSection";
import { AgeSection } from "./AgeSection";
import { LifestyleSection } from "./LifestyleSection";
import { GuidelinesSection } from "./GuidelinesSection";
import { TagLineSection } from "./TagLineSection";

export interface EditProfileData {
  location: {
    current: string;
  };
  preferences: {
    sunPhotos: "definitely" | "maybe" | "no";
    fallPhotos: "definitely" | "maybe" | "no";
    softPhotos: "definitely" | "maybe" | "no";
  };
  about: {
    description: string;
    lookingFor: string;
  };
  filters: {
    blockSingles: "no_interest" | "block_them" | "viewable";
    blockCouples: "no_interest" | "block_them" | "viewable";
  };
  singleMembers: {
    men: "block_them" | "no_interest" | "interested";
    women: "block_them" | "no_interest" | "interested";
  };
  agePreferences: {
    youngest: number;
    oldest: number;
  };
  lifestyle: {
    drink: "do_not_care" | "yes" | "no";
    smoke: "do_not_care" | "yes" | "no";
  };
  tagLine: string;
}

interface EditProfileFormProps {
  onChangesMade: (hasChanges: boolean) => void;
}

export function EditProfileForm({ onChangesMade }: EditProfileFormProps) {
  const [formData, setFormData] = useState<EditProfileData>({
    location: {
      current: "Plantation, FL",
    },
    preferences: {
      sunPhotos: "definitely",
      fallPhotos: "definitely",
      softPhotos: "definitely",
    },
    about: {
      description: "",
      lookingFor: "",
    },
    filters: {
      blockSingles: "no_interest",
      blockCouples: "no_interest",
    },
    singleMembers: {
      men: "no_interest",
      women: "no_interest",
    },
    agePreferences: {
      youngest: 25,
      oldest: 55,
    },
    lifestyle: {
      drink: "do_not_care",
      smoke: "do_not_care",
    },
    tagLine: "",
  });

  const [initialData] = useState(formData);

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
    onChangesMade(hasChanges);
  }, [formData, initialData, onChangesMade]);

  const updateFormData = <K extends keyof EditProfileData>(
    section: K,
    data: Partial<EditProfileData[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        ...data,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Location Section */}
        <div className="md:col-span-2 xl:col-span-1">
          <LocationSection
            location={formData.location}
            onChange={(data) => updateFormData("location", data)}
          />
        </div>

        {/* Preferences Section */}
        <div className="md:col-span-2 xl:col-span-2">
          <PreferencesSection
            preferences={formData.preferences}
            onChange={(data) => updateFormData("preferences", data)}
          />
        </div>

        {/* About Section - Full width on all screens */}
        <div className="md:col-span-2 xl:col-span-3">
          <AboutSection
            about={formData.about}
            onChange={(data) => updateFormData("about", data)}
          />
        </div>

        {/* Filters Section */}
        <div className="md:col-span-1 xl:col-span-1">
          <FiltersSection
            filters={formData.filters}
            onChange={(data) => updateFormData("filters", data)}
          />
        </div>

        {/* Single Members Section */}
        <div className="md:col-span-1 xl:col-span-1">
          <FiltersSection
            filters={formData.singleMembers}
            onChange={(data) => updateFormData("singleMembers", data)}
            title="Single Members Preferences"
            isSingleMembers
          />
        </div>

        {/* Age Section */}
        <div className="md:col-span-2 xl:col-span-1">
          <AgeSection
            agePreferences={formData.agePreferences}
            onChange={(data) => updateFormData("agePreferences", data)}
          />
        </div>

        {/* Lifestyle Section */}
        <div className="md:col-span-2 xl:col-span-2">
          <LifestyleSection
            lifestyle={formData.lifestyle}
            onChange={(data) => updateFormData("lifestyle", data)}
          />
        </div>

        {/* Tag Line Section */}
        <div className="md:col-span-2 xl:col-span-1">
          <TagLineSection
            tagLine={formData.tagLine}
            onChange={(tagLine) => setFormData((prev) => ({ ...prev, tagLine }))}
          />
        </div>

        {/* Guidelines Section - Full width */}
        <div className="md:col-span-2 xl:col-span-3">
          <GuidelinesSection />
        </div>
      </div>

      {/* Add padding at bottom for mobile fixed buttons */}
      <div className="h-20 sm:hidden" />
    </div>
  );
}