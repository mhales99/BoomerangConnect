import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import AnalyticsService from '../services/AnalyticsService';

const ConsentManager = ({ visible, onConsentChange, onClose }) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConsentStatus();
  }, []);

  const loadConsentStatus = async () => {
    try {
      const status = await AnalyticsService.getConsentStatus();
      setConsentGiven(status);
    } catch (error) {
      console.error('Failed to load consent status:', error);
    }
  };

  const handleConsentChange = async (consent) => {
    setLoading(true);
    try {
      await AnalyticsService.setConsent(consent);
      setConsentGiven(consent);
      onConsentChange?.(consent);
      
      Alert.alert(
        'Consent Updated',
        consent 
          ? 'Thank you! We can now provide you with personalized features and improve our service.'
          : 'Your data collection has been disabled. Some features may be limited.',
        [{ text: 'OK', onPress: onClose }]
      );
    } catch (error) {
      console.error('Failed to update consent:', error);
      Alert.alert('Error', 'Failed to update consent settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDataRequest = () => {
    Alert.alert(
      'Data Request',
      'You can request a copy of your data or delete your data by contacting us at privacy@boomerangconnect.com',
      [{ text: 'OK' }]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Privacy & Data Collection</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Data Collection & Monetization</Text>
          
          <Text style={styles.description}>
            BoomerangConnect collects data to provide you with better services and to help us improve our platform. 
            This data may also be used for monetization purposes to keep our service free.
          </Text>

          <Text style={styles.sectionTitle}>What We Collect</Text>
          <View style={styles.dataList}>
            <Text style={styles.dataItem}>• User behavior and engagement patterns</Text>
            <Text style={styles.dataItem}>• Device information and app usage</Text>
            <Text style={styles.dataItem}>• Feature usage and preferences</Text>
            <Text style={styles.dataItem}>• Performance and error data</Text>
            <Text style={styles.dataItem}>• Demographic information (with consent)</Text>
          </View>

          <Text style={styles.sectionTitle}>How We Use Your Data</Text>
          <View style={styles.dataList}>
            <Text style={styles.dataItem}>• Improve app performance and user experience</Text>
            <Text style={styles.dataItem}>• Provide personalized features and recommendations</Text>
            <Text style={styles.dataItem}>• Analyze usage patterns for business insights</Text>
            <Text style={styles.dataItem}>• Generate revenue through data monetization</Text>
            <Text style={styles.dataItem}>• Ensure app security and prevent fraud</Text>
          </View>

          <Text style={styles.sectionTitle}>Data Protection</Text>
          <Text style={styles.description}>
            We take your privacy seriously. All data is anonymized and encrypted. 
            We never sell personal information and only share aggregated, anonymous data with partners.
          </Text>

          <Text style={styles.sectionTitle}>Your Rights</Text>
          <View style={styles.dataList}>
            <Text style={styles.dataItem}>• Right to consent or withdraw consent</Text>
            <Text style={styles.dataItem}>• Right to access your data</Text>
            <Text style={styles.dataItem}>• Right to delete your data</Text>
            <Text style={styles.dataItem}>• Right to data portability</Text>
            <Text style={styles.dataItem}>• Right to lodge a complaint</Text>
          </View>

          <TouchableOpacity onPress={handleDataRequest} style={styles.linkButton}>
            <Text style={styles.linkText}>Request Data Access or Deletion</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={() => handleConsentChange(false)}
            disabled={loading}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleConsentChange(true)}
            disabled={loading}
          >
            <Text style={styles.acceptButtonText}>
              {loading ? 'Updating...' : 'Accept'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  dataList: {
    marginBottom: 15,
  },
  dataItem: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 5,
  },
  linkButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  acceptButton: {
    backgroundColor: '#007AFF',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ConsentManager;
