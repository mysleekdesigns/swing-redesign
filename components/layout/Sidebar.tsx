"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Search,
  Settings,
  LogOut,
  X,
  UserCircle,
  Menu,
  Bell,
  CreditCard,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/lib/theme-context";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  
  // Determine which logo to use based on theme
  const logoSrc = theme === 'light' || theme === 'bubble-gum' 
    ? '/images/logo-swing.svg' 
    : '/images/Swing.png';

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", href: "/" },
    { icon: UserCircle, label: "My Profile", href: "/profile" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: CreditCard, label: "Billing", href: "/billing" },
  ];

  const secondaryItems: NavItem[] = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ];

  // Function to check if the current path matches the nav item
  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="2xl:hidden backdrop-blur-[20px] bg-card/10 border-b border-sidebar-border dark:bg-card/5">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left - Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-card/20 dark:hover:bg-card/10 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt="Swing Dating"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right - Action Icons */}
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 rounded-lg hover:bg-card/20 dark:hover:bg-card/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
            </button>
            
            <Link
              href="/messages"
              className="relative p-2 rounded-lg hover:bg-card/20 dark:hover:bg-card/10 transition-colors"
              aria-label="Messages"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Message Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 2xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center">
              <Image
                src={logoSrc}
                alt="Swing Dating"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border space-y-1">
            <ThemeToggle variant="sidebar" />
            {secondaryItems.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 z-30 2xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
