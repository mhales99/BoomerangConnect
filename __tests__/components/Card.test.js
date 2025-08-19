import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text, StyleSheet } from 'react-native';

// Since we don't have a Card component yet, we'll test a simple card implementation
// This can be updated once you create actual Card components
const Card = ({ title, children, testID }) => (
  <View style={styles.card} testID={testID}>
    {title && <Text style={styles.title}>{title}</Text>}
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1C1C1E',
  },
});

describe('Card Component', () => {
  it('renders correctly with title', () => {
    const { getByText, getByTestId } = render(
      <Card title="Test Card" testID="test-card">
        <Text>Card content</Text>
      </Card>
    );
    
    expect(getByTestId('test-card')).toBeTruthy();
    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders correctly without title', () => {
    const { queryByText, getByText, getByTestId } = render(
      <Card testID="test-card">
        <Text>Card content</Text>
      </Card>
    );
    
    expect(getByTestId('test-card')).toBeTruthy();
    expect(queryByText('Test Card')).toBeNull();
    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders multiple children correctly', () => {
    const { getByText } = render(
      <Card title="Test Card">
        <Text testID="content-1">First content</Text>
        <Text testID="content-2">Second content</Text>
      </Card>
    );
    
    expect(getByText('First content')).toBeTruthy();
    expect(getByText('Second content')).toBeTruthy();
  });
});
