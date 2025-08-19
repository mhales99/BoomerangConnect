'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Stack, Text, Card, Button, Input } from '@boomerang/ui';
import { colors, spacing, borderRadius, useAuth } from '@boomerang/core';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
}

export default function WelcomePage() {
  const router = useRouter();
  const { user, userProfile, loading, signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState<Partial<SignUpForm>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>('');

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!loading && user && userProfile) {
      router.push('/dashboard');
    }
  }, [user, userProfile, loading, router]);

  const handleInputChange = (field: keyof SignUpForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpForm> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setAuthError('');
    
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
      });
      
      // User will be redirected by useEffect
    } catch (error) {
      console.error('Sign up error:', error);
      setAuthError(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setAuthError('Please enter your email and password');
      return;
    }

    setIsLoading(true);
    setAuthError('');
    
    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });
      
      // User will be redirected by useEffect
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthError(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.background,
      padding: spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '500px',
        padding: spacing.xl,
      } as any}>
        <Stack spacing="xl" align="center">
          {/* Header */}
          <Stack spacing="sm" align="center">
            <Text variant="h1" weight="bold" color={colors.primary}>
              BoomerangConnect
            </Text>
            
            <Text variant="h3" weight="semibold" color={colors.text}>
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </Text>
            
            <Text variant="body" color={colors.textSecondary} style={{ textAlign: 'center' }}>
              {isSignUp 
                ? 'Join our community of trusted healthcare providers and patients'
                : 'Sign in to access your secure healthcare network'
              }
            </Text>
          </Stack>

          {/* Auth Error Display */}
          {authError && (
            <div style={{
              backgroundColor: colors.error,
              color: colors.textInverse,
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {authError}
            </div>
          )}

          {/* Sign Up Form */}
          {isSignUp && (
            <Stack spacing="md" style={{ width: '100%' }}>
              <div style={{ display: 'flex', gap: spacing.sm }}>
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange('firstName', text)}
                  error={errors.firstName}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange('lastName', text)}
                  error={errors.lastName}
                />
              </div>

              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                error={errors.phone}
                keyboardType="phone-pad"
              />

              <Input
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
                value={formData.dateOfBirth}
                onChangeText={(text) => handleInputChange('dateOfBirth', text)}
                error={errors.dateOfBirth}
              />

              <Input
                label="Password"
                placeholder="Create a secure password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                error={errors.password}
                secureTextEntry
                helperText="Must be at least 8 characters"
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                error={errors.confirmPassword}
                secureTextEntry
              />

              <Button
                title={isLoading ? "Creating Account..." : "Create Account"}
                onPress={handleSignUp}
                variant="primary"
                size="large"
                loading={isLoading}
                disabled={isLoading}
                style={{ marginTop: spacing.md }}
              />
            </Stack>
          )}

          {/* Sign In Form */}
          {!isSignUp && (
            <Stack spacing="md" style={{ width: '100%' }}>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
              />

              <Button
                title="Sign In"
                onPress={handleSignIn}
                variant="primary"
                size="large"
                style={{ marginTop: spacing.md }}
              />
            </Stack>
          )}

          {/* Toggle between Sign Up and Sign In */}
          <Stack spacing="sm" align="center">
            <Text variant="body" color={colors.textSecondary}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            
            <Button
              title={isSignUp ? "Sign In Instead" : "Create Account"}
              onPress={() => setIsSignUp(!isSignUp)}
              variant="ghost"
              size="medium"
            />
          </Stack>

          {/* Terms and Privacy */}
          {isSignUp && (
            <Text variant="caption" color={colors.textTertiary} style={{ textAlign: 'center' }}>
              By creating an account, you agree to our{' '}
              <span style={{ color: colors.primary, cursor: 'pointer' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: colors.primary, cursor: 'pointer' }}>Privacy Policy</span>
            </Text>
          )}
        </Stack>
      </Card>
    </div>
  );
}
