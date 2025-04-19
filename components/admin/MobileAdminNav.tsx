"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Package, ShoppingBag, Users, BarChart3, Settings } from "lucide-react";

export default function MobileAdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { path: "/admin", icon: BarChart3, label: "Dashboard" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/customers", icon: Users, label: "Customers" },
    { path: "/admin/settings", icon: Settings, label: "Settings" }
  ];
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="md:hidden">
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <nav className="bg-white border-b border-gray-200 p-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}