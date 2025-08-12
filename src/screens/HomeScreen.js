import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>BoomerangConnect</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Connections</Text>
            <Text style={styles.cardText}>
              You have 5 new connection requests
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>New Connection</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Messages</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Statistics</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>127</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>23</Text>
                <Text style={styles.statLabel}>Messages</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1C1C1E',
  },
  cardText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 0.48,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default HomeScreen;
