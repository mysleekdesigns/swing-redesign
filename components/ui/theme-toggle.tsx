'use client'

import { Moon, Sun, Palette, Cpu } from 'lucide-react'
import { useSafeTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ThemeToggleProps {
  className?: string
  variant?: 'button' | 'sidebar'
}

export function ThemeToggle({ className, variant = 'button' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const [fallbackTheme, setFallbackTheme] = useState<'light' | 'dark' | 'dark2' | 'bubble-gum' | 'cyberpunk'>('light')

  // Always call the safe hook - returns null if context unavailable
  const themeContext = useSafeTheme()
  const hasContextError = !themeContext

  // Track mounting state for hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize fallback theme from localStorage/system when needed
  useEffect(() => {
    if (!mounted || (!hasContextError && themeContext)) return

    // Only initialize fallback if context is not available
    try {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'dark2' | 'bubble-gum' | 'cyberpunk' | null
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const initialTheme = savedTheme || systemTheme
      
      setFallbackTheme(initialTheme)
      document.documentElement.classList.remove('dark', 'dark2', 'bubble-gum', 'cyberpunk')
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (initialTheme === 'dark2') {
        document.documentElement.classList.add('dark2')
      } else if (initialTheme === 'bubble-gum') {
        document.documentElement.classList.add('bubble-gum')
      } else if (initialTheme === 'cyberpunk') {
        document.documentElement.classList.add('cyberpunk', 'dark')
      }
    } catch {
      // Even localStorage might fail in some environments
      setFallbackTheme('light')
    }
  }, [mounted, hasContextError, themeContext])

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'dark2' | 'bubble-gum' | 'cyberpunk') => {
    if (!mounted) return

    if (themeContext && !hasContextError) {
      // Use context setTheme function when available
      try {
        themeContext.setTheme(newTheme)
      } catch {
        // If context setTheme fails, fall back to manual change
        handleFallbackThemeChange(newTheme)
      }
    } else {
      // Use fallback when context is unavailable
      handleFallbackThemeChange(newTheme)
    }
  }

  const handleFallbackThemeChange = (newTheme: 'light' | 'dark' | 'dark2' | 'bubble-gum' | 'cyberpunk') => {
    setFallbackTheme(newTheme)
    
    // Apply theme changes directly
    try {
      document.documentElement.classList.remove('dark', 'dark2', 'bubble-gum', 'cyberpunk')
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (newTheme === 'dark2') {
        document.documentElement.classList.add('dark2')
      } else if (newTheme === 'bubble-gum') {
        document.documentElement.classList.add('bubble-gum')
      } else if (newTheme === 'cyberpunk') {
        document.documentElement.classList.add('cyberpunk', 'dark')
      }
      localStorage.setItem('theme', newTheme)
    } catch {
      // Silently fail if DOM operations are not available
    }
  }

  // Determine current theme - prefer context over fallback
  const currentTheme = (themeContext && !hasContextError) ? themeContext.theme : fallbackTheme

  // Get the icon for the current theme
  const getThemeIcon = () => {
    if (currentTheme === 'dark') {
      return <Moon className="h-5 w-5 text-primary" />
    } else if (currentTheme === 'dark2') {
      return <Moon className="h-5 w-5 text-primary" />
    } else if (currentTheme === 'bubble-gum') {
      return <Palette className="h-5 w-5 text-primary" />
    } else if (currentTheme === 'cyberpunk') {
      return <Cpu className="h-5 w-5 text-primary" />
    }
    return <Sun className="h-5 w-5 text-primary" />
  }

  const getThemeLabel = () => {
    if (currentTheme === 'dark') return 'Dark Mode'
    if (currentTheme === 'dark2') return 'Dark Mode 2'
    if (currentTheme === 'bubble-gum') return 'Bubble Gum'
    if (currentTheme === 'cyberpunk') return 'Cyberpunk'
    return 'Light Mode'
  }

  // Show loading state during hydration to prevent layout shift
  if (!mounted) {
    if (variant === 'sidebar') {
      return (
        <button
          disabled
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "text-sidebar-foreground opacity-50 cursor-not-allowed",
            className
          )}
          aria-label="Loading theme toggle"
        >
          <div className="w-5 h-5 animate-pulse bg-current opacity-20 rounded" />
          <span className="font-medium">Loading...</span>
        </button>
      )
    }
    return (
      <button
        disabled
        className={cn(
          "relative w-full h-14 px-6 flex items-center gap-3",
          "bg-gradient-to-r from-sidebar-accent/60 to-sidebar-accent/80",
          "dark:from-sidebar-accent/40 dark:to-sidebar-accent/60",
          "backdrop-blur-md border border-sidebar-border/40",
          "dark:border-sidebar-border/30",
          "rounded-xl opacity-50 cursor-not-allowed",
          "text-sidebar-foreground/50",
          className
        )}
        aria-label="Loading theme toggle"
      >
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 h-5 w-5 animate-pulse bg-current opacity-20 rounded" />
        </div>
        <span className="font-medium text-sm tracking-wide">
          Loading...
        </span>
      </button>
    )
  }

  if (variant === 'sidebar') {
    return (
      <DropdownMenu className="w-full">
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg",
              "text-sidebar-foreground transition-all",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "focus:outline-none",
              "w-full",
              "theme-toggle-no-border",
              "font-medium",
              className
            )}
            aria-label={`Theme selector: ${getThemeLabel()}`}
          >
            <div className="relative w-5 h-5 flex-shrink-0 transition-all duration-300">
              {getThemeIcon()}
            </div>
            <span>
              {getThemeLabel()}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-40">
          <DropdownMenuItem 
            onClick={() => handleThemeChange('light')}
            className={cn(
              "flex items-center gap-2",
              currentTheme === 'light' && "bg-accent"
            )}
          >
            <Sun className="h-4 w-4" />
            <span>Light Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleThemeChange('dark')}
            className={cn(
              "flex items-center gap-2",
              currentTheme === 'dark' && "bg-accent"
            )}
          >
            <Moon className="h-4 w-4" />
            <span>Dark Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleThemeChange('dark2')}
            className={cn(
              "flex items-center gap-2",
              currentTheme === 'dark2' && "bg-accent"
            )}
          >
            <Moon className={cn("h-4 w-4", currentTheme === 'dark2' && "text-primary")} />
            <span>Dark Mode 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleThemeChange('bubble-gum')}
            className={cn(
              "flex items-center gap-2",
              currentTheme === 'bubble-gum' && "bg-accent"
            )}
          >
            <Palette className="h-4 w-4" />
            <span>Bubble Gum</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleThemeChange('cyberpunk')}
            className={cn(
              "flex items-center gap-2",
              currentTheme === 'cyberpunk' && "bg-accent"
            )}
          >
            <Cpu className="h-4 w-4" />
            <span>Cyberpunk</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative w-full h-14 px-6 flex items-center gap-3",
            "bg-gradient-to-r from-sidebar-accent/80 to-sidebar-accent/90",
            "dark:from-sidebar-accent/60 dark:to-sidebar-accent/80",
            "hover:from-sidebar-accent/90 hover:to-sidebar-accent/100",
            "dark:hover:from-sidebar-accent/70 dark:hover:to-sidebar-accent/90",
            "backdrop-blur-md border border-sidebar-border/60",
            "dark:border-sidebar-border/40",
            "hover:border-sidebar-border/80 dark:hover:border-sidebar-border/60",
            "transition-all duration-300 rounded-xl",
            "text-sidebar-foreground/90 hover:text-sidebar-foreground",
            "focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2",
            "focus:ring-offset-sidebar-background",
            "group shadow-lg shadow-sidebar-accent/10",
            "hover:shadow-xl hover:shadow-sidebar-accent/20",
            "dark:shadow-sidebar-accent/5 dark:hover:shadow-sidebar-accent/15",
            className
          )}
          aria-label={`Theme selector: ${getThemeLabel()}`}
        >
          <div className="relative w-5 h-5 transition-all duration-300 group-hover:scale-110">
            {getThemeIcon()}
          </div>
          <span className="font-medium text-sm tracking-wide">
            {getThemeLabel()}
          </span>
          <div 
            className={cn(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
              "bg-gradient-to-r from-sidebar-accent/10 to-sidebar-accent/5",
              "dark:from-sidebar-accent/15 dark:to-sidebar-accent/8",
              "transition-opacity duration-300 pointer-events-none"
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-40">
        <DropdownMenuItem 
          onClick={() => handleThemeChange('light')}
          className={cn(
            "flex items-center gap-2",
            currentTheme === 'light' && "bg-accent"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('dark')}
          className={cn(
            "flex items-center gap-2",
            currentTheme === 'dark' && "bg-accent"
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('dark2')}
          className={cn(
            "flex items-center gap-2",
            currentTheme === 'dark2' && "bg-accent"
          )}
        >
          <Moon className={cn("h-4 w-4", currentTheme === 'dark2' && "text-primary")} />
          <span>Dark Mode 2</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('bubble-gum')}
          className={cn(
            "flex items-center gap-2",
            currentTheme === 'bubble-gum' && "bg-accent"
          )}
        >
          <Palette className="h-4 w-4" />
          <span>Bubble Gum</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('cyberpunk')}
          className={cn(
            "flex items-center gap-2",
            currentTheme === 'cyberpunk' && "bg-accent"
          )}
        >
          <Cpu className="h-4 w-4" />
          <span>Cyberpunk</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}