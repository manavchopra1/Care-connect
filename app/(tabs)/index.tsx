import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Animated, Image, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFavorites } from '../../components/FavoritesContext';
import { useNotifications } from '../../components/NotificationsContext';
import { useThemeColor } from '../../hooks/useThemeColor';

const services: { id: string; icon: any; label: string; color: string }[] = [
  { id: '1', icon: 'medkit-outline', label: 'Medical', color: '#5B9BD5' },
  { id: '2', icon: 'fitness-outline', label: 'Fitness', color: '#4CAF50' },
  { id: '3', icon: 'restaurant-outline', label: 'Nutrition', color: '#FF9800' },
  { id: '4', icon: 'happy-outline', label: 'Wellness', color: '#E91E63' },
  { id: '5', icon: 'school-outline', label: 'Education', color: '#2196F3' },
];

const providers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 4.8,
    reviews: 124,
    location: 'New York, NY',
    tags: ['Elderly Care', 'Nursing'],
    price: 25,
    available: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true,
    gender: 'Female',
    employmentType: 'Full-Time',
    languages: ['English', 'Spanish']
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 4.9,
    reviews: 89,
    location: 'San Francisco, CA',
    tags: ['Housekeeping', 'Cooking'],
    price: 22,
    available: false,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
    gender: 'Male',
    employmentType: 'Part-Time',
    languages: ['English', 'Mandarin']
  },
];

const employmentTypes = ['Hourly', 'Part-Time', 'Full-Time', 'Contract'];
const genders = ['Any', 'Male', 'Female', 'Non-Binary'];
const languages = ['English', 'Spanish', 'Mandarin', 'Hindi', 'French', 'Arabic', 'Bengali', 'Russian'];

export default function HomeScreen() {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    availability: false,
    verified: false,
    employmentType: '',
    gender: 'Any',
    languages: [] as string[],
    priceRange: [10, 100],
    minRating: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { notifications, markAsRead, removeNotification, addNotification } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const providersSectionRef = React.useRef(null);
  const [loading, setLoading] = useState(false);

  // For demo: add a sample notification if none exist
  React.useEffect(() => {
    if (notifications.length === 0) {
      addNotification({ title: 'Welcome!', message: 'Thanks for using CareConnect.' });
    }
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); // Simulate loading
    return () => clearTimeout(timeout);
  }, [searchQuery, filters]);

  const filteredProviders = providers.filter(provider => {
    if (
      searchQuery &&
      !provider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !provider.tags.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    if (filters.availability && !provider.available) return false;
    if (filters.verified && !provider.verified) return false;
    if (filters.employmentType && provider.employmentType !== filters.employmentType) return false;
    if (filters.gender !== 'Any' && provider.gender !== filters.gender) return false;
    if (filters.languages.length > 0 && !filters.languages.some(lang => provider.languages.includes(lang))) return false;
    if (provider.price < filters.priceRange[0] || provider.price > filters.priceRange[1]) return false;
    if (provider.rating < filters.minRating) return false;
    return true;
  });

  const resetFilters = () => setFilters({ availability: false, verified: false, employmentType: '', gender: 'Any', languages: [], priceRange: [10, 100], minRating: 0 });

  // Animated value for button press
  const scaleAnim = useState(new Animated.Value(1))[0];
  const animatePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };
  const animatePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView style={[styles.container, { backgroundColor }]} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={[styles.headerRow, Platform.OS === 'ios' && { marginTop: 32 }]}> {/* Add extra top margin on iOS */}
          <View style={[styles.greetingContainer, Platform.OS === 'ios' && { marginTop: 24 }]}> {/* Move greeting lower on iOS */}
            <Text style={styles.greeting}>Hello, User</Text>
            <Text style={styles.subtitle}>Find your perfect care provider</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.bellIcon} onPress={() => setShowNotifications(true)} onPressIn={animatePressIn} onPressOut={animatePressOut}>
                <Ionicons name="notifications-outline" size={28} color="#222" />
                {unreadCount > 0 && <View style={styles.bellDot}><Text style={styles.bellDotText}>{unreadCount}</Text></View>}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.heartIcon} onPress={() => setShowFavorites(true)} onPressIn={animatePressIn} onPressOut={animatePressOut}>
                <Ionicons name="heart-outline" size={28} color="#F44336" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
        <Animatable.View animation="fadeInUp" duration={600} delay={100}>
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search for services or providers..."
                style={{ flex: 1, fontSize: 16 }}
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
              <Ionicons name="options-outline" size={22} color="#5B9BD5" />
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={600} delay={200}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesRow}>
            {services.map((service, idx) => (
              <Animatable.View key={service.id} animation="fadeInUp" delay={300 + idx * 60} duration={500}>
                <TouchableOpacity style={styles.serviceCard} onPress={() => setSearchQuery(service.label)}>
                  <Ionicons name={service.icon} size={24} color={service.color} />
                  <Text style={styles.serviceLabel}>{service.label}</Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </ScrollView>
        </Animatable.View>
        <Animatable.View ref={providersSectionRef} animation="fadeInUp" duration={600} delay={400}>
          <Text style={styles.sectionTitle}>Recommended Providers</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={600} delay={500}>
          {loading ? (
            <View style={{ alignItems: 'center', marginTop: 32 }}>
              <ActivityIndicator size="large" color="#5B9BD5" />
              {/* Add skeleton cards here if desired */}
            </View>
          ) : filteredProviders.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 32 }}>
              <Ionicons name="search-outline" size={48} color="#888" />
              <Text style={{ color: '#888', marginTop: 8 }}>No providers found.</Text>
            </View>
          ) : (
            filteredProviders.map((provider, idx) => (
              <Animatable.View key={provider.id} animation="fadeInUp" delay={600 + idx * 80} duration={500}>
                <TouchableOpacity
                  key={provider.id}
                  style={[styles.providerCard, { backgroundColor: cardColor }]}
                  activeOpacity={0.85}
                  onPress={() => router.push(`/provider/${provider.id}`)}
                >
                  <Image source={{ uri: provider.image }} style={styles.providerImg} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.providerName, { color: textColor }]}>{provider.name}</Text>
                      <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={{ marginLeft: 4 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.rating}>{provider.rating} ({provider.reviews})</Text>
                      <Text style={styles.location}>{provider.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 }}>
                      {provider.tags.map(tag => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={styles.price}>${provider.price}/hr</Text>
                      <Text style={[styles.availability, { color: provider.available ? '#4CAF50' : '#F44336' }]}> 
                        {provider.available ? 'Available Now' : 'Unavailable'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => toggleFavorite(provider.id)} style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                    <Ionicons name={isFavorite(provider.id) ? 'heart' : 'heart-outline'} size={24} color="#F44336" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animatable.View>
            ))
          )}
        </Animatable.View>
      </ScrollView>
      {/* Filter Modal */}
      <Modal
        visible={showFilter}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={styles.modalOverlay}>
          <Animatable.View animation="fadeIn" duration={300}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#222' }}>Filter</Text>
                <TouchableOpacity onPress={() => setShowFilter(false)}>
                  <Ionicons name="close" size={28} color="#888" />
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Availability</Text>
                <View style={styles.filterRow}>
                  <Text>Available Now</Text>
                  <Switch
                    value={filters.availability}
                    onValueChange={v => setFilters(f => ({ ...f, availability: v }))}
                              trackColor={{ false: '#ccc', true: '#5B9BD5' }}
          thumbColor={filters.availability ? '#5B9BD5' : '#fff'}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Verification</Text>
                <View style={styles.filterRow}>
                  <Text>Verified Providers Only</Text>
                  <Switch
                    value={filters.verified}
                    onValueChange={v => setFilters(f => ({ ...f, verified: v }))}
                              trackColor={{ false: '#ccc', true: '#5B9BD5' }}
          thumbColor={filters.verified ? '#5B9BD5' : '#fff'}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Employment Type</Text>
                <View style={styles.filterRowWrap}>
                  {employmentTypes.map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[styles.filterChip, filters.employmentType === type && styles.filterChipActive]}
                      onPress={() => setFilters(f => ({ ...f, employmentType: f.employmentType === type ? '' : type }))}
                    >
                      <Text style={[styles.filterChipText, filters.employmentType === type && styles.filterChipTextActive]}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Gender</Text>
                <View style={styles.filterRowWrap}>
                  {genders.map(gender => (
                    <TouchableOpacity
                      key={gender}
                      style={[styles.filterChip, filters.gender === gender && styles.filterChipActive]}
                      onPress={() => setFilters(f => ({ ...f, gender }))}
                    >
                      <Text style={[styles.filterChipText, filters.gender === gender && styles.filterChipTextActive]}>{gender}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Languages</Text>
                <View style={styles.filterRowWrap}>
                  {languages.map(language => (
                    <TouchableOpacity
                      key={language}
                      style={[styles.filterChip, filters.languages.includes(language) && styles.filterChipActive]}
                      onPress={() => setFilters(f => ({
                        ...f,
                        languages: f.languages.includes(language)
                          ? f.languages.filter(l => l !== language)
                          : [...f.languages, language],
                      }))}
                    >
                      <Text style={[styles.filterChipText, filters.languages.includes(language) && styles.filterChipTextActive]}>{language}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Price Range (${filters.priceRange[0]} - ${filters.priceRange[1]})</Text>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={10}
                  maximumValue={100}
                  step={1}
                  value={filters.priceRange[1]}
                  onValueChange={v => setFilters(f => ({ ...f, priceRange: [f.priceRange[0], v] }))}
                  minimumTrackTintColor="#5B9BD5"
                  maximumTrackTintColor="#ccc"
                />
              </View>
              <View style={{ marginBottom: 18 }}>
                <Text style={styles.filterLabel}>Minimum Rating</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {[1,2,3,4,5].map(star => (
                    <TouchableOpacity key={star} onPress={() => setFilters(f => ({ ...f, minRating: star }))}>
                      <Ionicons name={filters.minRating >= star ? 'star' : 'star-outline'} size={28} color={filters.minRating >= star ? '#FFD700' : '#bbb'} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                  <Text style={styles.resetBtnText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
                  <Text style={styles.applyBtnText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </View>
      </Modal>
      {/* Notifications Modal */}
      <Animatable.View animation={showNotifications ? 'fadeIn' : undefined} duration={300} style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: showNotifications ? 10 : -1 }} pointerEvents={showNotifications ? 'auto' : 'none'}>
        <Modal visible={showNotifications} animationType="slide" transparent onRequestClose={() => setShowNotifications(false)}>
          <View style={styles.modalOverlay}>
            <Animatable.View animation="fadeIn" duration={300}>
              <View style={styles.notificationsModal}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <ScrollView style={{ maxHeight: 350 }}>
                  {notifications.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 32 }}>No notifications yet.</Text>
                  ) : (
                    notifications.map((n) => (
                      <Animatable.View key={n.id} animation="fadeInUp" delay={n.id * 50} duration={300}>
                        <View style={[styles.notificationItem, n.read && { opacity: 0.5 }]}> 
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold' }}>{n.title}</Text>
                            <Text>{n.message}</Text>
                            <Text style={{ fontSize: 12, color: '#888' }}>{new Date(n.timestamp).toLocaleString()}</Text>
                          </View>
                          {!n.read && (
                            <TouchableOpacity onPress={() => markAsRead(n.id)}>
                              <Ionicons name="checkmark-done" size={22} color="#4CAF50" style={{ marginRight: 8 }} />
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity onPress={() => removeNotification(n.id)}>
                            <Ionicons name="close" size={22} color="#F44336" />
                          </TouchableOpacity>
                        </View>
                      </Animatable.View>
                    ))
                  )}
                </ScrollView>
                <TouchableOpacity style={styles.closeModalBtn} onPress={() => setShowNotifications(false)}>
                  <Text style={{ color: '#007AFF', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </Modal>
      </Animatable.View>
      {/* Favorites Modal */}
      <Modal visible={showFavorites} animationType="slide" transparent onRequestClose={() => setShowFavorites(false)}>
        <View style={styles.modalOverlay}>
          <Animatable.View animation="fadeIn" duration={300}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Favorites</Text>
              {favorites.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 32 }}>
                  <Ionicons name="heart-dislike-outline" size={48} color="#F44336" />
                  <Text style={{ marginTop: 12, fontSize: 16, color: '#888' }}>No favorites yet.</Text>
                </View>
              ) : (
                providers.filter(p => favorites.includes(p.id)).map(provider => (
                  <TouchableOpacity key={provider.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }} onPress={() => { setShowFavorites(false); router.push(`/provider/${provider.id}`); }}>
                    <Animatable.View animation="fadeInUp" delay={provider.id * 50} duration={300}>
                      <Image source={{ uri: provider.image }} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" delay={provider.id * 50 + 50} duration={300}>
                      <View>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{provider.name}</Text>
                        <Text style={{ color: '#888' }}>{provider.location}</Text>
                      </View>
                    </Animatable.View>
                  </TouchableOpacity>
                ))
              )}
              <TouchableOpacity style={styles.closeModalBtn} onPress={() => setShowFavorites(false)}>
                <Text style={{ color: '#007AFF', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 2,
  },
  bellIcon: {
    position: 'relative',
    padding: 6,
  },
  bellDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 3,
  },
  bellDotText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  filterBtn: {
    marginLeft: 10,
    backgroundColor: '#F1F1FA',
    borderRadius: 12,
    padding: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  seeAll: {
    color: '#5B9BD5',
    fontWeight: '500',
    fontSize: 15,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    color: '#222',
  },
  serviceDesc: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  providerImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  providerName: {
    fontWeight: '600',
    fontSize: 17,
    color: '#222',
  },
  rating: {
    fontSize: 14,
    color: '#222',
    marginLeft: 4,
    marginRight: 8,
  },
  location: {
    fontSize: 13,
    color: '#888',
  },
  tag: {
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 13,
    color: '#5B9BD5',
    fontWeight: '500',
  },
  price: {
    fontWeight: '700',
    fontSize: 18,
    color: '#222',
  },
  availability: {
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  filterRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  filterChip: {
    backgroundColor: '#F1F1FA',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#6C63FF',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  resetBtn: {
    backgroundColor: '#F1F1FA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  resetBtnText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  applyBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  greetingContainer: {
    // Add this style for possible future adjustments
  },
  heartIcon: {
    marginLeft: 16,
    padding: 6,
  },
  notificationsModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  closeModalBtn: {
    marginTop: 16,
    alignSelf: 'center',
  },
  servicesRow: {
    marginBottom: 16,
  },
  serviceLabel: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 4,
  },
});
