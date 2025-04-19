import React from "react";
import { Order } from "@/types";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
          <p className="text-gray-500 text-sm">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-semibold mb-3">Items</h3>
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li key={item.product.id} className="flex justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden relative mr-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="text-gray-800 font-medium">{item.product.name}</h4>
                  <p className="text-gray-500 text-sm">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800 font-medium">${order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-800 font-medium">$0.00</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-3">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {order.trackingNumber && (
        <div className="border-t border-gray-200 mt-6 pt-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p className="text-gray-600">
            <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Address:</span><br />
            {order.shippingAddress.fullName}<br />
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </p>
        </div>
      )}
    </div>
  );
}