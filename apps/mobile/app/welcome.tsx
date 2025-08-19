import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Stack, Text, Card, Button, Input } from '@boomerang/ui';
import { colors, spacing, borderRadius, useAuth } from '@boomerang/core';
import { router } from 'expo-router';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
}

export default function WelcomeScreen() {
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
      router.push('/(tabs)');
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
      
      Alert.alert('Success', 'Account created successfully!');
      // User will be redirected by useEffect
    } catch (error) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      setAuthError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setAuthError('Please enter your email and password');
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    setIsLoading(true);
    setAuthError('');
    
    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });
      
      Alert.alert('Success', 'Signed in successfully!');
      // User will be redirected by useEffect
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      setAuthError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.card}>
        <Stack spacing="xl" align="center">
          {/* Auth Error Display */}
          {authError && (
            <View style={{
              backgroundColor: colors.error,
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              marginBottom: spacing.md,
            }}>
              <Text variant="caption" color={colors.textInverse} style={{ textAlign: 'center' }}>
                {authError}
              </Text>
            </View>
          )}

          {/* Header */}
          <Stack spacing="sm" align="center">
            <Text variant="h1" weight="bold" color={colors.primary}>
              BoomerangConnect
            </Text>
            
            <Text variant="h3" weight="semibold" color={colors.text}>
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </Text>
            
            <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
              {isSignUp 
                ? 'Join our community of trusted healthcare providers and patients'
                : 'Sign in to access your secure healthcare network'
              }
            </Text>
          </Stack>

          {/* Sign Up Form */}
          {isSignUp && (
            <Stack spacing="md" style={styles.form}>
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChangeText={(text) => handleInputChange('firstName', text)}
                    error={errors.firstName}
                  />
                </View>
                <View style={styles.nameField}>
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                    error={errors.lastName}
                  />
                </View>
              </View>

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
                style={styles.submitButton}
              />
            </Stack>
          )}

          {/* Sign In Form */}
          {!isSignUp && (
            <Stack spacing="md" style={styles.form}>
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
                style={styles.submitButton}
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
            <Text variant="caption" color={colors.textTertiary} style={styles.terms}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          )}
        </Stack>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  card: {
    padding: spacing.xl,
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  nameField: {
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  terms: {
    textAlign: 'center',
  },
});
