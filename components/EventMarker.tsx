import React from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { EventCategory } from '@/types';
import { Music, Beer, Coffee, Tent, Camera, Microscope as MicrophoneStage, Waves, Users, Utensils, FlagTriangleRight } from 'lucide-react-native';

let Marker = null;
if (Platform.OS !== 'web') {
  Marker = require('react-native-maps').Marker;
}

interface EventMarkerProps {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  category: EventCategory;
  isLive?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
}

export default function EventMarker({
  id,
  coordinate,
  title,
  category,
  isLive = false,
  onPress,
  isSelected = false,
}: EventMarkerProps) {
  const scale = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    if (isSelected) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSelected]);

  const getMarkerIcon = () => {
    const iconSize = 16;
    const iconColor = Colors.light.text;
    
    switch (category) {
      case 'concert':
        return <Music size={iconSize} color={iconColor} />;
      case 'bar':
        return <Beer size={iconSize} color={iconColor} />;
      case 'club':
        return <MicrophoneStage size={iconSize} color={iconColor} />;
      case 'food':
        return <Utensils size={iconSize} color={iconColor} />;
      case 'outdoor':
        return <Tent size={iconSize} color={iconColor} />;
      case 'culture':
        return <Camera size={iconSize} color={iconColor} />;
      case 'sport':
        return <Waves size={iconSize} color={iconColor} />;
      case 'meetup':
        return <Users size={iconSize} color={iconColor} />;
      case 'spontaneous':
        return <FlagTriangleRight size={iconSize} color={iconColor} />;
      default:
        return <Coffee size={iconSize} color={iconColor} />;
    }
  };

  if (Platform.OS === 'web' || !Marker) {
    return null;
  }

  return (
    <Marker
      identifier={id}
      coordinate={coordinate}
      title={title}
      onPress={onPress}
    >
      <Animated.View style={[
        styles.markerContainer,
        { 
          backgroundColor: isLive ? Colors.error[500] : Colors.primary[500],
          transform: [{ scale }]
        }
      ]}>
        <View style={styles.iconContainer}>
          {getMarkerIcon()}
        </View>
        {isLive && <View style={styles.liveIndicator} />}
      </Animated.View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.text,
    borderWidth: 2,
    borderColor: Colors.error[500],
  },
});