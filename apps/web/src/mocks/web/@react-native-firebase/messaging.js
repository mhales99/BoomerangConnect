/**
 * Web mock for @react-native-firebase/messaging
 */

// Mock authorization status
const AuthorizationStatus = {
  NOT_DETERMINED: -1,
  DENIED: 0,
  AUTHORIZED: 1,
  PROVISIONAL: 2,
};

// Create mock messaging instance
const messagingMock = () => {
  return {
    // Permission methods
    hasPermission: async () => {
      console.log('[Web Mock] Checking messaging permission');
      return false;
    },
    requestPermission: async () => {
      console.log('[Web Mock] Requesting messaging permission');
      return AuthorizationStatus.NOT_DETERMINED;
    },
    
    // Token methods
    getToken: async () => {
      console.log('[Web Mock] Getting FCM token');
      return 'web-mock-fcm-token';
    },
    deleteToken: async () => {
      console.log('[Web Mock] Deleting FCM token');
      return true;
    },
    
    // Notification handlers
    onMessage: (callback) => {
      console.log('[Web Mock] Setting onMessage handler');
      return () => {}; // Return unsubscribe function
    },
    onNotificationOpenedApp: (callback) => {
      console.log('[Web Mock] Setting onNotificationOpenedApp handler');
      return () => {}; // Return unsubscribe function
    },
    getInitialNotification: async () => {
      console.log('[Web Mock] Getting initial notification');
      return null;
    },
    onTokenRefresh: (callback) => {
      console.log('[Web Mock] Setting onTokenRefresh handler');
      return () => {}; // Return unsubscribe function
    },
    
    // Background handler
    setBackgroundMessageHandler: (handler) => {
      console.log('[Web Mock] Setting background message handler');
    },
    
    // Topic methods
    subscribeToTopic: async (topic) => {
      console.log(`[Web Mock] Subscribing to topic: ${topic}`);
      return true;
    },
    unsubscribeFromTopic: async (topic) => {
      console.log(`[Web Mock] Unsubscribing from topic: ${topic}`);
      return true;
    },
    
    // Settings
    setAutoInitEnabled: async (enabled) => {
      console.log(`[Web Mock] Setting auto init: ${enabled}`);
      return true;
    },
    
    // Constants
    AuthorizationStatus,
  };
};

// Add static properties
messagingMock.AuthorizationStatus = AuthorizationStatus;

// Export mock
export default messagingMock;




