"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, XIcon, MinusIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Feature {
  name: string
  free: boolean | "limited"
  paid: boolean | "limited"
  unlimited: boolean | "limited"
}

interface FeatureGroup {
  title: string
  features: Feature[]
}

const featureGroups: FeatureGroup[] = [
  {
    title: "Core Features",
    features: [
      { name: "View Profiles", free: "limited", paid: true, unlimited: true },
      { name: "Search Profiles", free: "limited", paid: true, unlimited: true },
      { name: "Block Members", free: "limited", paid: true, unlimited: true },
      { name: "Hotdates", free: "limited", paid: true, unlimited: true },
      { name: "Forums", free: "limited", paid: true, unlimited: true },
    ],
  },
  {
    title: "Communication",
    features: [
      { name: "Send Mail", free: false, paid: true, unlimited: true },
      { name: "Video IM w/Tags", free: false, paid: true, unlimited: true },
      { name: "Video / Group Chat", free: false, paid: true, unlimited: true },
      { name: "Private Pictures", free: false, paid: true, unlimited: true },
      { name: "Personal Pictures", free: false, paid: true, unlimited: true },
    ],
  },
  {
    title: "Premium Features",
    features: [
      { name: "Affiliate Membership", free: false, paid: true, unlimited: true },
      { name: "Club Ownership", free: false, paid: true, unlimited: true },
      { name: "Group Ownership", free: false, paid: true, unlimited: true },
      { name: "Nudity", free: false, paid: true, unlimited: true },
      { name: "Refer Clubs", free: false, paid: true, unlimited: true },
    ],
  },
  {
    title: "Admin Privileges",
    features: [
      { name: "Approve New Members", free: false, paid: false, unlimited: true },
      { name: "Approve New Public Images", free: false, paid: false, unlimited: true },
      { name: "First to access New Upgrades", free: false, paid: false, unlimited: true },
    ],
  },
]

function FeatureIcon({ value }: { value: boolean | "limited" }) {
  if (value === true) {
    return <CheckIcon className="size-5 text-primary" />
  }
  if (value === "limited") {
    return <MinusIcon className="size-5 text-yellow-500" />
  }
  return <XIcon className="size-5 text-muted-foreground/50" />
}

export default function FeatureComparison() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string>("paid")

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Reset expanded groups when switching tabs to prevent confusion
    setExpandedGroups([])
  }

  // Mobile view with tabs
  const MobileView = () => (
    <div className="lg:hidden">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="free">Free</TabsTrigger>
          <TabsTrigger value="paid">1-12 Mo</TabsTrigger>
          <TabsTrigger value="unlimited">Unlimited</TabsTrigger>
        </TabsList>
        
        {["free", "paid", "unlimited"].map((planType) => (
          <TabsContent key={planType} value={planType} className="space-y-4">
            {featureGroups.map((group) => (
              <div
                key={group.title}
                className="border rounded-lg overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleGroup(group.title)
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold">{group.title}</span>
                  <ChevronDownIcon
                    className={cn(
                      "size-5 transition-transform duration-200",
                      expandedGroups.includes(group.title) && "rotate-180"
                    )}
                  />
                </button>
                {expandedGroups.includes(group.title) && (
                  <div className="p-4 space-y-3 animate-in slide-in-from-top-2 duration-200 bg-white">
                    {group.features.map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{feature.name}</span>
                        <FeatureIcon
                          value={
                            planType === "free"
                              ? feature.free
                              : planType === "paid"
                              ? feature.paid
                              : feature.unlimited
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )

  // Desktop table view
  const DesktopView = () => (
    <div className="hidden lg:block overflow-x-auto bg-white rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 font-semibold">Feature</th>
            <th className="text-center py-4 px-4 font-semibold">
              <div className="flex flex-col items-center">
                <span>Free</span>
                <span className="text-xs font-normal text-muted-foreground mt-1">
                  Limited Access
                </span>
              </div>
            </th>
            <th className="text-center py-4 px-4 font-semibold">
              <div className="flex flex-col items-center">
                <span>1 - 12 Mo</span>
                <span className="text-xs font-normal text-muted-foreground mt-1">
                  Full Access
                </span>
              </div>
            </th>
            <th className="text-center py-4 px-4 font-semibold bg-primary/10">
              <div className="flex flex-col items-center">
                <span>Unlimited</span>
                <span className="text-xs font-normal text-muted-foreground mt-1">
                  VIP Access
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {featureGroups.map((group) => (
            <React.Fragment key={group.title}>
              <tr className="bg-gray-50">
                <td
                  colSpan={4}
                  className="py-3 px-4 font-semibold text-sm uppercase tracking-wider"
                >
                  {group.title}
                </td>
              </tr>
              {group.features.map((feature, index) => (
                <tr
                  key={`${group.title}-${feature.name}`}
                  className={cn(
                    "border-b hover:bg-gray-50 transition-colors bg-white",
                    index === group.features.length - 1 && "border-b-2"
                  )}
                >
                  <td className="py-3 px-4 text-sm">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center">
                      <FeatureIcon value={feature.free} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center">
                      <FeatureIcon value={feature.paid} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center bg-primary/10">
                    <div className="flex justify-center">
                      <FeatureIcon value={feature.unlimited} />
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <CheckIcon className="size-4 text-primary" />
          <span className="text-muted-foreground">Included</span>
        </div>
        <div className="flex items-center gap-2">
          <MinusIcon className="size-4 text-yellow-500" />
          <span className="text-muted-foreground">Limited</span>
        </div>
        <div className="flex items-center gap-2">
          <XIcon className="size-4 text-muted-foreground/50" />
          <span className="text-muted-foreground">Not Available</span>
        </div>
      </div>
      
      <MobileView />
      <DesktopView />
    </>
  )
}