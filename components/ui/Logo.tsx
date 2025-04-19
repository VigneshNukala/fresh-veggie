import React from 'react';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-green-600';

  return (
    <Link href="/" className="flex items-center">
      <div className="relative">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center absolute left-0.5 top-0.5">
          <Leaf size={iconSizes[size]} className="text-green-600" />
        </div>
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center absolute right-0.5 bottom-0.5">
        </div>
      </div>
      <span className={`ml-8 font-cursive font-bold italic ${sizeClasses[size]} ${textColor}`}>
        FreshVeggies
      </span>
    </Link>
  );
}