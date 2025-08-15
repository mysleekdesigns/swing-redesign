"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Eye,
  MessageSquare,
  Heart,
  User,
  Calendar,
  MapPin,
  Globe,
  Search,
  Settings,
  LogOut,
  X,
  UserCircle,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Who's On", href: "/whos-on" },
    { icon: Eye, label: "Viewed Me", href: "/viewed-me" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Heart, label: "Matches", href: "/matches" },
    { icon: User, label: "My Account", href: "/account" },
    { icon: UserCircle, label: "My Profile", href: "/profile" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: MapPin, label: "Hot Date", href: "/hot-date" },
    { icon: Globe, label: "Travel", href: "/travel" },
    { icon: Search, label: "Search", href: "/search" },
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="2xl:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 2xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center">
              <Image
                src="/images/Swing.png"
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 2xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
