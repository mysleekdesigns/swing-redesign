"use client"

import { CreditCardIcon, ShieldCheckIcon, LockIcon, SmartphoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PaymentMethods() {
  return (
    <div className="mt-12 sm:mt-16 space-y-8">
      {/* Payment Methods */}
      <div className="bg-card rounded-2xl border p-6 sm:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CreditCardIcon className="size-5 text-primary" />
          Payment Methods
        </h3>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card Payment */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Secure Online Payment
            </h4>
            <div className="flex flex-wrap gap-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                alt="Visa" 
                className="h-8 object-contain dark:invert"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" 
                alt="Mastercard" 
                className="h-8 object-contain"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg" 
                alt="American Express" 
                className="h-8 object-contain"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" 
                alt="Discover" 
                className="h-8 object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              All major credit and debit cards accepted. Your payment information is encrypted and secure.
            </p>
          </div>

          {/* Check Payment */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Pay by Check
            </h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">We accept money orders, cash, or gift/prepaid cards.</p>
              <p className="text-xs text-muted-foreground">
                Payments in the form of a check may be mailed to the address below:
              </p>
              <div className="mt-3 p-3 bg-background rounded border text-xs space-y-1">
                <p className="font-medium">DashBoard Hosting LLC</p>
                <p>PO Box 216</p>
                <p>Coral Springs, FL 33067</p>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Please ensure that your profile name is clearly written on your check and that it is made payable to DashBoardHosting LLC and NOT SwingLifeStyle
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheckIcon className="size-5 text-primary" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LockIcon className="size-5 text-primary" />
          <span>256-bit Encryption</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CreditCardIcon className="size-5 text-primary" />
          <span>PCI Compliant</span>
        </div>
      </div>

      <Separator />

      {/* App Downloads */}
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
          <SmartphoneIcon className="size-5 text-primary" />
          Get the SwingLifeStyle App
        </h3>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            className="h-12 px-6"
            onClick={() => window.open("https://apps.apple.com", "_blank")}
          >
            <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </Button>
          <Button
            variant="outline"
            className="h-12 px-6"
            onClick={() => window.open("https://play.google.com", "_blank")}
          >
            <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Google Play
          </Button>
        </div>
      </div>

      {/* Legal */}
      <div className="text-center space-y-3 text-xs text-muted-foreground">
        <p>
          This site does not contain Sexually Explicit Images as defined in 18 U.S.C. 2256.
        </p>
        <p>
          Accordingly, neither this site nor the contents contained herein are covered by the record-keeping provisions of 18 USC 2257(a)-(c).
        </p>
        <Separator className="my-4" />
        <p>
          Disclaimer: This website contains adult material. You must be over 18 to enter or 21 where applicable by law.<br />
          All members are over 18 years of age.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <a href="/terms" className="hover:text-primary transition-colors">Terms of use</a>
          <span>|</span>
          <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="/dmca" className="hover:text-primary transition-colors">DMCA Compliance Policy</a>
        </div>
        <p className="pt-4">
          Copyright © 1999-2025 DashBoardHosting, LLC. and/or its affiliates. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}