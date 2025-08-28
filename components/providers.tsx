'use client'

import { ThemeProvider } from '@/lib/theme-context'
import { useFontSizeDetection } from '@/lib/font-size-detector'

export function Providers({ children }: { children: React.ReactNode }) {
  useFontSizeDetection()
  return <ThemeProvider>{children}</ThemeProvider>
}