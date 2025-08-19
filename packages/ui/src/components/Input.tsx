import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '@boomerang/core';
import { Text } from './Text';

type InputVariant = 'default' | 'outlined' | 'filled';
type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  variant = 'default',
  size = 'medium',
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputStyles = StyleSheet.flatten([
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    isFocused && styles.focused,
    error && styles.error,
    inputStyle,
  ]);

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const hasError = !!error;

  return (
    <View style={containerStyles}>
      {label && (
        <Text
          variant="label"
          weight="medium"
          color={hasError ? colors.error : colors.text}
          style={labelStyle}
        >
          {label}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={inputStyles as any}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helperText) && (
        <Text
          variant="caption"
          color={hasError ? colors.error : colors.textSecondary}
          style={hasError ? errorStyle : helperStyle}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  base: {
    flex: 1,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
    color: colors.text,
  },
  default: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.surface,
    borderColor: 'transparent',
  },
  smallSize: {
    paddingVertical: spacing.xs,
    fontSize: typography.fontSize.sm,
  },
  mediumSize: {
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
  },
  largeSize: {
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.lg,
  },
  focused: {
    borderColor: colors.primary,
  },
  error: {
    borderColor: colors.error,
  },
  leftIcon: {
    marginRight: spacing.sm,
    marginLeft: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  helperText: {
    marginTop: spacing.xs,
  },
});
