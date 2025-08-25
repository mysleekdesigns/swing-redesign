"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckIcon, StarIcon, TrendingUpIcon, InfinityIcon, CalendarIcon } from "lucide-react"

interface PricingPlan {
  id: string
  name: string
  duration: string
  price: string
  originalPrice?: string
  savings?: string
  popular?: boolean
  bestValue?: boolean
  features: string[]
  icon: React.ReactNode
}

const plans: PricingPlan[] = [
  {
    id: "1month",
    name: "1 Month",
    duration: "Monthly billing",
    price: "$24.99",
    features: [
      "View unlimited profiles",
      "Advanced search filters",
      "Send unlimited messages",
      "Video chat access",
    ],
    icon: <CalendarIcon className="size-5" />,
  },
  {
    id: "3months",
    name: "3 Months",
    duration: "Billed quarterly",
    price: "$49.99",
    originalPrice: "$74.97",
    savings: "Save 33%",
    features: [
      "All 1 Month features",
      "Priority support",
      "Hotdates access",
      "Forum participation",
    ],
    icon: <TrendingUpIcon className="size-5" />,
  },
  {
    id: "12months",
    name: "12 Months",
    duration: "Billed annually",
    price: "$99.99",
    originalPrice: "$299.88",
    savings: "Save 67%",
    popular: true,
    features: [
      "All 3 Month features",
      "Club ownership",
      "Group ownership",
      "Private pictures",
      "Refer clubs privilege",
    ],
    icon: <StarIcon className="size-5" />,
  },
  {
    id: "unlimited",
    name: "Unlimited",
    duration: "Lifetime access",
    price: "$199.99",
    bestValue: true,
    features: [
      "All 12 Month features",
      "Approve new members",
      "Approve public images",
      "First access to new features",
      "VIP status forever",
    ],
    icon: <InfinityIcon className="size-5" />,
  },
]

export default function PricingCards() {
  const [selectedPlans, setSelectedPlans] = useState<Record<string, string>>({})

  const handlePlanSelect = (planId: string, value: string) => {
    setSelectedPlans(prev => ({ ...prev, [planId]: value }))
    // Here you would handle the actual subscription logic
    console.log(`Selected ${value} for plan ${planId}`)
  }

  return (
    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-background p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
          )}
        >
          {/* Badges */}
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
                <StarIcon className="size-3" />
                Most Popular
              </span>
            </div>
          )}
          {plan.bestValue && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-semibold">
                <InfinityIcon className="size-3" />
                Best Value
              </span>
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "p-2.5 rounded-lg",
                plan.popular ? "bg-primary/10 text-primary" : 
                plan.bestValue ? "bg-accent/10 text-accent" :
                "bg-muted text-muted-foreground"
              )}>
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold">{plan.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{plan.duration}</p>
          </div>

          {/* Pricing */}
          <div className="mb-8 h-12 flex items-baseline">
            <span className="text-4xl font-bold">{plan.price}</span>
            {plan.originalPrice && (
              <span className="text-base text-muted-foreground line-through ml-3">
                {plan.originalPrice}
              </span>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8 flex-grow">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckIcon className="size-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Action */}
          <Select
            value={selectedPlans[plan.id]}
            onValueChange={(value) => handlePlanSelect(plan.id, value)}
          >
            <SelectTrigger 
              className="w-full bg-muted hover:bg-muted/80"
            >
              <SelectValue placeholder="Choose Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly - {plan.price}/mo</SelectItem>
              <SelectItem value="annual">
                Annual - {plan.price}/yr
                {plan.savings && <span className="text-xs text-primary ml-2">{plan.savings}</span>}
              </SelectItem>
              <SelectItem value="upgrade">Upgrade Existing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}