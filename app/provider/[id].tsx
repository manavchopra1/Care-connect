import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Linking from 'expo-linking';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Image, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../../components/FavoritesContext';
import { useThemeColor } from '../../hooks/useThemeColor';

// Mock provider data (in real app, fetch by id)
const providers = [
  {
    id: 1,
    name: 'Dr. Olivia Smith',
    rating: 4.8,
    reviews: 124,
    location: 'San Francisco, CA',
    services: ['Elderly Care', 'Nursing'],
    price: 25,
    available: true,
    verified: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Experienced caregiver with a passion for helping seniors live their best lives. CPR certified and fluent in Spanish.',
    gallery: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    ],
    reviewsList: [
      { name: 'Priya Patel', rating: 5, text: 'Sarah is amazing with my grandmother!' },
      { name: 'Michael Chen', rating: 4.5, text: 'Very professional and caring.' },
    ],
    employmentType: 'Full-Time',
    gender: 'Female',
    languages: ['English', 'Spanish'],
    specialty: 'Elderly Care',
    certifications: ['CPR Certified', 'First Aid Certified'],
    specialties: ['Elderly Care', 'Nursing'],
    email: 'olivia.smith@example.com',
    phone: '+1-555-123-4567',
  },
  // ...add more providers as needed
];

export default function ProviderDetailScreen({ route, navigation }: any) {
  // In a real app, get id from route.params and fetch provider
  const provider = providers[0];
  const { isFavorite, toggleFavorite } = useFavorites();

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [confirmed, setConfirmed] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState(provider.reviewsList);
  const [paymentModal, setPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const openPicker = (pickerMode: 'date' | 'time') => {
    setMode(pickerMode);
    setShowPicker(true);
  };

  const handleBook = () => {
    setModalVisible(false);
    setPaymentModal(true);
  };

  const handlePay = () => {
    setPaymentModal(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCVC('');
    Alert.alert('Payment Successful', 'Your booking has been confirmed!');
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0 || !reviewText.trim()) {
      Alert.alert('Please provide a rating and review text.');
      return;
    }
    setReviews([
      { name: 'You', rating: reviewRating, text: reviewText },
      ...reviews,
    ]);
    setReviewModal(false);
    setReviewText('');
    setReviewRating(0);
    Alert.alert('Thank you!', 'Your review has been submitted.');
  };

  const handleContact = () => {
    if (provider.email) {
      Linking.openURL(`mailto:${provider.email}`);
    } else if (provider.phone) {
      Linking.openURL(`tel:${provider.phone}`);
    } else {
      Alert.alert('No contact info available');
    }
  };
  const handleShare = async () => {
    if (Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(undefined, { dialogTitle: `Share ${provider.name}'s profile` });
    } else {
      Alert.alert('Sharing not available');
    }
  };

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView style={{ backgroundColor }} contentContainerStyle={{ paddingBottom: 32 }}>
        <TouchableOpacity onPress={() => toggleFavorite(provider.id)} style={{ position: 'absolute', top: 32, right: 24, zIndex: 10 }}>
          <Ionicons name={isFavorite(provider.id) ? 'heart' : 'heart-outline'} size={32} color="#F44336" />
        </TouchableOpacity>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ height: 220, marginBottom: 16 }}>
          {provider.gallery && provider.gallery.length > 0 ? provider.gallery.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={{ width: 340, height: 220, borderRadius: 16, marginRight: 12 }} />
          )) : (
            <Image source={{ uri: provider.image }} style={{ width: 340, height: 220, borderRadius: 16 }} />
          )}
        </ScrollView>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.providerName, { color: textColor }]}>{provider.name}</Text>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={{ marginLeft: 4 }} />
            </View>
            {/* Remove styles.rating and styles.location if not defined */}
            <Text style={{ color: textColor, fontSize: 15 }}>{provider.specialty}</Text>
            <Text style={{ color: textColor, fontSize: 14 }}>{provider.location}</Text>
          </View>
          {/* ...rest of code... */}
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 8, flexWrap: 'wrap' }}>
          {provider.certifications?.map((cert, idx) => (
            <View key={idx} style={{ backgroundColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8, marginBottom: 6 }}>
                              <Text style={{ color: '#5B9BD5', fontWeight: '600' }}>{cert}</Text>
            </View>
          ))}
          {provider.specialties?.map((spec, idx) => (
            <View key={idx} style={{ backgroundColor: '#F1F1FA', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8, marginBottom: 6 }}>
              <Text style={{ color: '#222', fontWeight: '600' }}>{spec}</Text>
            </View>
          ))}
          {provider.languages?.map((lang, idx) => (
            <View key={idx} style={{ backgroundColor: '#FFF3E0', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8, marginBottom: 6 }}>
              <Text style={{ color: '#FF9800', fontWeight: '600' }}>{lang}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                          <TouchableOpacity style={{ backgroundColor: '#5B9BD5', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, marginRight: 12 }} onPress={handleContact}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Contact Provider</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#F1F1FA', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20 }} onPress={handleShare}>
                          <Text style={{ color: '#5B9BD5', fontWeight: '600', fontSize: 16 }}>Share Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{provider.rating} ({provider.reviews})</Text>
          <Ionicons name="location-outline" size={16} color="#888" style={{ marginLeft: 8 }} />
          <Text style={styles.location}>{provider.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
                            <Ionicons name="briefcase-outline" size={18} color="#5B9BD5" />
            <Text style={styles.infoLabel}>{provider.employmentType}</Text>
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="person-outline" size={18} color="#6C63FF" />
            <Text style={styles.infoLabel}>{provider.gender}</Text>
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="language-outline" size={18} color="#6C63FF" />
            <Text style={styles.infoLabel}>{provider.languages.join(', ')}</Text>
          </View>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${provider.price}/hr</Text>
          <Text style={[styles.availability, { color: provider.available ? '#4CAF50' : '#F44336' }]}> 
            {provider.available ? 'Available Now' : 'Unavailable'}
          </Text>
        </View>
        <Text style={styles.bio}>{provider.bio}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {provider.services.map(service => (
              <View key={service} style={styles.tag}>
                <Text style={styles.tagText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            {provider.gallery.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.galleryImg} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity style={styles.leaveReviewBtn} onPress={() => setReviewModal(true)}>
              <Ionicons name="create-outline" size={18} color="#6C63FF" />
              <Text style={styles.leaveReviewText}>Leave a Review</Text>
            </TouchableOpacity>
          </View>
          {reviews.map((review, idx) => (
            <View key={idx} style={styles.reviewBox}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.reviewRating}>{review.rating}</Text>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingBookBtn} onPress={() => setModalVisible(true)} activeOpacity={0.9}>
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
      {/* Booking Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {confirmed ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#222', marginTop: 12 }}>Booking Confirmed!</Text>
              </View>
            ) : (
              <>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 18 }}>Book {provider.name}</Text>
                <TouchableOpacity style={styles.pickerBtn} onPress={() => openPicker('date')}>
                  <Ionicons name="calendar-outline" size={20} color="#6C63FF" />
                  <Text style={styles.pickerBtnText}>Select Date: {date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pickerBtn} onPress={() => openPicker('time')}>
                  <Ionicons name="time-outline" size={20} color="#6C63FF" />
                  <Text style={styles.pickerBtnText}>Select Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                  />
                )}
                <TouchableOpacity style={styles.confirmBtn} onPress={handleBook}>
                  <Text style={styles.confirmBtnText}>Confirm & Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      {/* Payment Modal */}
      <Modal visible={paymentModal} animationType="slide" transparent onRequestClose={() => setPaymentModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardColor }]}> 
            <Text style={[styles.modalTitle, { color: textColor }]}>Payment</Text>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: cardColor }]}
              placeholder="Card Number"
              placeholderTextColor="#888"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              maxLength={16}
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TextInput
                style={[styles.input, { flex: 1, color: textColor, borderColor: cardColor }]}
                placeholder="MM/YY"
                placeholderTextColor="#888"
                value={cardExpiry}
                onChangeText={setCardExpiry}
                maxLength={5}
              />
              <TextInput
                style={[styles.input, { flex: 1, color: textColor, borderColor: cardColor }]}
                placeholder="CVC"
                placeholderTextColor="#888"
                value={cardCVC}
                onChangeText={setCardCVC}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
            <TouchableOpacity style={styles.confirmBtn} onPress={handlePay}>
              <Text style={styles.confirmBtnText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setPaymentModal(false)}>
              <Text style={{ color: '#007AFF', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Review Modal */}
      <Modal
        visible={reviewModal}
        animationType="slide"
        transparent
        onRequestClose={() => setReviewModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 18 }}>Leave a Review</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                  <Ionicons
                    name={reviewRating >= star ? 'star' : 'star-outline'}
                    size={32}
                    color={reviewRating >= star ? '#FFD700' : '#bbb'}
                    style={{ marginHorizontal: 2 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write your review..."
              placeholderTextColor="#888"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmitReview}>
              <Text style={styles.confirmBtnText}>Submit Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setReviewModal(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 4,
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
    color: '#222',
  },
  availability: {
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 8,
  },
  bio: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  tag: {
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  galleryImg: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  reviewBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  reviewRating: {
    fontSize: 14,
    color: '#222',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
  },
  bookBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
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
    minHeight: 320,
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1FA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  pickerBtnText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  confirmBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  cancelBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
  cancelBtnText: {
    color: '#888',
    fontWeight: '500',
    fontSize: 16,
  },
  floatingBookBtn: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  leaveReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  leaveReviewText: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 6,
  },
  reviewInput: {
    backgroundColor: '#F1F1FA',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#222',
    marginBottom: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
  },
  closeModalBtn: {
    marginTop: 10,
  },
  providerName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
}); 