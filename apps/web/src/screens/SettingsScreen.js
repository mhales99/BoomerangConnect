import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import AnalyticsService from '../services/AnalyticsService';
import ConsentManager from '../components/ConsentManager';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const SettingsScreen = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false);

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

  const handleConsentChange = (consent) => {
    setConsentGiven(consent);
    setShowConsentModal(false);
  };

  const handleAnalyticsDashboard = () => {
    if (consentGiven) {
      setShowAnalyticsDashboard(true);
    } else {
      Alert.alert(
        'Consent Required',
        'Please provide consent for data collection to access the analytics dashboard.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Manage Consent', onPress: () => setShowConsentModal(true) },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Edit Profile</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Privacy Settings</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch value={true} />
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Switch value={false} />
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Connection Requests</Text>
              <Switch value={true} />
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Messages</Text>
              <Switch value={true} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>About</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Help & Support</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Terms of Service</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data & Analytics</Text>
            <TouchableOpacity style={styles.settingItem} onPress={() => setShowConsentModal(true)}>
              <Text style={styles.settingLabel}>Data Collection Consent</Text>
              <View style={styles.consentStatus}>
                <Text style={[styles.consentIndicator, { color: consentGiven ? '#4CAF50' : '#F44336' }]}>
                  {consentGiven ? '✓' : '✗'}
                </Text>
                <Text style={styles.settingArrow}>›</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem} onPress={handleAnalyticsDashboard}>
              <Text style={styles.settingLabel}>Analytics Dashboard</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Export Data</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Clear Cache</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>

      {/* Consent Manager Modal */}
      <ConsentManager
        visible={showConsentModal}
        onConsentChange={handleConsentChange}
        onClose={() => setShowConsentModal(false)}
      />

      {/* Analytics Dashboard Modal */}
      {showAnalyticsDashboard && (
        <View style={styles.dashboardModal}>
          <View style={styles.dashboardHeader}>
            <Text style={styles.dashboardTitle}>Analytics Dashboard</Text>
            <TouchableOpacity onPress={() => setShowAnalyticsDashboard(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <AnalyticsDashboard />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1C1C1E',
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  settingArrow: {
    fontSize: 18,
    color: '#8E8E93',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  consentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consentIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  dashboardModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    padding: 5,
  },
});

export default SettingsScreen;
