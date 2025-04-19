"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingBag, Users, BarChart3, Settings } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  const navItems = [
    { path: "/admin", icon: BarChart3, label: "Dashboard" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/customers", icon: Users, label: "Customers" },
    { path: "/admin/settings", icon: Settings, label: "Settings" }
  ];
  
  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen hidden md:block">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}