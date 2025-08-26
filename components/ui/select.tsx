"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  selected?: string
  setSelected: (value: string) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children?: React.ReactNode
}

function Select({ value, onValueChange, defaultValue, children }: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(value || defaultValue || "")
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (value !== undefined) {
      setSelected(value)
    }
  }, [value])

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelected(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider 
      value={{ 
        value: value || selected,
        onValueChange: handleValueChange,
        open,
        setOpen,
        selected: value || selected,
        setSelected: handleValueChange,
        triggerRef
      }}
    >
      <div data-slot="select" className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div data-slot="select-group">{children}</div>
}

interface SelectValueProps {
  placeholder?: string
  children?: React.ReactNode
}

function SelectValue({ placeholder, children }: SelectValueProps) {
  const { selected } = useSelectContext()
  
  return (
    <span data-slot="select-value" className="pointer-events-none">
      {children || selected || placeholder}
    </span>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default"
  children?: React.ReactNode
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const { open, setOpen, triggerRef, selected } = useSelectContext()

    // Merge the external ref with our internal ref
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement)

    return (
      <button
        ref={triggerRef}
        data-slot="select-trigger"
        data-size={size}
        data-state={open ? "open" : "closed"}
        data-placeholder={!selected}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="select-listbox"
        onClick={() => setOpen(!open)}
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned"
  children?: React.ReactNode
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useSelectContext()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 })
    
    // Combine refs
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (open && triggerRef.current) {
        // Use the trigger ref directly to calculate position
        const trigger = triggerRef.current
        const rect = trigger.getBoundingClientRect()
        
        // Ensure we have valid dimensions
        if (rect.width > 0 && rect.height > 0) {
          setDropdownPosition({
            top: rect.bottom + window.scrollY + 4, // 4px gap
            left: rect.left + window.scrollX,
            width: rect.width
          })
        } else {
          // Fallback: try again after a small delay
          setTimeout(() => {
            if (triggerRef.current) {
              const rect = triggerRef.current.getBoundingClientRect()
              setDropdownPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width
              })
            }
          }, 10)
        }
      }
    }, [open, triggerRef])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
            setOpen(false)
          }
        }
      }

      const handleScroll = () => {
        // Update position on scroll
        if (triggerRef.current && open) {
          const rect = triggerRef.current.getBoundingClientRect()
          setDropdownPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
            width: rect.width
          })
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("scroll", handleScroll, true)
        window.addEventListener("resize", handleScroll)
        return () => {
          document.removeEventListener("mousedown", handleClickOutside)
          document.removeEventListener("scroll", handleScroll, true)
          window.removeEventListener("resize", handleScroll)
        }
      }
    }, [open, setOpen, triggerRef])

    // Don't render if not open or if position is invalid
    if (!open || (dropdownPosition.top === 0 && dropdownPosition.left === 0)) return null

    const dropdownContent = (
      <div
        ref={contentRef}
        id="select-listbox"
        data-slot="select-content"
        data-state={open ? "open" : "closed"}
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          minWidth: `${dropdownPosition.width}px`,
          zIndex: 9999,
        }}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 max-h-96 origin-top overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          className
        )}
        {...props}
      >
        <div className="p-1">
          {children}
        </div>
      </div>
    )

    // Portal to body
    return ReactDOM.createPortal(dropdownContent, document.body)
  }
)
SelectContent.displayName = "SelectContent"

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement>

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <div
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children?: React.ReactNode
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const { selected, setSelected } = useSelectContext()
    const isSelected = selected === value

    return (
      <div
        ref={ref}
        data-slot="select-item"
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={disabled}
        role="option"
        aria-selected={isSelected}
        onClick={() => !disabled && setSelected(value)}
        className={cn(
          "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
          isSelected && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      >
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          {isSelected && <CheckIcon className="size-4" />}
        </span>
        <span>{children || value}</span>
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

type SelectSeparatorProps = React.HTMLAttributes<HTMLDivElement>

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <div
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </div>
  )
}

function SelectScrollDownButton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </div>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}