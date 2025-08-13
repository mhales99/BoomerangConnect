import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { renderWithNavigation } from '../utils/testUtils';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('HomeScreen', () => {
  it('renders correctly with all elements', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check header elements
    expect(getByText('BoomerangConnect')).toBeTruthy();
    expect(getByText('Welcome back!')).toBeTruthy();
    
    // Check card titles
    expect(getByText('Recent Connections')).toBeTruthy();
    expect(getByText('Quick Actions')).toBeTruthy();
    expect(getByText('Statistics')).toBeTruthy();
    
    // Check specific content
    expect(getByText('You have 5 new connection requests')).toBeTruthy();
    expect(getByText('View All')).toBeTruthy();
    expect(getByText('New Connection')).toBeTruthy();
    expect(getByText('Messages')).toBeTruthy();
    
    // Check statistics
    expect(getByText('127')).toBeTruthy();
    expect(getByText('Connections')).toBeTruthy();
    expect(getByText('23')).toBeTruthy();
    expect(getByText('Messages')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
  });

  it('handles button press correctly', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Get the "View All" button and press it
    const viewAllButton = getByText('View All');
    fireEvent.press(viewAllButton);
    
    // Since we don't have actual navigation implemented in the component yet,
    // we're just testing that the button can be pressed without errors
    // In a real test, we would verify navigation occurred
  });

  it('renders with navigation context', () => {
    const { getByText } = renderWithNavigation(<HomeScreen />);
    
    // Verify the screen renders in a navigation context
    expect(getByText('BoomerangConnect')).toBeTruthy();
  });
});
