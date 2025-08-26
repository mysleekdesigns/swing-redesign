"use client";

import { useState, useEffect } from "react";
import { LocationSection } from "./LocationSection";
import { PreferencesSection } from "./PreferencesSection";
import { AboutSection } from "./AboutSection";
import { LookingForFiltersSection, PreferenceValue } from "./LookingForFiltersSection";
import { AgeSection } from "./AgeSection";
import { LifestyleSection } from "./LifestyleSection";
import { GuidelinesSection } from "./GuidelinesSection";
import { ProfileDescriptionSection } from "./ProfileDescriptionSection";
import { SimpleShortTaglineSection } from "./SimpleShortTaglineSection";
import { WhatLookingForSection } from "./WhatLookingForSection";
import { FantasiesSection } from "./FantasiesSection";
import { AdditionalInfoSection } from "./AdditionalInfoSection";

export interface EditProfileData {
  location: {
    current: string;
  };
  preferences: {
    watch: "definitely" | "maybe" | "no";
    soft: "definitely" | "maybe" | "no";
    full: "definitely" | "maybe" | "no";
  };
  about: {
    memberType: string;
    heightFeet: number;
    heightInches: number;
    weight: number;
    age: number;
    smoke: boolean;
    drink: boolean;
    orientation: string;
  };
  lookingFor: {
    couples: PreferenceValue;
    singleLadies: PreferenceValue;
    singleMen: PreferenceValue;
  };
  agePreferences: {
    youngest: number;
    oldest: number;
  };
  lifestyle: {
    drink: "do_not_care" | "yes" | "no";
    smoke: "do_not_care" | "yes" | "no";
  };
  profileDescription: string;
  shortTagline: string;
  whatLookingFor: string;
  fantasies: string;
  additionalInfo: string;
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
      watch: "definitely",
      soft: "definitely",
      full: "definitely",
    },
    about: {
      memberType: "Male Member",
      heightFeet: 6,
      heightInches: 0,
      weight: 200,
      age: 45,
      smoke: true,
      drink: true,
      orientation: "straight",
    },
    lookingFor: {
      couples: "please_choose",
      singleLadies: "please_choose",
      singleMen: "please_choose",
    },
    agePreferences: {
      youngest: 25,
      oldest: 55,
    },
    lifestyle: {
      drink: "do_not_care",
      smoke: "do_not_care",
    },
    profileDescription: "",
    shortTagline: "",
    whatLookingFor: "",
    fantasies: "",
    additionalInfo: "",
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
        <div className="md:col-span-2 xl:col-span-1 xl:h-full">
          <LocationSection
            location={formData.location}
            onChange={(data) => updateFormData("location", data)}
          />
        </div>

        {/* Preferences Section */}
        <div className="md:col-span-2 xl:col-span-2 xl:h-full">
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

        {/* Looking For Section - Full width to contain the 3 dropdowns */}
        <div className="md:col-span-2 xl:col-span-3">
          <LookingForFiltersSection
            preferences={formData.lookingFor}
            onChange={(data) => updateFormData("lookingFor", data)}
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

        {/* Guidelines Section - Full width */}
        <div className="md:col-span-2 xl:col-span-3">
          <GuidelinesSection />
        </div>

        {/* Short Tag Line Section - Full width (directly under guidelines as requested) */}
        <div className="md:col-span-2 xl:col-span-3">
          <SimpleShortTaglineSection
            tagline={formData.shortTagline}
            onChange={(shortTagline) => setFormData((prev) => ({ ...prev, shortTagline }))}
          />
        </div>

        {/* What are you looking for? - Full width */}
        <div className="md:col-span-2 xl:col-span-3">
          <WhatLookingForSection
            lookingFor={formData.whatLookingFor}
            onChange={(whatLookingFor) => setFormData((prev) => ({ ...prev, whatLookingFor }))}
          />
        </div>

        {/* Describe yourself - Full width */}
        <div className="md:col-span-2 xl:col-span-3">
          <ProfileDescriptionSection
            description={formData.profileDescription}
            onChange={(profileDescription) => setFormData((prev) => ({ ...prev, profileDescription }))}
          />
        </div>

        {/* Tell us about your fantasies and/or real experiences - Full width */}
        <div className="md:col-span-2 xl:col-span-3">
          <FantasiesSection
            fantasies={formData.fantasies}
            onChange={(fantasies) => setFormData((prev) => ({ ...prev, fantasies }))}
          />
        </div>

        {/* Additional information - Full width */}
        <div className="md:col-span-2 xl:col-span-3">
          <AdditionalInfoSection
            additionalInfo={formData.additionalInfo}
            onChange={(additionalInfo) => setFormData((prev) => ({ ...prev, additionalInfo }))}
          />
        </div>
      </div>
    </div>
  );
}