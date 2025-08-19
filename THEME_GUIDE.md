# BoomerangConnect Theme Guide

## 🎨 Overview

The BoomerangConnect app features a professional, modern design system inspired by apps like Jane, using blue and green as primary colors. This guide covers the complete theme system, including colors, typography, spacing, and components.

## 🎯 Design Philosophy

- **Professional**: Clean, modern interface suitable for business networking
- **Accessible**: High contrast ratios and readable typography
- **Consistent**: Unified design language across all components
- **Scalable**: Modular system that grows with the app

## 🌈 Color System

### Primary Colors
Based on the BoomerangConnect logo:
- **Blue**: `#007AFF` - Main brand color, used for primary actions and highlights
- **Green**: `#34C759` - Secondary brand color, used for success states and accents
- **Dark Blue**: `#0056CC` - Used for hover states and emphasis
- **Dark Green**: `#28A745` - Used for success actions and confirmations

### Neutral Colors
- **White**: `#FFFFFF` - Primary background
- **Black**: `#1C1C1E` - Primary text color
- **Gray Scale**: 50-900 range for various UI elements

### Semantic Colors
- **Success**: `#34C759` (Green)
- **Warning**: `#FF9500` (Orange)
- **Error**: `#FF3B30` (Red)
- **Info**: `#007AFF` (Blue)

## 📝 Typography System

### Font Families
- **Primary**: System fonts (San Francisco on iOS, Roboto on Android)
- **Secondary**: System fonts for consistency
- **Mono**: Monospace fonts for code and technical content

### Font Sizes
- **xs**: 12px - Captions and small text
- **sm**: 14px - Body small
- **base**: 16px - Body medium (default)
- **lg**: 18px - Body large
- **xl**: 20px - Headings
- **2xl**: 24px - Large headings
- **3xl**: 28px - Page titles
- **4xl**: 32px - Section titles
- **5xl**: 36px - Hero text
- **6xl**: 48px - Display text

### Font Weights
- **light**: 300
- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700
- **extrabold**: 800

## 📏 Spacing System

### Base Spacing Units
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px
- **4xl**: 96px
- **5xl**: 128px

### Component Spacing
- **Screen Padding**: 16px horizontal, 24px vertical
- **Card Padding**: 8px (small), 16px (medium), 24px (large)
- **Button Padding**: Configurable horizontal and vertical spacing
- **Form Field Spacing**: 16px margin bottom

## 🧩 Component System

### Core Components

#### Button
```javascript
import { Button } from '../components';

<Button 
  title="Connect" 
  variant="primary" // primary, secondary, outline
  size="medium"     // small, medium, large
  onPress={handlePress}
/>
```

#### Card
```javascript
import { Card } from '../components';

<Card 
  padding="medium"  // small, medium, large
  shadow="md"       // sm, md, lg, xl
>
  {/* Card content */}
</Card>
```

#### Header
```javascript
import { Header } from '../components';

<Header 
  title="Profile"
  subtitle="Manage your account"
  showLogo={false}
  leftComponent={<BackButton />}
  rightComponent={<SettingsButton />}
/>
```

## 🎨 Usage Examples

### Basic Screen Structure
```javascript
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { theme, commonStyles, textStyles } from '../theme';
import { Header, Card, Button } from '../components';

const MyScreen = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Header title="My Screen" subtitle="Description" />
      
      <View style={commonStyles.content}>
        <Card>
          <Text style={textStyles.heading.h3}>Section Title</Text>
          <Text style={textStyles.body.medium}>Content goes here</Text>
          <Button title="Action" onPress={handleAction} />
        </Card>
      </View>
    </SafeAreaView>
  );
};
```

### Custom Styling
```javascript
import { theme } from '../theme';

const customStyles = StyleSheet.create({
  customButton: {
    backgroundColor: theme.colors.primary.green,
    borderRadius: theme.layout.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.layout.shadow.md,
  },
  customText: {
    ...theme.textStyles.heading.h2,
    color: theme.colors.neutral.white,
  },
});
```

## 🔧 Theme Customization

### Adding New Colors
```javascript
// In src/theme/colors.js
export const colors = {
  // ... existing colors
  custom: {
    brand: '#FF6B35',
    accent: '#4ECDC4',
  },
};
```

### Adding New Text Styles
```javascript
// In src/theme/typography.js
export const textStyles = {
  // ... existing styles
  custom: {
    hero: {
      fontSize: typography.fontSize['5xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
    },
  },
};
```

### Adding New Components
```javascript
// Create new component file
import { theme, commonStyles } from '../theme';

const CustomComponent = ({ children, style }) => {
  return (
    <View style={[commonStyles.card, style]}>
      {children}
    </View>
  );
};

export default CustomComponent;
```

## 📱 Platform Considerations

### iOS
- Uses San Francisco font family
- Supports dynamic type
- Optimized for iOS design patterns

### Android
- Uses Roboto font family
- Material Design principles
- Android-specific shadows and elevations

### Web
- System font stack for cross-platform consistency
- CSS-based shadows and animations
- Responsive design considerations

## 🎯 Best Practices

### Do's
- ✅ Use theme colors consistently
- ✅ Follow the spacing system
- ✅ Use semantic color names
- ✅ Maintain accessibility standards
- ✅ Test on multiple screen sizes

### Don'ts
- ❌ Don't hardcode colors
- ❌ Don't skip the spacing system
- ❌ Don't use arbitrary font sizes
- ❌ Don't ignore accessibility
- ❌ Don't create inconsistent components

## 🔄 Theme Updates

When updating the theme:
1. Update the relevant theme files
2. Test across all screens
3. Ensure accessibility compliance
4. Update documentation
5. Notify team members

## 📚 Resources

- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This theme system is designed to scale with BoomerangConnect and maintain consistency across all platforms and features.*

