"use client"

import { CreditCardIcon, ShieldCheckIcon, LockIcon, MailIcon, AlertCircleIcon } from "lucide-react"

export default function PaymentMethods() {
  return (
    <div className="mt-12 sm:mt-16 space-y-8">
      {/* Payment Methods */}
      <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <CreditCardIcon className="size-6 text-primary" />
          </div>
          Payment Methods
        </h3>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Card Payment */}
          <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Secure Online Payment
            </h4>
            
            {/* Payment Provider Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg mb-6">
              <div className="flex items-center justify-center p-3 bg-background rounded-lg transition-all duration-300 hover:shadow-sm">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                  alt="Visa" 
                  className="h-8 object-contain dark:invert"
                />
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded-lg transition-all duration-300 hover:shadow-sm">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" 
                  alt="Mastercard" 
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded-lg transition-all duration-300 hover:shadow-sm">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" 
                  alt="American Express" 
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded-lg transition-all duration-300 hover:shadow-sm">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" 
                  alt="Discover" 
                  className="h-8 object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              All major credit and debit cards accepted. Your payment information is encrypted and secure.
            </p>
            
            {/* Security Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/20">
                <ShieldCheckIcon className="size-4" />
                <span>SSL Secured</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/20">
                <LockIcon className="size-4" />
                <span>256-bit Encryption</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/20">
                <CreditCardIcon className="size-4" />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>

          {/* Check Payment */}
          <div className="bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Pay by Check
            </h4>
            
            {/* Warning Message */}
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6">
              <AlertCircleIcon className="size-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-destructive">
                We cannot accept money orders, cash, or gift/prepaid cards.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-sm text-foreground">
                Payments in the form of a check may be mailed to the address below.
              </p>
              <p className="text-sm text-foreground">
                Please ensure that your profile name is clearly written on your check and that it is made payable to <span className="font-semibold text-primary">Dashboardhosting LLC</span> and <span className="font-semibold text-destructive">NOT</span> <span className="font-semibold">SwingLifeStyle</span>.
              </p>
            </div>
            
            {/* Mailing Address Card */}
            <div className="bg-background/50 rounded-xl border p-6 space-y-2 transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <MailIcon className="size-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">Mailing Address</p>
              </div>
              <p className="text-sm text-foreground font-medium">DashBoard Hosting, LLC</p>
              <p className="text-sm text-foreground">4613 N. University Drive #239</p>
              <p className="text-sm text-foreground">Coral Springs, FL. 33067</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}