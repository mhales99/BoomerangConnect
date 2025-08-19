import React from 'react';
import { View, StyleSheet, ViewStyle, FlexAlignType } from 'react-native';
import { spacing } from '@boomerang/core';

type StackDirection = 'row' | 'column';
type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type StackAlignment = 'start' | 'center' | 'end' | 'stretch';
type StackJustification = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

interface StackProps {
  children: React.ReactNode;
  direction?: StackDirection;
  spacing?: StackSpacing;
  align?: StackAlignment;
  justify?: StackJustification;
  wrap?: boolean;
  style?: ViewStyle;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing: spacingProp = 'none',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  style,
  ...props
}) => {
  const stackStyles: ViewStyle = {
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: mapAlignment(align),
    justifyContent: mapJustification(justify),
    gap: mapSpacing(spacingProp),
  };

  return (
    <View style={[stackStyles, style]} {...props}>
      {children}
    </View>
  );
};

const mapAlignment = (align: StackAlignment): FlexAlignType => {
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'center':
      return 'center';
    case 'end':
      return 'flex-end';
    case 'stretch':
      return 'stretch';
    default:
      return 'stretch';
  }
};

const mapJustification = (justify: StackJustification): 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' => {
  switch (justify) {
    case 'start':
      return 'flex-start';
    case 'center':
      return 'center';
    case 'end':
      return 'flex-end';
    case 'between':
      return 'space-between';
    case 'around':
      return 'space-around';
    case 'evenly':
      return 'space-evenly';
    default:
      return 'flex-start';
  }
};

const mapSpacing = (spacingValue: StackSpacing): number => {
  switch (spacingValue) {
    case 'none':
      return 0;
    case 'xs':
      return spacing.xs;
    case 'sm':
      return spacing.sm;
    case 'md':
      return spacing.md;
    case 'lg':
      return spacing.lg;
    case 'xl':
      return spacing.xl;
    case 'xxl':
      return spacing.xxl;
    default:
      return 0;
  }
};
