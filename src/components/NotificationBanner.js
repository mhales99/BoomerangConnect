import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const NotificationBanner = ({ 
  notification, 
  onPress, 
  onDismiss, 
  autoDismiss = true,
  autoDismissTimeout = 5000,
}) => {
  const [visible, setVisible] = useState(false);
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeout = useRef(null);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      showBanner();
      
      if (autoDismiss) {
        timeout.current = setTimeout(() => {
          hideBanner();
        }, autoDismissTimeout);
      }
    }
    
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [notification]);

  const showBanner = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideBanner = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  const handlePress = () => {
    hideBanner();
    if (onPress) {
      onPress(notification);
    }
  };

  if (!visible || !notification) {
    return null;
  }

  const { title, body } = notification;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity style={styles.content} onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title || 'New Notification'}
          </Text>
          {body ? (
            <Text style={styles.body} numberOfLines={2}>
              {body}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={hideBanner}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 10,
    left: 10,
    right: 10,
    zIndex: 999,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#999',
    lineHeight: 22,
  },
});

export default NotificationBanner;
