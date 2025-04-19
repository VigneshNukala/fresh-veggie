"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Shipping options
  const [shippingMethod, setShippingMethod] = useState("standard");
  
  const shippingCost = {
    standard: 0,
    express: 12.99
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=checkout");
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            href="/products"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg inline-block transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.product.id} className="py-6 flex">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-800">
                            <h3>
                              <Link href={`/products/${item.product.id}`}>{item.product.name}</Link>
                            </h3>
                            <p className="ml-4">
                              ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                        </div>
                        
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-700"
                              disabled={item.quantity <= (item.product.minOrderQuantity || 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Plus size={16} />
                            </button>
                            <span className="ml-2 text-gray-500">{item.product.unit}</span>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => clearCart()}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
                
                <Link 
                  href="/products"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div>
                <span className="text-gray-600 block mb-2">Shipping</span>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="standard" 
                      checked={shippingMethod === "standard"} 
                      onChange={() => setShippingMethod("standard")}
                      className="mr-2"
                    />
                    <span className="flex-1">Standard Shipping (Free)</span>
                    <span className="font-medium">$0.00</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="express" 
                      checked={shippingMethod === "express"} 
                      onChange={() => setShippingMethod("express")}
                      className="mr-2"
                    />
                    <span className="flex-1">Express Shipping</span>
                    <span className="font-medium">$12.99</span>
                  </label>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(subtotal + shippingCost[shippingMethod as keyof typeof shippingCost]).toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
              Proceed to Checkout
              <ArrowRight size={18} className="ml-2" />
            </button>
            
            <div className="mt-4 text-gray-500 text-sm">
              <p>
                By proceeding to checkout, you agree to our{" "}
                <Link href="/terms" className="text-green-600 hover:text-green-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:text-green-700">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}