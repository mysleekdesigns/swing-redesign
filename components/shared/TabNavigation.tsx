"use client";

import { useRef, useEffect, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({ tabs, activeTab, onTabChange, className = "" }: TabNavigationProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabIndicatorWidth, setTabIndicatorWidth] = useState(0);
  const [tabIndicatorLeft, setTabIndicatorLeft] = useState(0);

  // Update indicator position when activeTab changes
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex === -1) return;
    
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeIndex];
      if (currentTab) {
        setTabIndicatorLeft(currentTab.offsetLeft);
        setTabIndicatorWidth(currentTab.clientWidth);
      }
    };
    
    setTabPosition();
    
    // Handle window resize
    const handleResize = () => setTabPosition();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, tabs]);

  return (
    <div className={`relative flex p-1 rounded-2xl bg-muted/50 border border-border w-full ${className}`}>
      {/* Sliding Indicator */}
      <div 
        className="absolute top-1 bottom-1 bg-primary rounded-xl shadow-lg transition-all duration-300 ease-out"
        style={{
          width: tabIndicatorWidth,
          transform: `translateX(${tabIndicatorLeft}px)` 
        }}
      />
      
      {/* Tab Buttons */}
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => { tabsRef.current[index] = el; }}
          onClick={() => onTabChange(tab.id)}
          className={`relative z-10 flex-1 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-center ${
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}