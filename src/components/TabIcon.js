import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

const TabIcon = ({ name, focused }) => {
  // Icon mapping - using emoji for simplicity
  // In a real app, you would use a proper icon library like react-native-vector-icons
  const iconMap = {
    Home: '🏠',
    Connect: '🔄',
    Profile: '👤',
    Settings: '⚙️',
  };

  // Get the icon for the tab
  const icon = iconMap[name] || '•';

  return (
    <View style={styles.container}>
      <Text style={[
        styles.icon,
        focused ? styles.activeIcon : styles.inactiveIcon
      ]}>
        {icon}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  icon: {
    fontSize: 20,
  },
  activeIcon: {
    color: colors.primary,
  },
  inactiveIcon: {
    color: colors.textTertiary,
  },
});

export default TabIcon;
