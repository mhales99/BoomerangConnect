import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const ReferralLoopItem = ({ name, progress, daysLeft, onPress }) => {
  // Calculate progress percentage
  const progressPercentage = progress * 100;
  
  return (
    <TouchableOpacity style={styles.loopItem} onPress={onPress}>
      <View style={styles.loopHeader}>
        <Text style={styles.loopName} numberOfLines={1}>{name}</Text>
        <Text style={styles.daysLeft}>{daysLeft} days left</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progressPercentage)}% complete
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ReferralLoops = ({ loops = [], onSeeAll, onLoopPress }) => {
  if (!loops || loops.length === 0) {
    loops = [
      { id: '1', name: 'Primary Care Referral', progress: 0.75, daysLeft: 14 },
      { id: '2', name: 'Specialist Network', progress: 0.3, daysLeft: 21 },
      { id: '3', name: 'Wellness Program', progress: 0.5, daysLeft: 7 },
    ];
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Referral Loops</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loops.map((loop) => (
          <ReferralLoopItem 
            key={loop.id}
            name={loop.name}
            progress={loop.progress}
            daysLeft={loop.daysLeft}
            onPress={() => onLoopPress && onLoopPress(loop)}
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
    paddingRight: spacing.sm,
  },
  loopItem: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
    width: 220,
    ...styles.shadows.sm,
  },
  loopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  loopName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  daysLeft: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.secondary,
    backgroundColor: colors.lightGold,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: borderRadius.xs,
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  progressBackground: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
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

export default ReferralLoops;




