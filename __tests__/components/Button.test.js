import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity, Text } from 'react-native';

// Since we don't have a Button component yet, we'll test a simple button implementation
// This can be updated once you create actual Button components
const Button = ({ onPress, title, testID }) => (
  <TouchableOpacity onPress={onPress} testID={testID}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

describe('Button Component', () => {
  it('renders correctly with provided title', () => {
    const { getByText } = render(<Button title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button title="Test Button" onPress={onPressMock} testID="test-button" />
    );
    
    const button = getByTestId('test-button');
    fireEvent.press(button);
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const DisabledButton = ({ onPress, title, testID }) => (
      <TouchableOpacity 
        onPress={onPress} 
        testID={testID}
        disabled={true}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
    
    const { getByTestId } = render(
      <DisabledButton title="Test Button" onPress={onPressMock} testID="test-button" />
    );
    
    const button = getByTestId('test-button');
    fireEvent.press(button);
    
    expect(onPressMock).not.toHaveBeenCalled();
  });
});


