"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/auth/');

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              {!isAuthPage && <Header />}
              <main className="flex-grow pt-16">{children}</main>
              {!isAuthPage && (
                <>
                  <Footer />
                  <BottomNavigation />
                </>
              )}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
