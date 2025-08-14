import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const TrustPointScore = ({ score = 750, tier = 'Gold', onPress }) => {
  // Calculate the percentage for the progress bar (assuming max score is 1000)
  const progressPercentage = (score / 1000) * 100;
  
  // Determine tier color
  const getTierColor = () => {
    switch (tier.toLowerCase()) {
      case 'gold':
        return colors.gold;
      case 'silver':
        return colors.textTertiary;
      case 'bronze':
        return '#CD7F32';
      default:
        return colors.gold;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>Trust Points</Text>
        <View style={styles.tierContainer}>
          <View style={[styles.tierIndicator, { backgroundColor: getTierColor() }]} />
          <Text style={styles.tierText}>{tier}</Text>
        </View>
      </View>
      
      <Text style={styles.score}>{score}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%`, backgroundColor: getTierColor() }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {1000 - score} points to next level
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...styles.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  tierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierIndicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.round,
    marginRight: spacing.xs,
  },
  tierText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  score: {
    fontSize: typography.fontSize.jumbo,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginVertical: spacing.sm,
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  progressBackground: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.round,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'right',
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

export default TrustPointScore;
