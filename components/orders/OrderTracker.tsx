"use client";

import React, { useState } from "react";
import { getOrderById } from "@/data/orders";
import OrderSummary from "./OrderSummary";

export default function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder as any);
      } else {
        setError("Order not found. Please check the order ID and try again.");
      }
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Track Your Order</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-600 mb-4">
            Enter your order ID to track your order status.
          </p>
          
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-001"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                disabled={isSearching || !orderId}
              >
                {isSearching ? "Searching..." : "Track Order"}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 mt-3">{error}</p>
            )}
          </form>
        </div>
        
        {order && <OrderSummary order={order} />}
      </div>
    </div>
  );
}