/**
 * BoomerangConnect App
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';

// Import navigators
import AppNavigator from './src/navigation/AppNavigator';
import WebAppNavigator from './src/navigation/WebAppNavigator';

// Use platform-specific navigator
const Navigator = Platform.OS === 'web' ? WebAppNavigator : AppNavigator;

// Conditionally import Firebase services to avoid issues on web
const loadServices = () => {
  // Use dynamic imports to prevent loading issues on web
  if (Platform.OS !== 'web') {
    return Promise.all([
      import('./src/services/FirebaseService'),
      import('./src/services/NotificationService'),
      import('./src/components/NotificationBanner'),
      import('./src/components/NotificationPermission')
    ]).then(([
      { default: firebaseService },
      { default: notificationService },
      { default: NotificationBanner },
      { default: NotificationPermission }
    ]) => {
      return { firebaseService, notificationService, NotificationBanner, NotificationPermission };
    });
  }
  return Promise.resolve({ firebaseService: null, notificationService: null, NotificationBanner: null, NotificationPermission: null });
};

function App(): React.JSX.Element {
  const [notification, setNotification] = useState(null);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [services, setServices] = useState({ 
    firebaseService: null, 
    notificationService: null, 
    NotificationBanner: null, 
    NotificationPermission: null 
  });

  useEffect(() => {
    // Load services based on platform
    loadServices().then(loadedServices => {
      setServices(loadedServices);
      
      // Initialize services if not on web
      if (Platform.OS !== 'web' && loadedServices.firebaseService && loadedServices.notificationService) {
        // Initialize Firebase
        loadedServices.firebaseService.initialize();

        // Initialize notifications
        initializeNotifications(loadedServices.notificationService);

        // Check if we should show permission prompt
        checkNotificationPermission(loadedServices.notificationService);
      }
    });
  }, []);

  const initializeNotifications = async (notificationService) => {
    if (!notificationService) return;
    
    await notificationService.initialize({
      onNotificationReceived: handleNotificationReceived,
      onNotificationOpenedApp: handleNotificationOpened,
      onTokenRefresh: handleTokenRefresh,
    });
  };

  const checkNotificationPermission = async (notificationService) => {
    if (!notificationService) return;
    
    const status = await notificationService.checkPermission();
    // Show permission prompt if not granted and not blocked
    if (status !== 'granted' && status !== 'blocked') {
      setShowPermissionPrompt(true);
    }
  };

  const handleNotificationReceived = (receivedNotification) => {
    console.log('Notification received:', receivedNotification);
    // Show in-app notification banner
    setNotification(receivedNotification.notification || receivedNotification);
  };

  const handleNotificationOpened = (openedNotification) => {
    console.log('Notification opened:', openedNotification);
    // Handle navigation or other actions based on notification data
    // Example: navigate to a specific screen based on notification type
    const data = openedNotification.data || {};
    
    // Clear any displayed notification
    setNotification(null);
  };

  const handleTokenRefresh = (token) => {
    console.log('FCM token refreshed:', token);
    // Here you would typically send this token to your backend
    // to associate it with the current user
  };

  const handleNotificationBannerPress = (pressedNotification) => {
    // Handle notification banner press
    // This would typically navigate to a specific screen
    setNotification(null);
  };

  const handlePermissionChange = (granted) => {
    if (granted) {
      setShowPermissionPrompt(false);
    }
  };

  // Render notification components only if not on web and they're loaded
  const renderNotificationComponents = () => {
    if (Platform.OS === 'web' || !services.NotificationBanner || !services.NotificationPermission) {
      return null;
    }

    const { NotificationBanner, NotificationPermission } = services;
    
    return (
      <>
        {/* Notification Permission Prompt */}
        {showPermissionPrompt && (
          <NotificationPermission onPermissionChange={handlePermissionChange} />
        )}
        
        {/* In-app Notification Banner */}
        <NotificationBanner
          notification={notification}
          onPress={handleNotificationBannerPress}
          onDismiss={() => setNotification(null)}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Use the platform-specific navigator */}
      <Navigator />
      
      {/* Render notification components conditionally */}
      {renderNotificationComponents()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default App;