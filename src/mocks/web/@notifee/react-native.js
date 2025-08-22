/**
 * Web mock for @notifee/react-native
 */

// Event types
export const EventType = {
  UNKNOWN: 0,
  DISMISSED: 1,
  PRESS: 2,
  ACTION_PRESS: 3,
  DELIVERED: 4,
  TRIGGER_NOTIFICATION_CREATED: 5,
  FOREGROUND_SERVICE_TASK_TIMEOUT: 6,
};

// Android importance
export const AndroidImportance = {
  DEFAULT: 3,
  MIN: 1,
  LOW: 2,
  HIGH: 4,
  MAX: 5,
};

// Android visibility
export const AndroidVisibility = {
  PRIVATE: 0,
  PUBLIC: 1,
  SECRET: -1,
};

// Android priority
export const AndroidPriority = {
  MIN: -2,
  LOW: -1,
  DEFAULT: 0,
  HIGH: 1,
  MAX: 2,
};

// Android grouping types
export const AndroidGroupAlertBehavior = {
  ALL: 0,
  SUMMARY: 1,
  CHILDREN: 2,
};

// iOS authorization status
export const IOSAuthorizationStatus = {
  NOT_DETERMINED: 0,
  DENIED: 1,
  AUTHORIZED: 2,
  PROVISIONAL: 3,
  EPHEMERAL: 4,
};

// iOS foreground presentation options
export const IOSForegroundPresentationOptions = {
  BADGE: 4,
  SOUND: 2,
  LIST: 1,
  BANNER: 8,
};

// Mock functions
const displayNotification = async (notification) => {
  console.log('[Web Mock] Display notification:', notification);
  return 'mock-notification-id';
};

const createChannel = async (channel) => {
  console.log('[Web Mock] Create channel:', channel);
  return channel.id;
};

const getChannels = async () => {
  console.log('[Web Mock] Get channels');
  return [];
};

const deleteChannel = async (channelId) => {
  console.log('[Web Mock] Delete channel:', channelId);
  return true;
};

const onForegroundEvent = (callback) => {
  console.log('[Web Mock] Set foreground event handler');
  return () => {}; // Return unsubscribe function
};

const onBackgroundEvent = async (callback) => {
  console.log('[Web Mock] Set background event handler');
  // No need to return anything for background handler
};

const getInitialNotification = async () => {
  console.log('[Web Mock] Get initial notification');
  return null;
};

const cancelAllNotifications = async () => {
  console.log('[Web Mock] Cancel all notifications');
  return;
};

const cancelNotification = async (notificationId) => {
  console.log('[Web Mock] Cancel notification:', notificationId);
  return;
};

const createTriggerNotification = async (notification, trigger) => {
  console.log('[Web Mock] Create trigger notification:', notification, trigger);
  return 'mock-trigger-notification-id';
};

const getTriggerNotifications = async () => {
  console.log('[Web Mock] Get trigger notifications');
  return [];
};

const cancelTriggerNotification = async (notificationId) => {
  console.log('[Web Mock] Cancel trigger notification:', notificationId);
  return;
};

const cancelTriggerNotifications = async () => {
  console.log('[Web Mock] Cancel all trigger notifications');
  return;
};

const getDisplayedNotifications = async () => {
  console.log('[Web Mock] Get displayed notifications');
  return [];
};

// Default export
export default {
  // Constants
  EventType,
  AndroidImportance,
  AndroidVisibility,
  AndroidPriority,
  AndroidGroupAlertBehavior,
  IOSAuthorizationStatus,
  IOSForegroundPresentationOptions,
  
  // Functions
  displayNotification,
  createChannel,
  getChannels,
  deleteChannel,
  onForegroundEvent,
  onBackgroundEvent,
  getInitialNotification,
  cancelAllNotifications,
  cancelNotification,
  createTriggerNotification,
  getTriggerNotifications,
  cancelTriggerNotification,
  cancelTriggerNotifications,
  getDisplayedNotifications,
};




