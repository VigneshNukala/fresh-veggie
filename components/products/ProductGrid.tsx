import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  viewAll?: boolean;
  viewAllLink?: string;
}

export default function ProductGrid({ 
  products, 
  title, 
  viewAll = false, 
  viewAllLink = "/products" 
}: ProductGridProps) {
  return (
    <div className="py-6">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {viewAll && (
            <a 
              href={viewAllLink} 
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              See all &rarr;
            </a>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}