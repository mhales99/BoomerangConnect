import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

const SettingsScreen = () => {
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
            <Text style={styles.sectionTitle}>Data</Text>
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
});

export default SettingsScreen;
