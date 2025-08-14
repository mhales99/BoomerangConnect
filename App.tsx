/**
 * BoomerangConnect App
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import notificationService from './src/services/NotificationService';
import firebaseService from './src/services/FirebaseService';
import NotificationBanner from './src/components/NotificationBanner';
import NotificationPermission from './src/components/NotificationPermission';

function App(): React.JSX.Element {
  const [notification, setNotification] = useState(null);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  useEffect(() => {
    // Initialize Firebase
    firebaseService.initialize();

    // Initialize notifications
    initializeNotifications();

    // Check if we should show permission prompt
    checkNotificationPermission();
  }, []);

  const initializeNotifications = async () => {
    await notificationService.initialize({
      onNotificationReceived: handleNotificationReceived,
      onNotificationOpenedApp: handleNotificationOpened,
      onTokenRefresh: handleTokenRefresh,
    });
  };

  const checkNotificationPermission = async () => {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Main App Navigator */}
      <AppNavigator />
      
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