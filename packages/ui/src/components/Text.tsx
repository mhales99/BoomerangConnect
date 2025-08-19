import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '@boomerang/core';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color = colors.text,
  style,
  numberOfLines,
  ...props
}) => {
  return (
    <RNText
      style={[styles[variant], styles[weight], { color }, style]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize.jumbo,
    lineHeight: typography.lineHeight.xxxl,
  },
  h2: {
    fontSize: typography.fontSize.xxxl,
    lineHeight: typography.lineHeight.xxl,
  },
  h3: {
    fontSize: typography.fontSize.xl,
    lineHeight: typography.lineHeight.xl,
  },
  body: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
  },
  label: {
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.xs,
  },
  regular: {
    fontWeight: '400' as const,
  },
  medium: {
    fontWeight: '500' as const,
  },
  semibold: {
    fontWeight: '600' as const,
  },
  bold: {
    fontWeight: '700' as const,
  },
});
