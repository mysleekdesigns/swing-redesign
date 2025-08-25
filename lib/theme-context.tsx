'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'dark2' | 'bubble-gum' | 'cyberpunk'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    
    // Apply initial theme classes
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
  }, [])

  const toggleTheme = () => {
    // Only allow theme changes after mount to prevent SSR issues
    if (!mounted) return
    
    // Cycle through five themes: light -> dark -> dark2 -> bubble-gum -> cyberpunk -> light
    let newTheme: Theme
    if (theme === 'light') {
      newTheme = 'dark'
    } else if (theme === 'dark') {
      newTheme = 'dark2'
    } else if (theme === 'dark2') {
      newTheme = 'bubble-gum'
    } else if (theme === 'bubble-gum') {
      newTheme = 'cyberpunk'
    } else {
      newTheme = 'light'
    }
    
    handleSetTheme(newTheme)
  }
  
  const handleSetTheme = (newTheme: Theme) => {
    if (!mounted) return
    
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Apply theme classes
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
  }
  // Always provide context, even during SSR
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Safe version that returns null instead of throwing
export function useSafeTheme() {
  const context = useContext(ThemeContext)
  return context || null
}
