import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useFavorites } from '../../components/FavoritesContext';

const { width } = Dimensions.get('window');

// Mock provider data
const provider = {
  id: 1,
  name: 'Dr. Sarah Johnson',
  image: 'https://randomuser.me/api/portraits/women/44.jpg',
  specialty: 'Registered Nurse',
  rating: 4.8,
  reviews: 127,
  price: 45,
  location: 'New York, NY',
  experience: '8 years',
  bio: 'Experienced registered nurse specializing in home healthcare, post-surgery care, and elderly assistance. Certified in wound care and medication management.',
  employmentType: 'Full-Time',
  gender: 'Female',
  languages: ['English', 'Spanish'],
  serviceType: 'Home Healthcare',
  certifications: ['RN License', 'Wound Care Certified', 'CPR Certified'],
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  gallery: [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
  ],
  reviewsList: [
    { id: 1, name: 'Maria G.', rating: 5, text: 'Excellent care for my mother. Very professional and caring.', date: '2 days ago' },
    { id: 2, name: 'John D.', rating: 5, text: 'Sarah is amazing! She helped my dad recover after surgery.', date: '1 week ago' },
    { id: 3, name: 'Lisa M.', rating: 4, text: 'Great experience. Very knowledgeable and patient.', date: '2 weeks ago' },
  ],
  availability: 'Available Now',
  verified: true,
  responseTime: '< 2 hours',
  completionRate: '98%',
};

export default function ProviderDetailScreen({ route, navigation }: any) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [selectedImage, setSelectedImage] = useState(0);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const openPicker = (pickerMode: 'date' | 'time') => {
    if (pickerMode === 'date') {
      setShowDatePicker(true);
    } else {
      setShowTimePicker(true);
    }
  };

  const handleBook = () => {
    setModalVisible(false);
    setPaymentModal(true);
  };

  const handlePay = () => {
    setPaymentModal(false);
    Alert.alert('Booking Confirmed!', 'Your appointment has been scheduled successfully.');
  };

  const handleSubmitReview = () => {
    setReviewModal(false);
    setReviewText('');
    Alert.alert('Review Submitted!', 'Thank you for your feedback.');
  };

  const handleContact = () => {
    Linking.openURL(`tel:${provider.phone}`);
  };

  const handleShare = async () => {
    try {
      await Sharing.shareAsync('https://careconnect.app/provider/1', {
        mimeType: 'text/plain',
        dialogTitle: 'Share Provider Profile',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? 'star' : 'star-outline'}
        size={16}
        color={i < rating ? '#FFD700' : '#ccc'}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: provider.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={() => toggleFavorite(provider.id)}
            >
              <Ionicons 
                name={isFavorite(provider.id) ? 'heart' : 'heart-outline'} 
                size={24} 
                color={isFavorite(provider.id) ? '#FF6B6B' : 'white'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.nameRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.specialty}>{provider.specialty}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${provider.price}</Text>
              <Text style={styles.priceUnit}>/hr</Text>
            </View>
          </View>

          {/* Rating and Stats */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(provider.rating)}
              </View>
              <Text style={styles.ratingText}>{provider.rating}</Text>
              <Text style={styles.reviewsCount}>({provider.reviews} reviews)</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#5B9BD5" />
              <Text style={styles.statValue}>{provider.responseTime}</Text>
              <Text style={styles.statLabel}>Response</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#5B9BD5" />
              <Text style={styles.statValue}>{provider.completionRate}</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="briefcase-outline" size={20} color="#5B9BD5" />
              <Text style={styles.statValue}>{provider.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="calendar-outline" size={20} color="white" />
              <Text style={styles.primaryButtonText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleContact}>
              <Ionicons name="call-outline" size={20} color="#5B9BD5" />
              <Text style={styles.secondaryButtonText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color="#5B9BD5" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{provider.bio}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color="#5B9BD5" />
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{provider.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="person-outline" size={20} color="#5B9BD5" />
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{provider.gender}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="briefcase-outline" size={20} color="#5B9BD5" />
              <Text style={styles.detailLabel}>Employment</Text>
              <Text style={styles.detailValue}>{provider.employmentType}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="language-outline" size={20} color="#5B9BD5" />
              <Text style={styles.detailLabel}>Languages</Text>
              <Text style={styles.detailValue}>{provider.languages.join(', ')}</Text>
            </View>
          </View>
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          <View style={styles.certificationsContainer}>
            {provider.certifications.map((cert, idx) => (
              <View key={idx} style={styles.certificationTag}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.certificationText}>{cert}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
            {provider.gallery.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedImage(index)}>
                <Image source={{ uri: image }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity style={styles.leaveReviewButton} onPress={() => setReviewModal(true)}>
              <Ionicons name="create-outline" size={18} color="#5B9BD5" />
              <Text style={styles.leaveReviewText}>Leave Review</Text>
            </TouchableOpacity>
          </View>
          {provider.reviewsList.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Book Button */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text style={styles.floatingButtonText}>Book ${provider.price}/hr</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book {provider.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <TouchableOpacity style={styles.pickerButton} onPress={() => openPicker('date')}>
                <Ionicons name="calendar-outline" size={20} color="#5B9BD5" />
                <Text style={styles.pickerButtonText}>Select Date: {date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.pickerButton} onPress={() => openPicker('time')}>
                <Ionicons name="time-outline" size={20} color="#5B9BD5" />
                <Text style={styles.pickerButtonText}>Select Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </TouchableOpacity>

              <View style={styles.bookingSummary}>
                <Text style={styles.summaryTitle}>Booking Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Provider:</Text>
                  <Text style={styles.summaryValue}>{provider.name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Rate:</Text>
                  <Text style={styles.summaryValue}>${provider.price}/hour</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Date:</Text>
                  <Text style={styles.summaryValue}>{date.toLocaleDateString()}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Time:</Text>
                  <Text style={styles.summaryValue}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
                <Text style={styles.bookButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Payment Modal */}
      <Modal visible={paymentModal} animationType="slide" transparent onRequestClose={() => setPaymentModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Payment</Text>
              <TouchableOpacity onPress={() => setPaymentModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.paymentText}>This is a mock payment flow. In a real app, this would integrate with a payment processor.</Text>
              <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                <Text style={styles.payButtonText}>Pay ${provider.price}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal visible={reviewModal} animationType="slide" transparent onRequestClose={() => setReviewModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Leave a Review</Text>
              <TouchableOpacity onPress={() => setReviewModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.ratingSelector}>
                {Array.from({ length: 5 }, (_, i) => (
                  <TouchableOpacity key={i} onPress={() => setReviewRating(i + 1)}>
                    <Ionicons
                      name={i < reviewRating ? 'star' : 'star-outline'}
                      size={32}
                      color={i < reviewRating ? '#FFD700' : '#ccc'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              
              <TextInput
                style={styles.reviewInput}
                placeholder="Write your review..."
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={4}
              />
              
              <TouchableOpacity style={styles.submitReviewButton} onPress={handleSubmitReview}>
                <Text style={styles.submitReviewButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Date/Time Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  nameContainer: {
    flex: 1,
  },
  providerName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5B9BD5',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#5B9BD5',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    color: '#5B9BD5',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    width: (width - 60) / 2,
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  certificationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  certificationText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 6,
  },
  galleryContainer: {
    marginBottom: 8,
  },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leaveReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  leaveReviewText: {
    fontSize: 14,
    color: '#5B9BD5',
    fontWeight: '500',
    marginLeft: 6,
  },
  reviewCard: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  floatingButton: {
    backgroundColor: '#5B9BD5',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  modalBody: {
    flex: 1,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 12,
  },
  bookingSummary: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  bookButton: {
    backgroundColor: '#5B9BD5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#5B9BD5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  ratingSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitReviewButton: {
    backgroundColor: '#5B9BD5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitReviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 