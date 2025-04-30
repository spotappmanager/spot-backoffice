import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle, 
  GestureResponderEvent 
} from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface MapControlButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function MapControlButton({ 
  onPress, 
  style,
  children 
}: MapControlButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});