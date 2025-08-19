'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@boomerang/core';

export default function HomePage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && userProfile) {
        // User is authenticated, redirect to dashboard
        router.push('/dashboard');
      } else {
        // User is not authenticated, redirect to welcome page
        router.push('/welcome');
      }
    }
  }, [user, userProfile, loading, router]);

  return null; // This page will redirect immediately
}
