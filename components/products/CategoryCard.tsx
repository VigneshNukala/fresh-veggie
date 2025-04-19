import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.slug}`}>
      <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="h-28 md:h-36">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="font-bold">{category.name}</h3>
          <p className="text-xs text-gray-100">From ${category.slug === 'fruits' ? '3' : category.slug === 'vegetables' ? '2' : '1.25'}</p>
        </div>
      </div>
    </Link>
  );
}