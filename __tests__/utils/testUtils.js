import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Helper function to render components with navigation context
export function renderWithNavigation(component) {
  return render(
    <NavigationContainer>{component}</NavigationContainer>
  );
}

// Mock Firebase auth state
export const mockAuthState = (isAuthenticated = false) => {
  const authState = isAuthenticated
    ? { 
        currentUser: { 
          uid: 'test-uid', 
          email: 'test@example.com',
          displayName: 'Test User',
        } 
      }
    : { currentUser: null };
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => authState),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback(authState.currentUser);
      return jest.fn(); // Return unsubscribe function
    }),
  }));
  
  return authState;
};

// Helper to wait for promises to resolve
export const flushPromises = () => new Promise(resolve => setImmediate(resolve));
