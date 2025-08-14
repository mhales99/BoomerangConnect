// Analytics Configuration for BoomerangConnect
// This configuration enables data monetization while maintaining privacy compliance

export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Configuration
  GA4: {
    measurementId: process.env.GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: true,
    debugMode: __DEV__,
  },
  
  // Firebase Analytics Configuration
  FIREBASE: {
    enabled: true,
    debugMode: __DEV__,
  },
  
  // Custom Analytics Configuration
  CUSTOM: {
    enabled: true,
    endpoint: process.env.ANALYTICS_ENDPOINT || 'https://api.boomerangconnect.com/analytics',
    batchSize: 10,
    flushInterval: 30000, // 30 seconds
  },
  
  // Data Monetization Configuration
  MONETIZATION: {
    enabled: true,
    // Data categories for monetization
    dataCategories: {
      userBehavior: true,
      demographics: true,
      preferences: true,
      engagement: true,
      performance: true,
      location: false, // Disabled for privacy
    },
    // Anonymization settings
    anonymization: {
      enabled: true,
      hashUserIds: true,
      removePII: true,
    },
  },
  
  // Privacy Configuration
  PRIVACY: {
    gdprCompliant: true,
    ccpaCompliant: true,
    dataRetentionDays: 365,
    allowDataSharing: true,
    requireConsent: true,
  },
  
  // Event Tracking Configuration
  EVENTS: {
    // User engagement events
    userEngagement: {
      sessionStart: true,
      sessionEnd: true,
      screenView: true,
      buttonClick: true,
      featureUsage: true,
    },
    // Business events
    business: {
      userRegistration: true,
      userLogin: true,
      userLogout: true,
      profileUpdate: true,
      connectionMade: true,
      messageSent: true,
    },
    // Performance events
    performance: {
      appLaunch: true,
      screenLoad: true,
      apiCall: true,
      error: true,
    },
  },
};

// Event definitions for consistent tracking
export const ANALYTICS_EVENTS = {
  // User Engagement Events
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  SCREEN_VIEW: 'screen_view',
  BUTTON_CLICK: 'button_click',
  FEATURE_USAGE: 'feature_usage',
  
  // Business Events
  USER_REGISTRATION: 'user_registration',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  PROFILE_UPDATE: 'profile_update',
  CONNECTION_MADE: 'connection_made',
  MESSAGE_SENT: 'message_sent',
  
  // Performance Events
  APP_LAUNCH: 'app_launch',
  SCREEN_LOAD: 'screen_load',
  API_CALL: 'api_call',
  ERROR: 'error',
  
  // Monetization Events
  DATA_COLLECTION: 'data_collection',
  CONSENT_GIVEN: 'consent_given',
  CONSENT_REVOKED: 'consent_revoked',
};

// Screen names for consistent tracking
export const SCREEN_NAMES = {
  HOME: 'home_screen',
  PROFILE: 'profile_screen',
  CONNECT: 'connect_screen',
  SETTINGS: 'settings_screen',
  LOGIN: 'login_screen',
  REGISTER: 'register_screen',
};

// Custom dimensions for monetization
export const CUSTOM_DIMENSIONS = {
  USER_SEGMENT: 'user_segment',
  FEATURE_USAGE: 'feature_usage',
  ENGAGEMENT_LEVEL: 'engagement_level',
  DEVICE_TYPE: 'device_type',
  APP_VERSION: 'app_version',
  USER_LIFECYCLE: 'user_lifecycle',
};
