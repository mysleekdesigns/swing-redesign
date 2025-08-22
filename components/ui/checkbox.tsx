"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
    
    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked as boolean)
      }
    }, [checked])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      if (checked === undefined) {
        setIsChecked(newChecked)
      }
      onCheckedChange?.(newChecked)
      onChange?.(e)
    }
    
    const handleClick = () => {
      inputRef.current?.click()
    }
    
    const displayChecked = checked !== undefined ? checked : isChecked
    
    return (
      <div className="relative inline-flex">
        <input
          type="checkbox"
          ref={inputRef}
          checked={displayChecked}
          onChange={handleChange}
          className="sr-only peer"
          {...props}
        />
        <div
          data-slot="checkbox"
          data-state={displayChecked ? "checked" : "unchecked"}
          className={cn(
            "relative bg-background border-2 border-muted-foreground/50 dark:bg-background/50 dark:border-muted-foreground/60",
            "peer-checked:bg-primary peer-checked:text-primary-foreground dark:peer-checked:bg-primary peer-checked:border-primary",
            "peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-aria-invalid:ring-destructive/20 dark:peer-aria-invalid:ring-destructive/40 peer-aria-invalid:border-destructive",
            "size-4 shrink-0 rounded-[4px] shadow-xs transition-all outline-none peer-focus-visible:ring-[3px]",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:border-primary/70",
            "flex items-center justify-center cursor-pointer",
            className
          )}
          onClick={handleClick}
        >
          {displayChecked && (
            <CheckIcon className="size-3.5 text-current" />
          )}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
