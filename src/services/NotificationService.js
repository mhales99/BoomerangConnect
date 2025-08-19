import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseService from './FirebaseService';
import { ANALYTICS_EVENTS } from '../config/analytics';

const FCM_TOKEN_KEY = 'fcm_token';
const NOTIFICATION_PERMISSION_KEY = 'notification_permission_status';

class NotificationService {
  constructor() {
    this.initialized = false;
    this.token = null;
    this.permissionStatus = null;
    this.onNotificationOpenedApp = null;
    this.onNotificationReceived = null;
    this.onTokenRefresh = null;
  }

  /**
   * Initialize the notification service
   * @param {Object} options Configuration options
   * @param {Function} options.onNotificationOpenedApp Callback when app is opened from notification
   * @param {Function} options.onNotificationReceived Callback when notification is received
   * @param {Function} options.onTokenRefresh Callback when FCM token is refreshed
   */
  async initialize(options = {}) {
    if (this.initialized) return;

    try {
      // Set callbacks
      this.onNotificationOpenedApp = options.onNotificationOpenedApp;
      this.onNotificationReceived = options.onNotificationReceived;
      this.onTokenRefresh = options.onTokenRefresh;

      // Check if we have permission
      await this.checkPermission();

      // Initialize Firebase Messaging
      await this.initializeFirebaseMessaging();

      // Initialize Notifee
      await this.initializeNotifee();

      this.initialized = true;
      console.log('Notification service initialized');
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
    }
  }

  /**
   * Initialize Firebase Cloud Messaging
   */
  async initializeFirebaseMessaging() {
    // Get stored token
    this.token = await this.getStoredToken();

    // Register FCM token with backend if we have permission
    if (this.permissionStatus === RESULTS.GRANTED) {
      // Get a new token if we don't have one
      if (!this.token) {
        await this.getToken();
      }

      // Set up listeners
      this.setupMessagingListeners();
    }
  }

  /**
   * Initialize Notifee for local notifications
   */
  async initializeNotifee() {
    // Set up foreground service (Android only)
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
      });
    }

    // Set up notifee event listeners
    notifee.onForegroundEvent(this.handleNotifeeEvent);
    notifee.onBackgroundEvent(this.handleNotifeeEvent);
  }

  /**
   * Handle Notifee events
   */
  handleNotifeeEvent = async ({ type, detail }) => {
    switch (type) {
      case EventType.PRESS:
        // User pressed the notification
        if (this.onNotificationOpenedApp) {
          this.onNotificationOpenedApp(detail.notification);
        }
        break;
      case EventType.DELIVERED:
        // Notification delivered
        if (this.onNotificationReceived) {
          this.onNotificationReceived(detail.notification);
        }
        break;
    }
  };

  /**
   * Set up Firebase Cloud Messaging listeners
   */
  setupMessagingListeners() {
    // Handle background messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background:', remoteMessage);
      this.displayNotification(remoteMessage);
    });

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      console.log('Message received in the foreground:', remoteMessage);
      
      if (this.onNotificationReceived) {
        this.onNotificationReceived(remoteMessage);
      }
      
      // Display the notification
      this.displayNotification(remoteMessage);
    });

    // Handle notification opens
    const unsubscribeOpenedApp = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened app:', remoteMessage);
      
      if (this.onNotificationOpenedApp) {
        this.onNotificationOpenedApp(remoteMessage);
      }

      // Track notification open
      firebaseService.logEvent(ANALYTICS_EVENTS.NOTIFICATION_OPENED, {
        notification_id: remoteMessage.messageId,
        notification_title: remoteMessage.notification?.title,
      });
    });

    // Handle initial notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('App opened from quit state by notification:', remoteMessage);
          
          if (this.onNotificationOpenedApp) {
            this.onNotificationOpenedApp(remoteMessage);
          }

          // Track notification open from quit state
          firebaseService.logEvent(ANALYTICS_EVENTS.NOTIFICATION_OPENED, {
            notification_id: remoteMessage.messageId,
            notification_title: remoteMessage.notification?.title,
            app_state: 'quit',
          });
        }
      });

    // Handle token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (token) => {
      console.log('FCM Token refreshed:', token);
      this.token = token;
      await this.storeToken(token);
      
      if (this.onTokenRefresh) {
        this.onTokenRefresh(token);
      }
    });

    // Return unsubscribe functions
    return () => {
      unsubscribeForeground();
      unsubscribeOpenedApp();
      unsubscribeTokenRefresh();
    };
  }

  /**
   * Display a notification using Notifee
   * @param {Object} remoteMessage FCM remote message
   */
  async displayNotification(remoteMessage) {
    try {
      // Extract notification data
      const { notification, data } = remoteMessage;
      
      if (!notification) return;
      
      const { title, body } = notification;
      
      // Create notification
      await notifee.displayNotification({
        title,
        body,
        data,
        android: {
          channelId: 'default',
          smallIcon: 'ic_notification', // Make sure this icon exists in your Android project
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
        },
        ios: {
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
        },
      });
      
      // Track notification received
      firebaseService.logEvent(ANALYTICS_EVENTS.NOTIFICATION_RECEIVED, {
        notification_id: remoteMessage.messageId,
        notification_title: title,
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }

  /**
   * Check notification permission status
   */
  async checkPermission() {
    try {
      // Get stored permission status
      const storedStatus = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY);
      
      if (storedStatus) {
        this.permissionStatus = storedStatus;
      } else {
        // Check current permission status
        if (Platform.OS === 'ios') {
          this.permissionStatus = await check(PERMISSIONS.IOS.NOTIFICATIONS);
        } else {
          this.permissionStatus = await messaging().hasPermission() ? RESULTS.GRANTED : RESULTS.DENIED;
        }
        
        // Store permission status
        await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, this.permissionStatus);
      }
      
      return this.permissionStatus;
    } catch (error) {
      console.error('Error checking notification permission:', error);
      return RESULTS.UNAVAILABLE;
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermission() {
    try {
      let status;
      
      if (Platform.OS === 'ios') {
        status = await request(PERMISSIONS.IOS.NOTIFICATIONS);
      } else {
        const authStatus = await messaging().requestPermission();
        status = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
                authStatus === messaging.AuthorizationStatus.PROVISIONAL
                ? RESULTS.GRANTED 
                : RESULTS.DENIED;
      }
      
      // Store permission status
      this.permissionStatus = status;
      await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, status);
      
      // If permission granted, get token
      if (status === RESULTS.GRANTED) {
        await this.getToken();
      }
      
      return status;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return RESULTS.UNAVAILABLE;
    }
  }

  /**
   * Get FCM token
   */
  async getToken() {
    try {
      // Get token from Firebase
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      
      // Store token
      this.token = token;
      await this.storeToken(token);
      
      // Notify token refresh callback
      if (this.onTokenRefresh) {
        this.onTokenRefresh(token);
      }
      
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Store FCM token in AsyncStorage
   */
  async storeToken(token) {
    try {
      await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing FCM token:', error);
    }
  }

  /**
   * Get stored FCM token from AsyncStorage
   */
  async getStoredToken() {
    try {
      return await AsyncStorage.getItem(FCM_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting stored FCM token:', error);
      return null;
    }
  }

  /**
   * Send local notification
   * @param {Object} options Notification options
   * @param {string} options.title Notification title
   * @param {string} options.body Notification body
   * @param {Object} options.data Additional data to include
   */
  async sendLocalNotification({ title, body, data = {} }) {
    try {
      await notifee.displayNotification({
        title,
        body,
        data,
        android: {
          channelId: 'default',
          smallIcon: 'ic_notification',
          pressAction: {
            id: 'default',
          },
        },
      });
      
      return true;
    } catch (error) {
      console.error('Error sending local notification:', error);
      return false;
    }
  }

  /**
   * Subscribe to a topic
   * @param {string} topic Topic to subscribe to
   */
  async subscribeToTopic(topic) {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
      return true;
    } catch (error) {
      console.error(`Error subscribing to topic ${topic}:`, error);
      return false;
    }
  }

  /**
   * Unsubscribe from a topic
   * @param {string} topic Topic to unsubscribe from
   */
  async unsubscribeFromTopic(topic) {
    try {
      await messaging().unsubscribeFromTopic(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
      return true;
    } catch (error) {
      console.error(`Error unsubscribing from topic ${topic}:`, error);
      return false;
    }
  }

  /**
   * Get current notification settings
   */
  async getNotificationSettings() {
    try {
      const authStatus = await messaging().hasPermission();
      
      return {
        authorizationStatus: authStatus,
        alert: authStatus === messaging.AuthorizationStatus.AUTHORIZED,
        badge: authStatus === messaging.AuthorizationStatus.AUTHORIZED,
        sound: authStatus === messaging.AuthorizationStatus.AUTHORIZED,
        provisional: authStatus === messaging.AuthorizationStatus.PROVISIONAL,
      };
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return null;
    }
  }
}

// Export singleton instance
const notificationService = new NotificationService();
export default notificationService;
