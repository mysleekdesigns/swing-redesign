"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function BillingToggle() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual")

  return (
    <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
      <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-full">
        <button
          onClick={() => setBillingPeriod("monthly")}
          className={cn(
            "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
            billingPeriod === "monthly"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingPeriod("annual")}
          className={cn(
            "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative",
            billingPeriod === "annual"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Annual
          {billingPeriod === "annual" && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
              Save 20%
            </span>
          )}
        </button>
      </div>
      {billingPeriod === "annual" && (
        <p className="text-sm text-muted-foreground mt-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          Save up to 20% with annual billing
        </p>
      )}
    </div>
  )
}