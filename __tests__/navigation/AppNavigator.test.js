import React from 'react';
import { render, act } from '@testing-library/react-native';
import AppNavigator from '../../src/navigation/AppNavigator';

// Mock all the screens
jest.mock('../../src/screens/HomeScreen', () => {
  return function MockHomeScreen() {
    return null;
  };
});

jest.mock('../../src/screens/ProfileScreen', () => {
  return function MockProfileScreen() {
    return null;
  };
});

jest.mock('../../src/screens/ConnectScreen', () => {
  return function MockConnectScreen() {
    return null;
  };
});

jest.mock('../../src/screens/SettingsScreen', () => {
  return function MockSettingsScreen() {
    return null;
  };
});

// Mock navigation container
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }) => children,
  };
});

// Mock tab navigator
jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ name }) => name,
    }),
  };
});

// Mock stack navigator
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ name }) => name,
    }),
  };
});

describe('AppNavigator', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<AppNavigator />);
    });
    // If it renders without throwing, we pass the test
    expect(true).toBeTruthy();
  });

  // More comprehensive tests would verify:
  // - That the correct screens are registered
  // - That navigation between screens works correctly
  // - That the tab bar shows the correct labels
  // - That authentication state affects navigation
  
  // These tests would require more complex mocking and are beyond
  // the scope of this basic test setup
});
