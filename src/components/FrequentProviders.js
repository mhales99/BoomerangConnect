import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const ProviderItem = ({ name, specialty, rating, imageUrl, isVerified, onPress }) => {
  // Default image if none provided
  const defaultImage = 'https://via.placeholder.com/60';
  
  return (
    <TouchableOpacity style={styles.providerItem} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl || defaultImage }} 
          style={styles.providerImage} 
          resizeMode="cover"
        />
        {isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.providerName} numberOfLines={1}>{name}</Text>
      <Text style={styles.providerSpecialty} numberOfLines={1}>{specialty}</Text>
      
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.ratingStars}>{'★'.repeat(Math.floor(rating))}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FrequentProviders = ({ providers = [], onSeeAll, onProviderPress }) => {
  if (!providers || providers.length === 0) {
    providers = [
      { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Primary Care', rating: 4.8, isVerified: true },
      { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiology', rating: 4.9, isVerified: true },
      { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', rating: 4.7, isVerified: true },
      { id: '4', name: 'Dr. David Williams', specialty: 'Orthopedics', rating: 4.5, isVerified: false },
    ];
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Frequent Providers</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {providers.map((provider) => (
          <ProviderItem 
            key={provider.id}
            name={provider.name}
            specialty={provider.specialty}
            rating={provider.rating}
            imageUrl={provider.imageUrl}
            isVerified={provider.isVerified}
            onPress={() => onProviderPress && onProviderPress(provider)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  seeAll: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  scrollContent: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  providerItem: {
    alignItems: 'center',
    marginRight: spacing.lg,
    width: 90,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  providerImage: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.round,
    backgroundColor: colors.border,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  verifiedText: {
    color: colors.textInverse,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  providerName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  providerSpecialty: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginRight: 4,
  },
  ratingStars: {
    fontSize: typography.fontSize.xs,
    color: colors.gold,
  },
});

export default FrequentProviders;
