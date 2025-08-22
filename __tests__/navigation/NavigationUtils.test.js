import React from 'react';
import { CommonActions } from '@react-navigation/native';

// Create a mock navigation utility file to test
// This would typically be in src/navigation/NavigationUtils.js
const NavigationUtils = {
  // Reference to the navigation object
  _navigator: null,

  // Set the navigator reference
  setNavigator: (navigatorRef) => {
    NavigationUtils._navigator = navigatorRef;
  },

  // Navigate to a screen
  navigate: (routeName, params) => {
    if (NavigationUtils._navigator) {
      NavigationUtils._navigator.dispatch(
        CommonActions.navigate({
          name: routeName,
          params,
        })
      );
    }
  },

  // Go back
  goBack: () => {
    if (NavigationUtils._navigator) {
      NavigationUtils._navigator.dispatch(CommonActions.goBack());
    }
  },

  // Reset navigation state
  reset: (routes, index = 0) => {
    if (NavigationUtils._navigator) {
      NavigationUtils._navigator.dispatch(
        CommonActions.reset({
          index,
          routes,
        })
      );
    }
  },
};

describe('NavigationUtils', () => {
  let mockNavigator;

  beforeEach(() => {
    // Create a mock navigator object for each test
    mockNavigator = {
      dispatch: jest.fn(),
    };
    
    // Set the mock navigator
    NavigationUtils.setNavigator(mockNavigator);
  });

  it('should navigate to a screen', () => {
    // Call the navigate method
    NavigationUtils.navigate('Home', { userId: '123' });
    
    // Check that dispatch was called with the correct action
    expect(mockNavigator.dispatch).toHaveBeenCalledWith(
      CommonActions.navigate({
        name: 'Home',
        params: { userId: '123' },
      })
    );
  });

  it('should go back', () => {
    // Call the goBack method
    NavigationUtils.goBack();
    
    // Check that dispatch was called with the correct action
    expect(mockNavigator.dispatch).toHaveBeenCalledWith(
      CommonActions.goBack()
    );
  });

  it('should reset navigation state', () => {
    // Call the reset method
    const routes = [
      { name: 'Home' },
      { name: 'Profile', params: { userId: '123' } },
    ];
    
    NavigationUtils.reset(routes, 1);
    
    // Check that dispatch was called with the correct action
    expect(mockNavigator.dispatch).toHaveBeenCalledWith(
      CommonActions.reset({
        index: 1,
        routes,
      })
    );
  });

  it('should not throw if navigator is not set', () => {
    // Unset the navigator
    NavigationUtils.setNavigator(null);
    
    // These should not throw errors
    expect(() => {
      NavigationUtils.navigate('Home');
      NavigationUtils.goBack();
      NavigationUtils.reset([{ name: 'Home' }]);
    }).not.toThrow();
  });
});


