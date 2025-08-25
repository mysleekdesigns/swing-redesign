"use client"

import { CreditCardIcon, ShieldCheckIcon, LockIcon } from "lucide-react"

export default function PaymentMethods() {
  return (
    <div className="mt-12 sm:mt-16 space-y-8">
      {/* Payment Methods */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8">
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
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" 
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
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">We accept money orders, cash, or gift/prepaid cards.</p>
              <p className="text-xs text-muted-foreground">
                Payments in the form of a check may be mailed to the address below:
              </p>
              <div className="mt-3 p-3 bg-white rounded border text-xs space-y-1">
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
    </div>
  )
}