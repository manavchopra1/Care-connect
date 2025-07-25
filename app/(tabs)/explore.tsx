import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const providers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 4.8,
    reviews: 124,
    location: 'New York, NY',
    services: ['Elderly Care', 'Nursing'],
    price: 25,
    available: true,
    verified: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
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
    services: ['Housekeeping', 'Cooking'],
    price: 22,
    available: false,
    verified: true,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    gender: 'Male',
    employmentType: 'Part-Time',
    languages: ['English', 'Mandarin']
  },
  {
    id: 3,
    name: 'Priya Patel',
    rating: 4.7,
    reviews: 56,
    location: 'Chicago, IL',
    services: ['Cooking', 'Housekeeping'],
    price: 30,
    available: true,
    verified: true,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    gender: 'Female',
    employmentType: 'Contract',
    languages: ['English', 'Hindi']
  }
];

const employmentTypes = ['Hourly', 'Part-Time', 'Full-Time', 'Contract'];
const genders = ['Any', 'Male', 'Female', 'Non-Binary'];
const languages = ['English', 'Spanish', 'Mandarin', 'Hindi', 'French', 'Arabic', 'Bengali', 'Russian'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    availability: false,
    verified: false,
    employmentType: '',
    gender: 'Any',
    languages: [] as string[],
  });
  const router = useRouter();

  const filteredProviders = providers.filter(provider => {
    if (
      searchQuery &&
      !provider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    if (filters.availability && !provider.available) return false;
    if (filters.verified && !provider.verified) return false;
    if (filters.employmentType && provider.employmentType !== filters.employmentType) return false;
    if (filters.gender !== 'Any' && provider.gender !== filters.gender) return false;
    if (filters.languages.length > 0 && !filters.languages.some(lang => provider.languages.includes(lang))) return false;
    return true;
  });

  const resetFilters = () => setFilters({ availability: false, verified: false, employmentType: '', gender: 'Any', languages: [] });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Search</Text>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search by name, service, or location..."
              style={{ flex: 1, fontSize: 16 }}
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
            <Ionicons name="options-outline" size={22} color="#6C63FF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.providersTitle}>All Providers</Text>
        <Text style={styles.providersCount}>{filteredProviders.length} providers found</Text>
        {filteredProviders.map(provider => (
          <TouchableOpacity
            key={provider.id}
            style={styles.providerCard}
            activeOpacity={0.85}
            onPress={() => router.push(`/provider/${provider.id}`)}
          >
            <Image source={{ uri: provider.image }} style={styles.providerImg} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.providerName}>{provider.name}</Text>
                {provider.verified && (
                  <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={{ marginLeft: 4 }} />
                )}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{provider.rating} ({provider.reviews})</Text>
                <Text style={styles.location}>{provider.location}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 }}>
                {provider.services.map(tag => (
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
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Filter Modal */}
      <Modal
        visible={showFilter}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={styles.modalOverlay}>
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
                  trackColor={{ false: '#ccc', true: '#6C63FF' }}
                  thumbColor={filters.availability ? '#6C63FF' : '#fff'}
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
                  trackColor={{ false: '#ccc', true: '#6C63FF' }}
                  thumbColor={filters.verified ? '#6C63FF' : '#fff'}
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
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
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
  providersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  providersCount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
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
    color: '#6C63FF',
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 420,
  },
  filterLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  filterRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#F1F1FA',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#6C63FF',
  },
  filterChipText: {
    color: '#6C63FF',
    fontWeight: '500',
    fontSize: 15,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#F1F1FA',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  resetBtnText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 16,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
