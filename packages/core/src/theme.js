/**
 * BoomerangConnect Theme
 * Inspired by Starbucks app design
 */
export const colors = {
    // Primary colors
    primary: '#00704A', // Starbucks green
    primaryDark: '#004F33',
    primaryLight: '#4C9C7D',
    // Secondary colors
    secondary: '#FF9500', // Orange for accents
    secondaryDark: '#D97B00',
    secondaryLight: '#FFAD33',
    // Neutral colors
    background: '#FFFFFF',
    card: '#FFFFFF',
    surface: '#F9F9F9',
    border: '#E0E0E0',
    // Text colors
    text: '#1A3C34', // Dark green for text
    textSecondary: '#6E7C77',
    textTertiary: '#A3ABA8',
    textInverse: '#FFFFFF',
    // Status colors
    success: '#00A862', // Green
    warning: '#FFC043', // Yellow
    error: '#D62B1F', // Red
    info: '#007AFF', // Blue
    // Additional colors
    gold: '#CBA258', // For rewards/status
    lightGold: '#F7F1E3',
    cream: '#F7F6E7',
    darkBrown: '#3D2B1F',
};
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 56,
};
export const borderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999,
};
export const typography = {
    // Font families - using system fonts for better native compatibility
    fontFamily: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
    },
    // Font sizes
    fontSize: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        xxl: 20,
        xxxl: 24,
        display: 28,
        jumbo: 32,
    },
    // Font weights
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    // Line heights
    lineHeight: {
        xs: 14,
        sm: 18,
        md: 22,
        lg: 24,
        xl: 28,
        xxl: 32,
        xxxl: 36,
    },
};
export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    xs: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 8,
        elevation: 6,
    },
};
export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
};
export default theme;
//# sourceMappingURL=theme.js.map