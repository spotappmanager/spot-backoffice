import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, Animated, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  Layers, 
  Navigation, 
  MapPinned 
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { mockEvents } from '@/data';
import MapControlButton from '@/components/MapControlButton';
import * as Location from 'expo-location';

// Only import react-native-maps on native platforms
let MapView = null;
let PROVIDER_GOOGLE = null;
let EventMarker = null;

if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;
  EventMarker = require('@/components/EventMarker').default;
}

const initialRegion = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const mapRef = useRef(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(initialRegion);
  
  const panelTranslateY = useRef(new Animated.Value(Layout.window.height)).current;
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        setUserLocation({ latitude, longitude });
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        
        if (Platform.OS !== 'web' && mapRef.current) {
          mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }, 1000);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    })();
  }, []);
  
  const handleMarkerPress = (eventId) => {
    setSelectedEventId(eventId);
    
    Animated.spring(panelTranslateY, {
      toValue: Layout.window.height - 300,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };
  
  const centerOnUserLocation = () => {
    if (userLocation && Platform.OS !== 'web' && mapRef.current) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0052,
        longitudeDelta: 0.0051,
      }, 1000);
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapText}>
            Map functionality is not available on web platform.
            Please use a mobile device to access the map features.
          </Text>
        </View>
      );
    }

    return (
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        region={mapRegion}
        showsUserLocation
        showsMyLocationButton={false}
        mapType="standard"
        loadingEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
      >
        {mockEvents.map((event) => (
          <EventMarker
            key={event.id}
            id={event.id}
            coordinate={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
            }}
            title={event.title}
            category={event.category}
            isLive={event.isLive}
            isSelected={selectedEventId === event.id}
            onPress={() => handleMarkerPress(event.id)}
          />
        ))}
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      {renderMap()}
      
      <SafeAreaView edges={['top']} style={styles.controlsTopContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.gray[500]} />
          <View style={styles.searchBarPlaceholder} />
          <MapControlButton onPress={() => {}} style={styles.filterButton}>
            <Filter size={20} color={Colors.primary[500]} />
          </MapControlButton>
        </View>
      </SafeAreaView>
      
      <SafeAreaView edges={['right']} style={styles.controlsRightContainer}>
        <MapControlButton 
          onPress={() => {}}
          style={styles.mapControlButton}
        >
          <Layers size={20} color={Colors.primary[500]} />
        </MapControlButton>
        
        <MapControlButton 
          onPress={centerOnUserLocation}
          style={styles.mapControlButton}
        >
          <Navigation size={20} color={Colors.primary[500]} />
        </MapControlButton>
        
        <MapControlButton 
          onPress={() => {}}
          style={styles.mapControlButton}
        >
          <MapPinned size={20} color={Colors.primary[500]} />
        </MapControlButton>
      </SafeAreaView>
      
      <Animated.View 
        style={[
          styles.eventPanel,
          { transform: [{ translateY: panelTranslateY }] }
        ]}
      >
        {/* Event details panel content goes here */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  map: {
    flex: 1,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    padding: Layout.spacing.xl,
  },
  webMapText: {
    textAlign: 'center',
    color: Colors.gray[600],
    fontSize: 16,
    lineHeight: 24,
  },
  controlsTopContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchBarPlaceholder: {
    flex: 1,
    height: 24,
    marginLeft: Layout.spacing.sm,
  },
  filterButton: {
    width: 36,
    height: 36,
    marginLeft: Layout.spacing.sm,
  },
  controlsRightContainer: {
    position: 'absolute',
    top: 100,
    right: 0,
    paddingRight: Layout.spacing.md,
    alignItems: 'flex-end',
  },
  mapControlButton: {
    marginBottom: Layout.spacing.md,
  },
  eventPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: Layout.borderRadius.xl,
    borderTopRightRadius: Layout.borderRadius.xl,
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});