"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup";

  if (isAuthPage) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-800 hover:text-green-600 transition duration-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Logo />
          </div>

          {/* Navigation Menu */}
          <nav
            className={`
              absolute md:relative top-full left-0 w-full md:w-auto
              ${mobileMenuOpen ? "block" : "hidden md:block"}
              bg-white md:bg-transparent shadow-md md:shadow-none z-50
              border-t md:border-t-0 border-gray-200
            `}
          >
            <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 space-y-3 md:space-y-0 md:space-x-8">
              <li>
                <Link
                  href="/"
                  className={`text-gray-800 hover:text-green-600 transition duration-200 ${
                    pathname === "/" ? "text-green-600" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`text-gray-800 hover:text-green-600 transition duration-200 ${
                    pathname === "/products" ? "text-green-600" : ""
                  }`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className={`text-gray-800 hover:text-green-600 transition duration-200 ${
                    pathname === "/track-order" ? "text-green-600" : ""
                  }`}
                >
                  Track Order
                </Link>
              </li>
              {isAuthenticated && isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className={`text-gray-800 hover:text-green-600 transition duration-200 ${
                      pathname === "/admin" ? "text-green-600" : ""
                    }`}
                  >
                    Admin
                  </Link>
                </li>
              )}
              
            </ul>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <Link
              href="/search"
              className="text-gray-800 hover:text-green-600 transition duration-200"
              aria-label="Search"
            >
              <Search size={22} />
            </Link>

            <Link
              href="/cart"
              className="text-gray-800 hover:text-green-600 transition duration-200 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {isAuthenticated && (
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-gray-800 hover:text-green-600 transition duration-200"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              )}
          </div>
        </div>
      </div>
    </header>
  );
}
