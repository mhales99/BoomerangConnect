import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Simple web-only version of the app for testing web deployment
 */
const WebApp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>BoomerangConnect</Text>
        <Text style={styles.subtitle}>Web Version</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.description}>
          This is the web version of BoomerangConnect. For the full experience, 
          please download the mobile app from the App Store or Google Play Store.
        </Text>
        
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>Available Features:</Text>
          <View style={styles.feature}>
            <Text style={styles.featureText}>• View your profile</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>• Browse connections</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>• Update settings</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Some features are only available in the mobile app.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureContainer: {
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#495057',
    marginLeft: 8,
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default WebApp;




