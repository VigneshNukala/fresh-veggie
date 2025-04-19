"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export default function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, quantity);
  };
  
  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(q => q + 1);
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(q => Math.max(1, q - 1));
  };
  
  return (
    <Link href={`/products/${product.id}`}>
      <div className={`bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:shadow-md ${
        layout === "grid" ? "h-full" : "flex"
      }`}>
        <div className={`relative ${layout === "grid" ? "h-48" : "h-32 w-32 flex-shrink-0"}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors duration-200"
          >
            <Heart
              size={18}
              className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}
            />
          </button>
          {product.salePrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
              SALE
            </div>
          )}
        </div>
        
        <div className={`p-3 ${layout === "list" ? "flex-grow" : ""}`}>
          <div className="text-xs text-gray-500">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
          <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {product.salePrice ? (
                <>
                  <span className="text-gray-800 font-bold">${product.salePrice.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm line-through ml-2">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={decrementQuantity}
                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1.5 transition-colors duration-200"
            >
              <ShoppingCart size={16} className="mr-1" />
              <span className="text-xs font-medium">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}