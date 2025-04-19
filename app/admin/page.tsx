"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import MobileAdminNav from "@/components/admin/MobileAdminNav";
import { useAuth } from "@/context/AuthContext";

type OrderStatus = "Pending" | "In Progress" | "Delivered" | "Cancelled";

interface Order {
  id: number;
  customerName: string;
  address: string;
  status: OrderStatus;
  amount: number;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function AdminDashboard() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchOrders();
      fetchProducts();
    }
  }, [isAuthenticated, isAdmin]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1">
          <MobileAdminNav />

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Orders"
                value={orders.length.toString()}
                icon={<ShoppingBag size={24} className="text-green-600" />}
                iconBg="bg-green-100"
                change="+12%"
              />
              <StatCard
                title="Total Products"
                value={products.length.toString()}
                icon={<Package size={24} className="text-blue-600" />}
                iconBg="bg-blue-100"
                change="+5%"
              />
              <StatCard
                title="Total Customers"
                value="78"
                icon={<Users size={24} className="text-purple-600" />}
                iconBg="bg-purple-100"
                change="+18%"
              />
              <StatCard
                title="Total Revenue"
                value={`$${orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2)}`}
                icon={<BarChart3 size={24} className="text-orange-600" />}
                iconBg="bg-orange-100"
                change="-3%"
                isNegative
              />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Orders
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ORD-{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            className="text-sm border-gray-300 rounded"
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(
                                order.id,
                                e.target.value as OrderStatus
                              )
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${order.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  icon,
  iconBg,
  change,
  isNegative = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  change: string;
  isNegative?: boolean;
}) => {
  const ArrowIcon = isNegative ? ArrowDownRight : ArrowUpRight;
  const arrowColor = isNegative ? "text-red-600" : "text-green-600";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
      </div>
      <div className="flex items-center mt-4">
        <ArrowIcon size={16} className={`${arrowColor} mr-1`} />
        <span className={`${arrowColor} text-sm font-medium`}>{change}</span>
        <span className="text-gray-500 text-sm ml-1">from last month</span>
      </div>
    </div>
  );
};
