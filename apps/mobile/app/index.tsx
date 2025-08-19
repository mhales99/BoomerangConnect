import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@boomerang/core';

export default function Index() {
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && userProfile) {
        // User is authenticated, redirect to tabs
        router.replace('/(tabs)');
      } else {
        // User is not authenticated, redirect to welcome page
        router.replace('/welcome');
      }
    }
  }, [user, userProfile, loading, router]);

  return null; // This page will redirect immediately
}
