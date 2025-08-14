import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { v4 as uuidv4 } from 'react-native-uuid';
import { ANALYTICS_CONFIG, ANALYTICS_EVENTS } from '../config/analytics';

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.userId = null;
    this.sessionId = null;
    this.consentGiven = false;
    this.eventQueue = [];
    this.batchTimer = null;
    this.deviceInfo = null;
  }

  // Initialize analytics service
  async initialize() {
    try {
      // Check for existing consent
      this.consentGiven = await this.getConsentStatus();
      
      if (!this.consentGiven) {
        console.log('Analytics: Waiting for user consent');
        return;
      }

      // Initialize Firebase Analytics
      if (ANALYTICS_CONFIG.FIREBASE.enabled) {
        await analytics().setAnalyticsCollectionEnabled(true);
        if (ANALYTICS_CONFIG.FIREBASE.debugMode) {
          await analytics().setAnalyticsCollectionEnabled(true);
        }
      }

      // Get or create user ID
      this.userId = await this.getOrCreateUserId();
      
      // Create session ID
      this.sessionId = this.generateSessionId();
      
      // Get device information
      this.deviceInfo = await this.getDeviceInfo();
      
      this.isInitialized = true;
      
      // Start batch processing
      this.startBatchProcessing();
      
      // Track app launch
      this.trackEvent(ANALYTICS_EVENTS.APP_LAUNCH, {
        user_id: this.userId,
        session_id: this.sessionId,
        device_info: this.deviceInfo,
      });
      
      console.log('Analytics: Initialized successfully');
    } catch (error) {
      console.error('Analytics: Initialization failed', error);
    }
  }

  // Get or create user ID
  async getOrCreateUserId() {
    try {
      let userId = await AsyncStorage.getItem('analytics_user_id');
      if (!userId) {
        userId = uuidv4();
        await AsyncStorage.setItem('analytics_user_id', userId);
      }
      return userId;
    } catch (error) {
      console.error('Analytics: Failed to get/create user ID', error);
      return uuidv4();
    }
  }

  // Generate session ID
  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get device information
  async getDeviceInfo() {
    try {
      return {
        brand: await DeviceInfo.getBrand(),
        model: await DeviceInfo.getModel(),
        systemVersion: await DeviceInfo.getSystemVersion(),
        appVersion: await DeviceInfo.getVersion(),
        buildNumber: await DeviceInfo.getBuildNumber(),
        deviceId: await DeviceInfo.getDeviceId(),
        isTablet: await DeviceInfo.isTablet(),
        carrier: await DeviceInfo.getCarrier(),
        timezone: await DeviceInfo.getTimezone(),
        locale: await DeviceInfo.getLocale(),
      };
    } catch (error) {
      console.error('Analytics: Failed to get device info', error);
      return {};
    }
  }

  // Set user consent
  async setConsent(consent) {
    try {
      this.consentGiven = consent;
      await AsyncStorage.setItem('analytics_consent', JSON.stringify(consent));
      
      if (consent) {
        await this.initialize();
        this.trackEvent(ANALYTICS_EVENTS.CONSENT_GIVEN);
      } else {
        this.trackEvent(ANALYTICS_EVENTS.CONSENT_REVOKED);
        await this.clearData();
      }
    } catch (error) {
      console.error('Analytics: Failed to set consent', error);
    }
  }

  // Get consent status
  async getConsentStatus() {
    try {
      const consent = await AsyncStorage.getItem('analytics_consent');
      return consent ? JSON.parse(consent) : false;
    } catch (error) {
      console.error('Analytics: Failed to get consent status', error);
      return false;
    }
  }

  // Track screen view
  async trackScreenView(screenName, screenClass = null) {
    if (!this.isInitialized || !this.consentGiven) return;

    try {
      // Firebase Analytics
      if (ANALYTICS_CONFIG.FIREBASE.enabled) {
        await analytics().logScreenView({
          screen_name: screenName,
          screen_class: screenClass || screenName,
        });
      }

      // Custom tracking
      this.trackEvent(ANALYTICS_EVENTS.SCREEN_VIEW, {
        screen_name: screenName,
        screen_class: screenClass || screenName,
        user_id: this.userId,
        session_id: this.sessionId,
      });
    } catch (error) {
      console.error('Analytics: Failed to track screen view', error);
    }
  }

  // Track custom event
  async trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized || !this.consentGiven) return;

    try {
      // Add common parameters
      const eventData = {
        ...parameters,
        timestamp: Date.now(),
        user_id: this.userId,
        session_id: this.sessionId,
        device_info: this.deviceInfo,
        app_version: this.deviceInfo?.appVersion,
        platform: this.deviceInfo?.systemVersion ? 'ios' : 'android',
      };

      // Firebase Analytics
      if (ANALYTICS_CONFIG.FIREBASE.enabled) {
        await analytics().logEvent(eventName, eventData);
      }

      // Queue for custom analytics
      this.queueEvent(eventName, eventData);
    } catch (error) {
      console.error('Analytics: Failed to track event', error);
    }
  }

  // Queue event for batch processing
  queueEvent(eventName, eventData) {
    this.eventQueue.push({
      event: eventName,
      data: eventData,
      timestamp: Date.now(),
    });

    // Flush if queue is full
    if (this.eventQueue.length >= ANALYTICS_CONFIG.CUSTOM.batchSize) {
      this.flushEvents();
    }
  }

  // Start batch processing
  startBatchProcessing() {
    this.batchTimer = setInterval(() => {
      this.flushEvents();
    }, ANALYTICS_CONFIG.CUSTOM.flushInterval);
  }

  // Flush events to custom endpoint
  async flushEvents() {
    if (this.eventQueue.length === 0) return;

    try {
      const events = [...this.eventQueue];
      this.eventQueue = [];

      // Send to custom analytics endpoint
      if (ANALYTICS_CONFIG.CUSTOM.enabled) {
        await this.sendToCustomEndpoint(events);
      }
    } catch (error) {
      console.error('Analytics: Failed to flush events', error);
      // Re-queue events on failure
      this.eventQueue.unshift(...this.eventQueue);
    }
  }

  // Send events to custom endpoint
  async sendToCustomEndpoint(events) {
    try {
      const response = await fetch(ANALYTICS_CONFIG.CUSTOM.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY || ''}`,
        },
        body: JSON.stringify({
          events,
          user_id: this.userId,
          session_id: this.sessionId,
          device_info: this.deviceInfo,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Analytics: Failed to send to custom endpoint', error);
      throw error;
    }
  }

  // Track user properties
  async setUserProperties(properties) {
    if (!this.isInitialized || !this.consentGiven) return;

    try {
      // Firebase Analytics
      if (ANALYTICS_CONFIG.FIREBASE.enabled) {
        await analytics().setUserProperties(properties);
      }

      // Store locally for custom analytics
      await AsyncStorage.setItem('analytics_user_properties', JSON.stringify(properties));
    } catch (error) {
      console.error('Analytics: Failed to set user properties', error);
    }
  }

  // Track monetization data
  async trackMonetizationData(data) {
    if (!this.isInitialized || !this.consentGiven) return;

    try {
      // Anonymize data if enabled
      const anonymizedData = ANALYTICS_CONFIG.MONETIZATION.anonymization.enabled
        ? this.anonymizeData(data)
        : data;

      this.trackEvent(ANALYTICS_EVENTS.DATA_COLLECTION, {
        data_type: 'monetization',
        data: anonymizedData,
        categories: ANALYTICS_CONFIG.MONETIZATION.dataCategories,
      });
    } catch (error) {
      console.error('Analytics: Failed to track monetization data', error);
    }
  }

  // Anonymize data
  anonymizeData(data) {
    const anonymized = { ...data };
    
    if (ANALYTICS_CONFIG.MONETIZATION.anonymization.hashUserIds) {
      // Hash user IDs
      if (anonymized.user_id) {
        anonymized.user_id = this.hashString(anonymized.user_id);
      }
    }
    
    if (ANALYTICS_CONFIG.MONETIZATION.anonymization.removePII) {
      // Remove PII
      delete anonymized.email;
      delete anonymized.phone;
      delete anonymized.name;
      delete anonymized.address;
    }
    
    return anonymized;
  }

  // Simple hash function
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  // Clear all analytics data
  async clearData() {
    try {
      await AsyncStorage.multiRemove([
        'analytics_user_id',
        'analytics_consent',
        'analytics_user_properties',
      ]);
      
      this.userId = null;
      this.sessionId = null;
      this.consentGiven = false;
      this.eventQueue = [];
      
      if (this.batchTimer) {
        clearInterval(this.batchTimer);
        this.batchTimer = null;
      }
      
      this.isInitialized = false;
    } catch (error) {
      console.error('Analytics: Failed to clear data', error);
    }
  }

  // Get analytics summary for monetization
  async getAnalyticsSummary() {
    try {
      const userProperties = await AsyncStorage.getItem('analytics_user_properties');
      const consent = await this.getConsentStatus();
      
      return {
        user_id: this.userId,
        session_id: this.sessionId,
        consent_given: consent,
        device_info: this.deviceInfo,
        user_properties: userProperties ? JSON.parse(userProperties) : {},
        queue_length: this.eventQueue.length,
        is_initialized: this.isInitialized,
      };
    } catch (error) {
      console.error('Analytics: Failed to get summary', error);
      return {};
    }
  }
}

// Export singleton instance
export default new AnalyticsService();
