// app/page.tsx
"use client";

import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    redirect('/auth/signin');
  }

  // Redirect based on user role
  if (user?.role === 'admin') {
    redirect('/admin');
  }
  redirect('/products');
}
