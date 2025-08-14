import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { RESULTS } from 'react-native-permissions';
import notificationService from '../services/NotificationService';
import firebaseService from '../services/FirebaseService';
import { ANALYTICS_EVENTS } from '../config/analytics';

const NotificationPermission = ({ onPermissionChange }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const status = await notificationService.checkPermission();
    setPermissionStatus(status);
    
    if (onPermissionChange) {
      onPermissionChange(status === RESULTS.GRANTED);
    }
  };

  const requestPermission = async () => {
    setLoading(true);
    
    try {
      // Track permission request
      firebaseService.logEvent(ANALYTICS_EVENTS.NOTIFICATION_PERMISSION_REQUESTED);
      
      const status = await notificationService.requestPermission();
      setPermissionStatus(status);
      
      // Track permission change
      firebaseService.logEvent(ANALYTICS_EVENTS.NOTIFICATION_PERMISSION_CHANGED, {
        status,
      });
      
      if (onPermissionChange) {
        onPermissionChange(status === RESULTS.GRANTED);
      }
      
      if (status === RESULTS.GRANTED) {
        Alert.alert(
          'Notifications Enabled',
          'You will now receive important updates and messages.',
          [{ text: 'OK' }]
        );
      } else if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
        showPermissionDeniedAlert();
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    } finally {
      setLoading(false);
    }
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      'Notifications Disabled',
      'To receive important updates, please enable notifications in your device settings.',
      [
        { text: 'Not Now', style: 'cancel' },
        { 
          text: 'Open Settings', 
          onPress: () => {
            // Open app settings
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          }
        },
      ]
    );
  };

  if (permissionStatus === RESULTS.GRANTED) {
    return null; // Don't show anything if permission is already granted
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Stay Updated</Text>
        <Text style={styles.description}>
          Enable notifications to receive important updates, connection requests, and messages.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.laterButton}
            onPress={() => {
              if (onPermissionChange) {
                onPermissionChange(false);
              }
            }}
            disabled={loading}
          >
            <Text style={styles.laterButtonText}>Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.enableButton}
            onPress={requestPermission}
            disabled={loading}
          >
            <Text style={styles.enableButtonText}>
              {loading ? 'Enabling...' : 'Enable Notifications'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  laterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  laterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  enableButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  enableButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NotificationPermission;
