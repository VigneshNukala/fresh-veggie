import React from "react";
import Header from "@/components/layout/Header";
import ProductGrid from "@/components/products/ProductGrid";
import { products, categories } from "@/data/products";
import Link from "next/link";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { category } = searchParams;

  // Filter products by category if provided
  const filteredProducts = category
    ? products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar/Categories */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className={`block px-3 py-2 rounded-lg ${
                    !category
                      ? "bg-green-50 text-green-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className={`block px-3 py-2 rounded-lg ${
                      category === cat.slug
                        ? "bg-green-50 text-green-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-3">Bulk Ordering</h3>
            <p className="text-gray-600 text-sm mb-3">
              Save up to 30% on bulk orders. The more you order, the more you
              save!
            </p>
            <Link
              href="/contact"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Contact for large orders &rarr;
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
              : "All Products"}
          </h1>

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>

            <div className="flex items-center space-x-4">
              <label className="text-gray-600 text-sm">Sort by:</label>
              <select className="border border-gray-300 rounded-lg text-sm p-2">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
