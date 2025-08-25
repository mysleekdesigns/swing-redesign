"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function BillingToggle() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual")

  return (
    <div className="flex flex-col items-start mb-8 sm:mb-12">
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
            "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
            billingPeriod === "annual"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Annual
        </button>
      </div>
    </div>
  )
}