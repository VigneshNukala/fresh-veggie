import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  badge?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  image,
  badge
}: HeroProps) {
  return (
    <div className="relative h-[75vh] max-h-[500px] w-full overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg">
            {badge && (
              <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {badge}
              </span>
            )}
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-gray-200 mb-6">{subtitle}</p>
            <Link 
              href={ctaLink}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-full transition-colors duration-200"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}