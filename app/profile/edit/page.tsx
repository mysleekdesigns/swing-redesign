"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/ui/Footer";
import { EditProfileForm } from "@/components/sections/profile/edit/EditProfileForm";
import { Button } from "@/components/ui/button";

export default function EditProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmLeave) return;
    }
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="2xl:ml-64 2xl:pt-4 p-4 sm:p-6 lg:p-8">
        <div className="w-full space-y-6">
          {/* Edit Profile Container */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
            {/* Header Section */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4 text-foreground">
                    Edit Profile
                  </h1>
                  <p className="text-base text-muted-foreground">
                    Update your profile information and preferences
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="hidden sm:inline-flex"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving || !hasChanges}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <EditProfileForm onChangesMade={setHasChanges} />
            
            {/* Mobile Save Buttons */}
            <div className="flex gap-2 mt-8 sm:hidden">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
