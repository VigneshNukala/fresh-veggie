"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  
  const isActive = (path: string) => pathname === path;
  
  const navItems = [
    { path: "/", icon: Home, label: "Browse" },
    { path: "/orders", icon: Search, label: "Orders" },
    { path: "/cart", icon: ShoppingCart, label: "Cart", badge: totalItems },
    { path: "/favorites", icon: Heart, label: "Favorites" },
    { path: "/account", icon: User, label: "Account" },
  ];
  
  // Don't show bottom navigation on admin pages or auth pages
  if (pathname.startsWith("/admin") || pathname === "/auth/signin" || pathname === "/auth/signup") {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden z-40">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center py-1 ${
              isActive(item.path) ? "text-green-600" : "text-gray-500"
            }`}
          >
            <div className="relative">
              <item.icon size={20} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}