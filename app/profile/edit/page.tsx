"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/ui/Footer";
import { EditProfileForm } from "@/components/sections/profile/edit/EditProfileForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      
      <main className="2xl:ml-64 2xl:pt-4 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Header Section */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back to Profile</span>
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
                  <p className="text-sm text-muted-foreground">Update your profile information</p>
                </div>
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

          {/* Mobile Save Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border sm:hidden">
            <div className="flex gap-2">
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

          {/* Footer - hidden on mobile due to fixed bottom buttons */}
          <div className="hidden sm:block">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}