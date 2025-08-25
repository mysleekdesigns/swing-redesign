import { Metadata } from "next"
import PricingCards from "@/components/sections/billing/PricingCards"
import FeatureComparison from "@/components/sections/billing/FeatureComparison"
import PaymentMethods from "@/components/sections/billing/PaymentMethods"
import BillingToggle from "@/components/sections/billing/BillingToggle"

export const metadata: Metadata = {
  title: "Membership Subscription - Swing",
  description: "Upgrade your SwingLifeStyle membership for unlimited access to all features",
}

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Membership Subscription
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Congratulations, you are an Unlimited Member!
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-3xl mx-auto">
            Unlimited members are a cornerstone of the community and we appreciate the trust you&apos;ve placed in us with your membership.
          </p>
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Thank you,<br />
              <span className="font-semibold text-foreground">SwingLifeStyle Team</span>
            </p>
          </div>
        </div>

        {/* Billing Toggle */}
        <BillingToggle />

        {/* Pricing Cards */}
        <PricingCards />

        {/* Feature Comparison */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Compare SwingLifeStyle Subscriptions
          </h2>
          <FeatureComparison />
        </div>

        {/* Payment Methods */}
        <PaymentMethods />
      </div>
    </div>
  )
}