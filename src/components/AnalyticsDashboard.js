import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import AnalyticsService from '../services/AnalyticsService';
import DataMonetizationService from '../services/DataMonetizationService';

const AnalyticsDashboard = () => {
  const [analyticsSummary, setAnalyticsSummary] = useState(null);
  const [monetizationSummary, setMonetizationSummary] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analytics, monetization, consent] = await Promise.all([
        AnalyticsService.getAnalyticsSummary(),
        DataMonetizationService.getMonetizationSummary(),
        AnalyticsService.getConsentStatus(),
      ]);
      
      setAnalyticsSummary(analytics);
      setMonetizationSummary(monetization);
      setConsentGiven(consent);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleExportData = async () => {
    try {
      const exportData = await DataMonetizationService.exportMonetizationData();
      if (exportData) {
        Alert.alert(
          'Data Exported',
          'Monetization data has been prepared for export. Contact support for data access.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export data. Please try again.');
    }
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all monetization data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            DataMonetizationService.resetMonetizationData();
            loadData();
          },
        },
      ]
    );
  };

  if (!consentGiven) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          Analytics dashboard is only available when data collection consent is given.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <Text style={styles.subtitle}>Data Monetization Overview</Text>
      </View>

      {/* Revenue Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Summary</Text>
        <View style={styles.revenueCard}>
          <Text style={styles.revenueAmount}>
            ${monetizationSummary?.totalRevenue || 0}
          </Text>
          <Text style={styles.revenueLabel}>Total Revenue Generated</Text>
        </View>
      </View>

      {/* Revenue Streams */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Streams</Text>
        {monetizationSummary?.revenueStreams && (
          <View style={styles.revenueStreams}>
            {Object.entries(monetizationSummary.revenueStreams).map(([stream, value]) => (
              <View key={stream} style={styles.revenueStream}>
                <Text style={styles.streamName}>
                  {stream.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Text>
                <Text style={styles.streamValue}>${Math.round(value * 100) / 100}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Analytics Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analytics Summary</Text>
        {analyticsSummary && (
          <View style={styles.analyticsCard}>
            <View style={styles.analyticsRow}>
              <Text style={styles.analyticsLabel}>User ID:</Text>
              <Text style={styles.analyticsValue}>
                {analyticsSummary.user_id ? `${analyticsSummary.user_id.substring(0, 8)}...` : 'N/A'}
              </Text>
            </View>
            <View style={styles.analyticsRow}>
              <Text style={styles.analyticsLabel}>Session ID:</Text>
              <Text style={styles.analyticsValue}>
                {analyticsSummary.session_id ? `${analyticsSummary.session_id.substring(0, 8)}...` : 'N/A'}
              </Text>
            </View>
            <View style={styles.analyticsRow}>
              <Text style={styles.analyticsLabel}>Queue Length:</Text>
              <Text style={styles.analyticsValue}>{analyticsSummary.queue_length || 0}</Text>
            </View>
            <View style={styles.analyticsRow}>
              <Text style={styles.analyticsLabel}>Initialized:</Text>
              <Text style={styles.analyticsValue}>
                {analyticsSummary.is_initialized ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Device Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Device Information</Text>
        {analyticsSummary?.device_info && (
          <View style={styles.deviceCard}>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceLabel}>Device:</Text>
              <Text style={styles.deviceValue}>
                {analyticsSummary.device_info.brand} {analyticsSummary.device_info.model}
              </Text>
            </View>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceLabel}>OS Version:</Text>
              <Text style={styles.deviceValue}>{analyticsSummary.device_info.systemVersion}</Text>
            </View>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceLabel}>App Version:</Text>
              <Text style={styles.deviceValue}>{analyticsSummary.device_info.appVersion}</Text>
            </View>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceLabel}>Timezone:</Text>
              <Text style={styles.deviceValue}>{analyticsSummary.device_info.timezone}</Text>
            </View>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceLabel}>Locale:</Text>
              <Text style={styles.deviceValue}>{analyticsSummary.device_info.locale}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Data Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Collection Categories</Text>
        {monetizationSummary?.dataCategories && (
          <View style={styles.categoriesCard}>
            {Object.entries(monetizationSummary.dataCategories).map(([category, enabled]) => (
              <View key={category} style={styles.categoryRow}>
                <Text style={styles.categoryName}>
                  {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Text>
                <View style={[styles.statusIndicator, { backgroundColor: enabled ? '#4CAF50' : '#F44336' }]} />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        {monetizationSummary?.privacy && (
          <View style={styles.privacyCard}>
            <View style={styles.privacyRow}>
              <Text style={styles.privacyLabel}>GDPR Compliant:</Text>
              <Text style={styles.privacyValue}>
                {monetizationSummary.privacy.gdprCompliant ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.privacyRow}>
              <Text style={styles.privacyLabel}>CCPA Compliant:</Text>
              <Text style={styles.privacyValue}>
                {monetizationSummary.privacy.ccpaCompliant ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.privacyRow}>
              <Text style={styles.privacyLabel}>Data Retention:</Text>
              <Text style={styles.privacyValue}>
                {monetizationSummary.privacy.dataRetentionDays} days
              </Text>
            </View>
            <View style={styles.privacyRow}>
              <Text style={styles.privacyLabel}>Consent Required:</Text>
              <Text style={styles.privacyValue}>
                {monetizationSummary.privacy.requireConsent ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
          <Text style={styles.actionButtonText}>Export Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.resetButton]} onPress={handleResetData}>
          <Text style={[styles.actionButtonText, styles.resetButtonText]}>Reset Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  revenueCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  revenueLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  revenueStreams: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueStream: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  streamName: {
    fontSize: 16,
    color: '#333',
  },
  streamValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  analyticsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#666',
  },
  analyticsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  deviceLabel: {
    fontSize: 14,
    color: '#666',
  },
  deviceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  privacyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  privacyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  privacyLabel: {
    fontSize: 14,
    color: '#666',
  },
  privacyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  resetButtonText: {
    color: '#fff',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
});

export default AnalyticsDashboard;
