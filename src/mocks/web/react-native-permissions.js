/**
 * Web mock for react-native-permissions
 */

// Permission result constants
export const RESULTS = {
  UNAVAILABLE: 'unavailable',
  DENIED: 'denied',
  GRANTED: 'granted',
  BLOCKED: 'blocked',
  LIMITED: 'limited',
};

// Permission types
export const PERMISSIONS = {
  IOS: {
    NOTIFICATIONS: 'ios.permission.NOTIFICATIONS',
    CAMERA: 'ios.permission.CAMERA',
    PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
    MICROPHONE: 'ios.permission.MICROPHONE',
    CONTACTS: 'ios.permission.CONTACTS',
    CALENDAR: 'ios.permission.CALENDAR',
    REMINDERS: 'ios.permission.REMINDERS',
    SPEECH_RECOGNITION: 'ios.permission.SPEECH_RECOGNITION',
    LOCATION_ALWAYS: 'ios.permission.LOCATION_ALWAYS',
    LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    MEDIA_LIBRARY: 'ios.permission.MEDIA_LIBRARY',
    MOTION: 'ios.permission.MOTION',
    FACE_ID: 'ios.permission.FACE_ID',
    BLUETOOTH: 'ios.permission.BLUETOOTH',
    APP_TRACKING_TRANSPARENCY: 'ios.permission.APP_TRACKING_TRANSPARENCY',
  },
  ANDROID: {
    ACCEPT_HANDOVER: 'android.permission.ACCEPT_HANDOVER',
    ACCESS_BACKGROUND_LOCATION: 'android.permission.ACCESS_BACKGROUND_LOCATION',
    ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
    ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    ACTIVITY_RECOGNITION: 'android.permission.ACTIVITY_RECOGNITION',
    ADD_VOICEMAIL: 'android.permission.ADD_VOICEMAIL',
    ANSWER_PHONE_CALLS: 'android.permission.ANSWER_PHONE_CALLS',
    BLUETOOTH_ADVERTISE: 'android.permission.BLUETOOTH_ADVERTISE',
    BLUETOOTH_CONNECT: 'android.permission.BLUETOOTH_CONNECT',
    BLUETOOTH_SCAN: 'android.permission.BLUETOOTH_SCAN',
    BODY_SENSORS: 'android.permission.BODY_SENSORS',
    CALL_PHONE: 'android.permission.CALL_PHONE',
    CAMERA: 'android.permission.CAMERA',
    GET_ACCOUNTS: 'android.permission.GET_ACCOUNTS',
    PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS',
    READ_CALENDAR: 'android.permission.READ_CALENDAR',
    READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
    READ_CONTACTS: 'android.permission.READ_CONTACTS',
    READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
    READ_PHONE_NUMBERS: 'android.permission.READ_PHONE_NUMBERS',
    READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE',
    READ_SMS: 'android.permission.READ_SMS',
    RECEIVE_MMS: 'android.permission.RECEIVE_MMS',
    RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
    RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH',
    RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    SEND_SMS: 'android.permission.SEND_SMS',
    USE_SIP: 'android.permission.USE_SIP',
    WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR',
    WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG',
    WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
    WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
  },
};

// Mock check function
export const check = async (permission) => {
  console.log(`[Web Mock] Checking permission: ${permission}`);
  return RESULTS.UNAVAILABLE;
};

// Mock request function
export const request = async (permission) => {
  console.log(`[Web Mock] Requesting permission: ${permission}`);
  return RESULTS.UNAVAILABLE;
};

// Mock checkMultiple function
export const checkMultiple = async (permissions) => {
  console.log(`[Web Mock] Checking multiple permissions`);
  const result = {};
  permissions.forEach(permission => {
    result[permission] = RESULTS.UNAVAILABLE;
  });
  return result;
};

// Mock requestMultiple function
export const requestMultiple = async (permissions) => {
  console.log(`[Web Mock] Requesting multiple permissions`);
  const result = {};
  permissions.forEach(permission => {
    result[permission] = RESULTS.UNAVAILABLE;
  });
  return result;
};

// Mock checkNotifications function
export const checkNotifications = async () => {
  console.log(`[Web Mock] Checking notifications permission`);
  return {
    status: RESULTS.UNAVAILABLE,
    settings: {},
  };
};

// Mock requestNotifications function
export const requestNotifications = async (options) => {
  console.log(`[Web Mock] Requesting notifications permission`);
  return {
    status: RESULTS.UNAVAILABLE,
    settings: {},
  };
};

// Default export
export default {
  RESULTS,
  PERMISSIONS,
  check,
  request,
  checkMultiple,
  requestMultiple,
  checkNotifications,
  requestNotifications,
};
