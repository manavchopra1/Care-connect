import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const providers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    latitude: 40.7128,
    longitude: -74.0060,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    price: 25,
    rating: 4.8,
    location: 'New York, NY',
  },
  {
    id: 2,
    name: 'Michael Chen',
    latitude: 37.7749,
    longitude: -122.4194,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    price: 22,
    rating: 4.9,
    location: 'San Francisco, CA',
  },
  {
    id: 3,
    name: 'Priya Patel',
    latitude: 41.8781,
    longitude: -87.6298,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    price: 30,
    rating: 4.7,
    location: 'Chicago, IL',
  },
];

export default function MapScreen() {
  const router = useRouter();

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#888', textAlign: 'center' }}>
          Map is only available on mobile devices.
        </Text>
      </View>
    );
  }

  // Only require these on native
  const MapView = require('react-native-maps').default;
  const Callout = require('react-native-maps').Callout;
  const Marker = require('react-native-maps').Marker;
  const PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;
  const Dimensions = require('react-native').Dimensions;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            coordinate={{ latitude: provider.latitude, longitude: provider.longitude }}
            title={provider.name}
            description={provider.location}
          >
            <Callout onPress={() => router.push(`/provider/${provider.id}`)}>
              <View style={{ width: 160 }}>
                <Text style={{ fontWeight: 'bold' }}>{provider.name}</Text>
                <Text>{provider.location}</Text>
                <TouchableOpacity style={{ marginTop: 8 }}>
                  <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>View Details</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: 400,
  },
}); 