import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, borderRadius } from '@boomerang/core';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
    style,
  ];

  const textColor = getTextColor(variant, disabled);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {leftIcon && !loading && <IconContainer position="left">{leftIcon}</IconContainer>}
      
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : (
        <Text
          variant={size === 'small' ? 'caption' : 'body'}
          weight="semibold"
          color={textColor}
          style={textStyle}
        >
          {title}
        </Text>
      )}
      
      {rightIcon && !loading && <IconContainer position="right">{rightIcon}</IconContainer>}
    </TouchableOpacity>
  );
};

const IconContainer: React.FC<{ children: React.ReactNode; position: 'left' | 'right' }> = ({
  children,
  position,
}) => (
  <span style={{ 
    marginLeft: position === 'right' ? spacing.sm : 0,
    marginRight: position === 'left' ? spacing.sm : 0,
  }}>
    {children}
  </span>
);

const getTextColor = (variant: ButtonVariant, disabled: boolean): string => {
  if (disabled) {
    return colors.textTertiary;
  }
  
  switch (variant) {
    case 'primary':
      return colors.textInverse;
    case 'secondary':
      return colors.textInverse;
    case 'outline':
      return colors.primary;
    case 'ghost':
      return colors.primary;
    default:
      return colors.textInverse;
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  smallSize: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  mediumSize: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  largeSize: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});
