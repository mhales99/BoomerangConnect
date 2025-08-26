import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

/**
 * A fallback component that displays when certain mobile-specific features
 * are not available on web.
 */
const WebFallback = ({ feature, children }) => {
  // If not on web or children are provided, render children
  if (Platform.OS !== 'web' || !feature) {
    return children || null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {feature} functionality is not available on web.
      </Text>
      <Text style={styles.subText}>
        Please use the mobile app for the full experience.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default WebFallback;




