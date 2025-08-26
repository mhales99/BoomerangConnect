import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { TrustPointScore, ReferralLoops, FrequentProviders } from '../components';
import { colors, typography, spacing, borderRadius } from '../theme';

const HomeScreen = ({ navigation }) => {
  // Handle navigation to different screens
  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };
  
  const handleNavigateToReferrals = () => {
    // Navigate to referrals screen when implemented
    console.log('Navigate to referrals');
  };
  
  const handleNavigateToProvider = (provider) => {
    // Navigate to provider details when implemented
    console.log('Navigate to provider', provider);
  };
  
  const handleSeeAllProviders = () => {
    // Navigate to all providers screen when implemented
    console.log('Navigate to all providers');
  };
  
  const handleSeeAllReferrals = () => {
    // Navigate to all referrals screen when implemented
    console.log('Navigate to all referrals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.username}>Michael</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={handleNavigateToProfile}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trust Point Score */}
        <TrustPointScore 
          score={750} 
          tier="Gold" 
          onPress={handleNavigateToProfile} 
        />
        
        {/* Frequent Providers */}
        <FrequentProviders 
          onProviderPress={handleNavigateToProvider}
          onSeeAll={handleSeeAllProviders}
        />
        
        {/* Referral Loops */}
        <ReferralLoops 
          onLoopPress={handleNavigateToReferrals}
          onSeeAll={handleSeeAllReferrals}
        />
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.iconText}>📋</Text>
              </View>
              <Text style={styles.quickActionText}>New Referral</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.iconText}>🔍</Text>
              </View>
              <Text style={styles.quickActionText}>Find Provider</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.iconText}>📊</Text>
              </View>
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.iconText}>💬</Text>
              </View>
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Activity */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIconContainer}>
                <Text style={styles.activityIcon}>🔄</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>New connection request</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.activityDescription}>
              Dr. Sarah Johnson sent you a connection request
            </Text>
            <View style={styles.activityActions}>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIconContainer}>
                <Text style={styles.activityIcon}>📝</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Referral completed</Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
            </View>
            <Text style={styles.activityDescription}>
              Patient referral to Dr. Michael Chen was completed
            </Text>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  greeting: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  username: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  profileButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  quickActionsContainer: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '22%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    ...styles.shadows.sm,
  },
  iconText: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: typography.fontSize.xs,
    color: colors.text,
    textAlign: 'center',
  },
  recentActivityContainer: {
    paddingHorizontal: spacing.md,
  },
  activityCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...styles.shadows.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
  },
  activityDescription: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  activityActions: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  acceptButtonText: {
    color: colors.textInverse,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  declineButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  declineButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  },
});

export default HomeScreen;