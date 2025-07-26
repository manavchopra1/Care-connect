import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

const categories = [
  {
    id: 1,
    title: 'Full-Time Nurse / Caregiver',
    description: 'For bedridden, post-surgery, or elderly patients. Includes medication, hygiene, mobility help.',
    icon: 'medical',
    color: '#E74C3C',
    providers: 38,
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Full-Time Male Attendant / Female Attendant',
    description: 'General caregiving — companionship, toilet help, feeding.',
    icon: 'people',
    color: '#3498DB',
    providers: 42,
    rating: 4.7,
  },
  {
    id: 3,
    title: 'Live-In Caregiver',
    description: '24/7 on-site caregiver with accommodation.',
    icon: 'home',
    color: '#2ECC71',
    providers: 25,
    rating: 4.8,
  },
  {
    id: 4,
    title: 'Physiotherapy at Home',
    description: 'Especially useful for post-surgery recovery, arthritis, or age-related mobility issues.',
    icon: 'fitness',
    color: '#4CAF50',
    providers: 45,
    rating: 4.8,
  },
  {
    id: 5,
    title: 'Doctor/Home Visit Consultations',
    description: 'General physicians or specialists who can visit patients at home.',
    icon: 'medical',
    color: '#2196F3',
    providers: 32,
    rating: 4.9,
  },
  {
    id: 6,
    title: 'Diagnostic Lab Tests at Home',
    description: 'Blood tests, ECG, urine tests — partner with local labs for sample collection.',
    icon: 'flask',
    color: '#FF9800',
    providers: 28,
    rating: 4.7,
  },
  {
    id: 7,
    title: 'Medication Delivery and Reminders',
    description: 'Timely medicine delivery and app-based alerts for taking medications.',
    icon: 'medical-outline',
    color: '#9C27B0',
    providers: 15,
    rating: 4.6,
  },
  {
    id: 8,
    title: 'Palliative Care Expert',
    description: 'For terminally ill patients, focused on pain and emotional care.',
    icon: 'heart',
    color: '#8E44AD',
    providers: 18,
    rating: 4.9,
  },
  {
    id: 9,
    title: 'Dementia / Alzheimer\'s Specialist Caregiver',
    description: 'Trained in mental health and behavioral support.',
    icon: 'medical',
    color: '#F39C12',
    providers: 22,
    rating: 4.8,
  },
  {
    id: 10,
    title: 'Child Care Nanny / Full-Time Aaya',
    description: 'Infants and toddlers — diapering, feeding, playing, etc.',
    icon: 'people',
    color: '#E67E22',
    providers: 35,
    rating: 4.7,
  },
  {
    id: 11,
    title: 'Postpartum Mother & Baby Care (Japa Maid)',
    description: 'Traditional Indian support for recovery & newborn care.',
    icon: 'female',
    color: '#E91E63',
    providers: 28,
    rating: 4.8,
  },
  {
    id: 12,
    title: 'Mental Health Services',
    description: 'Trained companions, therapists, or even video calls for mental wellness.',
    icon: 'heart',
    color: '#E91E63',
    providers: 23,
    rating: 4.8,
  },
  {
    id: 13,
    title: 'Religious and Spiritual Support',
    description: 'Virtual or home visits by priests, access to online satsangs or poojas.',
    icon: 'sparkles',
    color: '#FFC107',
    providers: 12,
    rating: 4.5,
  },
  {
    id: 14,
    title: 'Pet Care Assistance',
    description: 'For elderly pet owners — feeding, walking, vet visits, grooming, etc.',
    icon: 'paw',
    color: '#795548',
    providers: 18,
    rating: 4.7,
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: cardColor }]}
      onPress={() => router.push(`/provider/${item.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.categoryHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon} size={28} color={item.color} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryTitle, { color: textColor }]}>{item.title}</Text>
          <Text style={styles.categoryDescription}>{item.description}</Text>
        </View>
      </View>
      
      <View style={styles.categoryStats}>
        <View style={styles.statItem}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.statText}>{item.providers} providers</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.statText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Categories List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: textColor }]}>Service Categories</Text>
            <Text style={styles.headerSubtitle}>Choose from our comprehensive range of home healthcare services</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  listContainer: {
    paddingBottom: 100,
  },
  categoryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
});
