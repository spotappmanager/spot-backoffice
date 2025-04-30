import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface UserAvatarProps {
  uri?: string;
  size?: number;
  showBorder?: boolean;
  borderColor?: string;
}

export default function UserAvatar({ 
  uri, 
  size = 40, 
  showBorder = false,
  borderColor = Colors.primary[500]
}: UserAvatarProps) {
  if (!uri) {
    return (
      <View style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: showBorder ? 2 : 0,
          borderColor: borderColor,
        }
      ]}>
        <User 
          size={size * 0.6} 
          color={Colors.gray[400]} 
        />
      </View>
    );
  }

  return (
    <Image 
      source={{ uri }} 
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: showBorder ? 2 : 0,
          borderColor: borderColor,
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: Colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});