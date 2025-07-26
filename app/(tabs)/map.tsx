import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

const serviceCategories = [
  { id: 1, name: 'Healthcare', icon: 'medical', color: '#E74C3C' },
  { id: 2, name: 'Child Care', icon: 'people', color: '#3498DB' },
  { id: 3, name: 'Domestic', icon: 'home', color: '#2ECC71' },
  { id: 4, name: 'Specialized', icon: 'heart', color: '#9B59B6' },
];

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
    service: 'Healthcare',
    specialty: 'Full-Time Nurse',
    availability: 'Available Now',
    verified: true,
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
    service: 'Child Care',
    specialty: 'Child Care Nanny',
    availability: 'Available Now',
    verified: true,
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
    service: 'Domestic',
    specialty: 'House Maid',
    availability: 'Available Now',
    verified: true,
  },
  {
    id: 4,
    name: 'David Wilson',
    latitude: 34.0522,
    longitude: -118.2437,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    price: 28,
    rating: 4.6,
    location: 'Los Angeles, CA',
    service: 'Healthcare',
    specialty: 'Live-In Caregiver',
    availability: 'Available Now',
    verified: true,
  },
  {
    id: 5,
    name: 'Maria Garcia',
    latitude: 29.7604,
    longitude: -95.3698,
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    price: 24,
    rating: 4.8,
    location: 'Houston, TX',
    service: 'Specialized',
    specialty: 'Mental Health',
    availability: 'Available Now',
    verified: true,
  },
];

export default function MapScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showProviderModal, setShowProviderModal] = useState(false);

  const filteredProviders = providers.filter(provider => {
    const matchesCategory = !selectedCategory || provider.service === selectedCategory;
    const matchesSearch = !searchQuery || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryButton = (category: any) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        { backgroundColor: selectedCategory === category.name ? category.color : cardColor },
        { borderColor: category.color }
      ]}
      onPress={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
    >
      <Ionicons 
        name={category.icon as any} 
        size={20} 
        color={selectedCategory === category.name ? 'white' : category.color} 
      />
      <Text style={[
        styles.categoryText,
        { color: selectedCategory === category.name ? 'white' : category.color }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProviderCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.providerCard, { backgroundColor: cardColor }]}
      onPress={() => {
        setSelectedProvider(item);
        setShowProviderModal(true);
      }}
    >
      <View style={styles.providerHeader}>
        <View style={styles.providerInfo}>
          <Text style={[styles.providerName, { color: textColor }]}>{item.name}</Text>
          <Text style={styles.providerSpecialty}>{item.specialty}</Text>
          <Text style={styles.providerLocation}>{item.location}</Text>
        </View>
        <View style={styles.providerStats}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.priceText}>${item.price}/hr</Text>
        </View>
      </View>
      <View style={styles.providerFooter}>
        <View style={styles.availabilityContainer}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
          <Text style={styles.availabilityText}>{item.availability}</Text>
        </View>
        {item.verified && (
          <View style={styles.verifiedContainer}>
            <Ionicons name="shield-checkmark" size={16} color="#2196F3" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.webHeader}>
          <Text style={[styles.webTitle, { color: textColor }]}>Care Connect Map</Text>
          <Text style={styles.webSubtitle}>Find nearby healthcare and domestic service providers</Text>
        </View>
        
        <View style={styles.webContent}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { backgroundColor: cardColor, color: textColor }]}
              placeholder="Search providers, services, or locations..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {serviceCategories.map(renderCategoryButton)}
          </ScrollView>

          <FlatList
            data={filteredProviders}
            renderItem={renderProviderCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.providersList}
          />
        </View>
      </View>
    );
  }

  // Only require these on native
  const MapView = require('react-native-maps').default;
  const Callout = require('react-native-maps').Callout;
  const Marker = require('react-native-maps').Marker;
  const PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Map View */}
      <View style={styles.mapContainer}>
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
          {filteredProviders.map((provider) => (
            <Marker
              key={provider.id}
              coordinate={{ latitude: provider.latitude, longitude: provider.longitude }}
              title={provider.name}
              description={provider.specialty}
            >
              <Callout onPress={() => {
                setSelectedProvider(provider);
                setShowProviderModal(true);
              }}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{provider.name}</Text>
                  <Text style={styles.calloutSpecialty}>{provider.specialty}</Text>
                  <Text style={styles.calloutLocation}>{provider.location}</Text>
                  <View style={styles.calloutStats}>
                    <Text style={styles.calloutRating}>⭐ {provider.rating}</Text>
                    <Text style={styles.calloutPrice}>${provider.price}/hr</Text>
                  </View>
                  <TouchableOpacity style={styles.calloutButton}>
                    <Text style={styles.calloutButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Search and Filters */}
      <View style={[styles.overlayContainer, { backgroundColor: cardColor }]}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search providers, services, or locations..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="filter" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {serviceCategories.map(renderCategoryButton)}
          </ScrollView>
        )}
      </View>

      {/* Provider List */}
      <View style={[styles.providersContainer, { backgroundColor: cardColor }]}>
        <View style={styles.providersHeader}>
          <Text style={[styles.providersTitle, { color: textColor }]}>Nearby Providers</Text>
          <Text style={styles.providersCount}>{filteredProviders.length} available</Text>
        </View>
        <FlatList
          data={filteredProviders}
          renderItem={renderProviderCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.providersList}
        />
      </View>

      {/* Provider Detail Modal */}
      <Modal
        visible={showProviderModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProviderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardColor }]}>
            {selectedProvider && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: textColor }]}>{selectedProvider.name}</Text>
                  <TouchableOpacity onPress={() => setShowProviderModal(false)}>
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <Text style={styles.modalSpecialty}>{selectedProvider.specialty}</Text>
                  <Text style={styles.modalLocation}>{selectedProvider.location}</Text>
                  
                  <View style={styles.modalStats}>
                    <View style={styles.modalStat}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.modalStatText}>{selectedProvider.rating} Rating</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Ionicons name="cash" size={16} color="#4CAF50" />
                      <Text style={styles.modalStatText}>${selectedProvider.price}/hr</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                      <Text style={styles.modalStatText}>{selectedProvider.availability}</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => {
                      setShowProviderModal(false);
                      router.push(`/provider/${selectedProvider.id}`);
                    }}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    marginTop: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  providersContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '40%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  providersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  providersTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  providersCount: {
    fontSize: 14,
    color: '#666',
  },
  providersList: {
    paddingBottom: 20,
  },
  providerCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  providerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  providerLocation: {
    fontSize: 12,
    color: '#999',
  },
  providerStats: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  providerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 4,
  },
  calloutContainer: {
    width: 200,
    padding: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  calloutSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  calloutLocation: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  calloutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calloutRating: {
    fontSize: 12,
    fontWeight: '600',
  },
  calloutPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4CAF50',
  },
  calloutButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    flex: 1,
  },
  modalSpecialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  modalLocation: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalStatText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  bookButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  // Web styles
  webHeader: {
    padding: 20,
    alignItems: 'center',
  },
  webTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  webSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  webContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
}); 