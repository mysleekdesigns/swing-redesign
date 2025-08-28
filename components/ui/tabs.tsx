"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  registerTab: (value: string, element: HTMLButtonElement | null) => void;
  unregisterTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, className, children }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    
    const handleValueChange = React.useCallback((newValue: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    }, [controlledValue, onValueChange]);

    const registerTab = React.useCallback((tabValue: string, element: HTMLButtonElement | null) => {
      if (element) {
        tabRefs.current.set(tabValue, element);
      } else {
        tabRefs.current.delete(tabValue);
      }
    }, []);

    const unregisterTab = React.useCallback((tabValue: string) => {
      tabRefs.current.delete(tabValue);
    }, []);

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, registerTab, unregisterTab }}>
        <div ref={ref} className={cn("w-full", className)}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!context || !listRef.current) return;

    const updateIndicator = () => {
      const activeButton = listRef.current?.querySelector(`[data-state="active"]`) as HTMLButtonElement;
      if (activeButton && listRef.current) {
        const listRect = listRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        setIndicatorStyle({
          left: buttonRect.left - listRect.left,
          width: buttonRect.width,
          height: buttonRect.height,
          top: buttonRect.top - listRect.top
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [context, context?.value]);

  return (
    <div
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground relative",
        className
      )}
      {...props}
    >
      {children}
      <div
        className="absolute bg-background shadow-sm transition-all duration-500 ease-in-out rounded-sm"
        style={indicatorStyle}
      />
    </div>
  );
});
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    
    if (!context) {
      throw new Error("TabsTrigger must be used within Tabs");
    }
    
    const isSelected = context.value === value;

    React.useEffect(() => {
      context.registerTab(value, buttonRef.current);
      return () => context.unregisterTab(value);
    }, [value, context]);
    
    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        type="button"
        role="tab"
        aria-selected={isSelected}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative z-10",
          isSelected ? "text-foreground" : "hover:text-foreground/70",
          className
        )}
        onClick={() => context.onValueChange(value)}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error("TabsContent must be used within Tabs");
    }
    
    const isSelected = context.value === value;
    
    if (!isSelected) return null;
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };