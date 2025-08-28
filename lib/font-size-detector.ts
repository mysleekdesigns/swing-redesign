'use client'

import { useEffect } from 'react'

export function useFontSizeDetection() {
  useEffect(() => {
    const detectFontSize = () => {
      // Create a temporary element to measure 1rem in pixels
      const temp = document.createElement('div')
      temp.style.width = '1rem'
      temp.style.position = 'absolute'
      temp.style.visibility = 'hidden'
      document.body.appendChild(temp)
      
      const remInPixels = parseFloat(window.getComputedStyle(temp).width)
      document.body.removeChild(temp)
      
      // Get the root element
      const root = document.documentElement
      
      // Remove existing font size classes
      root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large')
      
      // Standard browser default is 16px
      // If user has set larger text (18px or more), apply large font class
      // If user has set even larger text (20px or more), apply extra large font class
      if (remInPixels >= 20) {
        root.classList.add('font-size-extra-large')
      } else if (remInPixels >= 18) {
        root.classList.add('font-size-large')
      } else {
        root.classList.add('font-size-normal')
      }
      
      // Also detect if user has zoom level set (devicePixelRatio)
      // This helps with users who use browser zoom instead of font size settings
      const zoomLevel = window.devicePixelRatio
      if (zoomLevel >= 1.5) {
        root.classList.add('high-zoom')
      } else {
        root.classList.remove('high-zoom')
      }
    }
    
    // Run on mount
    detectFontSize()
    
    // Listen for changes (resize events can indicate zoom changes)
    window.addEventListener('resize', detectFontSize)
    
    // Also check periodically for changes that don't trigger resize
    // This catches browser font size changes without page reload in some browsers
    const interval = setInterval(detectFontSize, 2000)
    
    return () => {
      window.removeEventListener('resize', detectFontSize)
      clearInterval(interval)
    }
  }, [])
}