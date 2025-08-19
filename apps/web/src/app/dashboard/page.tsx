'use client';

import React from 'react';
import { Stack, Text, Card, Button } from '@boomerang/ui';
import { colors, spacing, useAuth } from '@boomerang/core';

export default function DashboardPage() {
  const { userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!userProfile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text variant="h3">Loading...</Text>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.background,
      padding: spacing.md
    }}>
      <Stack spacing="xl">
        {/* Header */}
        <Stack spacing="sm">
          <Text variant="h1" weight="bold" color={colors.primary}>
            Welcome, {userProfile.firstName}!
          </Text>
          <Text variant="body" color={colors.textSecondary}>
            Your BoomerangConnect Dashboard
          </Text>
        </Stack>

        {/* User Info Card */}
        <Card style={{ padding: spacing.lg }}>
          <Stack spacing="md">
            <Text variant="h3" weight="semibold">
              Profile Information
            </Text>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
              <div>
                <Text variant="label" color={colors.textSecondary}>Name</Text>
                <Text variant="body" weight="medium">
                  {userProfile.firstName} {userProfile.lastName}
                </Text>
              </div>
              
              <div>
                <Text variant="label" color={colors.textSecondary}>Email</Text>
                <Text variant="body" weight="medium">{userProfile.email}</Text>
              </div>
              
              <div>
                <Text variant="label" color={colors.textSecondary}>Phone</Text>
                <Text variant="body" weight="medium">{userProfile.phone}</Text>
              </div>
              
              <div>
                <Text variant="label" color={colors.textSecondary}>Trust Points</Text>
                <Text variant="body" weight="medium" color={colors.primary}>
                  {userProfile.trustPoints} points
                </Text>
              </div>
            </div>
          </Stack>
        </Card>

        {/* Quick Actions */}
        <Card style={{ padding: spacing.lg }}>
          <Stack spacing="md">
            <Text variant="h3" weight="semibold">
              Quick Actions
            </Text>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
              <Button
                title="Find Providers"
                onPress={() => alert('Find Providers coming soon!')}
                variant="primary"
                size="medium"
              />
              
              <Button
                title="My Appointments"
                onPress={() => alert('My Appointments coming soon!')}
                variant="outline"
                size="medium"
              />
              
              <Button
                title="Update Profile"
                onPress={() => alert('Update Profile coming soon!')}
                variant="outline"
                size="medium"
              />
              
              <Button
                title="Sign Out"
                onPress={handleSignOut}
                variant="ghost"
                size="medium"
              />
            </div>
          </Stack>
        </Card>

        {/* Recent Activity */}
        <Card style={{ padding: spacing.lg }}>
          <Stack spacing="md">
            <Text variant="h3" weight="semibold">
              Recent Activity
            </Text>
            
            <Text variant="body" color={colors.textSecondary}>
              No recent activity. Start by finding a healthcare provider!
            </Text>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
}
