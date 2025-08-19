import { StyleSheet } from 'react-native';
import { Stack, Text, Card, Button } from '@boomerang/ui';
import { colors } from '@boomerang/core';

import { Text as ThemedText, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Stack spacing="lg" align="center">
        <Text variant="h1" weight="bold" color={colors.primary}>
          BoomerangConnect
        </Text>
        
        <Text variant="body" color={colors.textSecondary} style={{ textAlign: 'center' }}>
          Connect with trusted healthcare providers
        </Text>
        
        <Card style={{ width: '100%', maxWidth: 400 }}>
          <Stack spacing="md">
            <Text variant="h3" weight="semibold">
              Welcome to BoomerangConnect
            </Text>
            
            <Text variant="body" color={colors.textSecondary}>
              This is a monorepo setup with shared UI components between web and mobile platforms.
            </Text>
            
            <Button 
              title="Get Started" 
              onPress={() => alert('Button pressed!')}
              variant="primary"
            />
          </Stack>
        </Card>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
