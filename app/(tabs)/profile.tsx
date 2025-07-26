import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Animated, Image, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

const defaultAvatar = 'https://randomuser.me/api/portraits/women/65.jpg';

const userData = {
  name: 'Emma Wilson',
  email: 'emma.wilson@example.com',
  bookings: 12,
  favorites: 5,
  reviews: 8,
};

// Fix: add type annotation to settings to avoid linter error
const settings: any[] = [
  { icon: 'settings-outline', label: 'Account Settings' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'shield-checkmark-outline', label: 'Privacy & Security' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

const mockBookings = [
  {
    id: '1',
    provider: 'Dr. Olivia Smith',
    date: '2024-06-10',
    time: '10:00 AM',
    status: 'Upcoming',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    provider: 'Dr. Ethan Brown',
    date: '2024-05-28',
    time: '2:30 PM',
    status: 'Completed',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    provider: 'Dr. Ava Lee',
    date: '2024-05-15',
    time: '11:15 AM',
    status: 'Completed',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState(userData.name);
  const [editEmail, setEditEmail] = useState(userData.email);
  // Add state for settings toggles and modals
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  // Add state for modals
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  // Add state for Account Settings modal
  const [accountName, setAccountName] = useState(editName);
  const [accountEmail, setAccountEmail] = useState(editEmail);
  const [accountPhone, setAccountPhone] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const [accountCity, setAccountCity] = useState('');
  const [accountState, setAccountState] = useState('');
  const [accountZip, setAccountZip] = useState('');
  const [showDeliveryAddresses, setShowDeliveryAddresses] = useState(false);
  // Add state for Payment Methods modal
  const [cards, setCards] = useState([
    { id: '1', brand: 'Visa', last4: '4242', exp: '12/26' },
    { id: '2', brand: 'Mastercard', last4: '1234', exp: '09/25' },
  ]);
  const [newCard, setNewCard] = useState({ number: '', exp: '', cvc: '' });
  // Add state for Notifications modal
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant photo library access to change your avatar.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

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



  const mockBookings = [
    { id: '1', provider: 'Dr. Sarah Johnson', date: 'Dec 15, 2024', time: '10:00 AM', status: 'Completed', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face', service: 'Home Care' },
    { id: '2', provider: 'Mike Chen', date: 'Dec 18, 2024', time: '2:30 PM', status: 'Upcoming', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', service: 'Elderly Care' },
    { id: '3', provider: 'Lisa Rodriguez', date: 'Dec 20, 2024', time: '9:00 AM', status: 'Upcoming', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', service: 'Child Care' },
  ];

  const settings = [
    {
      label: 'Account Settings',
      icon: 'person-outline' as const,
      onPress: () => setShowAccountSettings(true)
    },
    {
      label: 'Payment Methods',
      icon: 'card-outline' as const,
      onPress: () => setShowPaymentMethods(true)
    },
    {
      label: 'Privacy & Security',
      icon: 'shield-outline' as const,
      onPress: () => Alert.alert('Privacy & Security', 'Privacy settings coming soon')
    },
    {
      label: 'Notifications',
      icon: 'notifications-outline' as const,
      onPress: () => setShowNotificationsModal(true)
    },
    {
      label: 'Help & Support',
      icon: 'help-circle-outline' as const,
      onPress: () => Alert.alert('Help & Support', 'Help center coming soon')
    },
    {
      label: 'Change Password',
      icon: 'lock-closed-outline' as const,
      onPress: () => setShowChangePassword(true)
    },
    {
      label: 'Language',
      icon: 'language-outline' as const,
      onPress: () => Alert.alert('Language', 'Language settings coming soon')
    },
    {
      label: 'About',
      icon: 'information-circle-outline' as const,
      onPress: () => Alert.alert('About', 'Care Connect v1.0.0')
    },
    {
      label: 'Terms of Service',
      icon: 'document-text-outline' as const,
      onPress: () => Alert.alert('Terms of Service', 'Terms coming soon')
    },
    {
      label: 'Privacy Policy',
      icon: 'shield-checkmark-outline' as const,
      onPress: () => Alert.alert('Privacy Policy', 'Privacy policy coming soon')
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: cardColor }]}>
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={[styles.avatarWrapper, Platform.OS === 'ios' && { marginTop: 32 }]}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.cameraIconBox}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <Text style={[styles.userName, { color: textColor }]}>{editName}</Text>
        <Text style={[styles.userEmail, { color: '#888' }]}>{editEmail}</Text>
        
        <TouchableOpacity style={styles.editButton} onPress={() => setEditModal(true)}>
          <Ionicons name="pencil" size={16} color="#5B9BD5" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={[styles.statsContainer, { backgroundColor: cardColor }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: textColor }]}>{userData.bookings}</Text>
          <Text style={[styles.statLabel, { color: '#888' }]}>Bookings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: textColor }]}>{userData.favorites}</Text>
          <Text style={[styles.statLabel, { color: '#888' }]}>Favorites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: textColor }]}>{userData.reviews}</Text>
          <Text style={[styles.statLabel, { color: '#888' }]}>Reviews</Text>
        </View>
      </View>

      {/* Booking History - Reduced spacing */}
      <View style={[styles.section, { backgroundColor: cardColor, marginTop: 16 }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Recent Bookings</Text>
        {mockBookings.slice(0, 3).map((booking, index) => (
          <View key={index} style={styles.bookingItem}>
            <View style={styles.bookingInfo}>
              <Text style={[styles.bookingProviderNew, { color: textColor }]}>{booking.provider}</Text>
              <Text style={[styles.bookingDateNew, { color: '#888' }]}>{booking.date}</Text>
              <Text style={[styles.bookingServiceNew, { color: '#888' }]}>{booking.service}</Text>
            </View>
            <View style={[styles.bookingStatusNew, { backgroundColor: booking.status === 'Completed' ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.bookingStatusTextNew}>{booking.status}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Bookings</Text>
          <Ionicons name="chevron-forward" size={16} color="#5B9BD5" />
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <View style={[styles.settingsList, { backgroundColor: cardColor, marginTop: 16 }]}>
        {settings.map((item, idx) => (
          <TouchableOpacity key={item.label} style={styles.settingItem} onPress={item.onPress}>
            <View style={styles.settingIconBox}>
              <Ionicons name={item.icon} size={22} color="#5B9BD5" />
            </View>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button - Always visible at bottom */}
      <View style={{ marginTop: 24, marginBottom: 32 }}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setShowDeleteModal(true)}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutTextNew}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Change Password Modal */}
      <Modal visible={showChangePassword} transparent animationType="slide" onRequestClose={() => setShowChangePassword(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.simpleModalContent}>
            {/* Header */}
            <View style={styles.simpleModalHeader}>
              <TouchableOpacity onPress={() => setShowChangePassword(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.simpleModalTitle}>Change Password</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Content */}
            <View style={styles.simpleModalBody}>
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Password Requirements</Text>
                <Text style={styles.passwordRequirements}>
                  • At least 8 characters long{'\n'}
                  • Include uppercase and lowercase letters{'\n'}
                  • Include at least one number{'\n'}
                  • Include at least one special character
                </Text>
              </View>

              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Current Password</Text>
                <TextInput 
                  style={styles.simpleInput} 
                  placeholder="Enter your current password" 
                  secureTextEntry 
                  value={current} 
                  onChangeText={setCurrent} 
                />
              </View>

              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>New Password</Text>
                <TextInput 
                  style={styles.simpleInput} 
                  placeholder="Enter your new password" 
                  secureTextEntry 
                  value={next} 
                  onChangeText={setNext} 
                />
              </View>

              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Confirm New Password</Text>
                <TextInput 
                  style={styles.simpleInput} 
                  placeholder="Confirm your new password" 
                  secureTextEntry 
                  value={confirm} 
                  onChangeText={setConfirm} 
                />
              </View>

              <TouchableOpacity 
                style={styles.simpleSaveButton} 
                onPress={() => {
                  if (!current || !next || !confirm) { 
                    Alert.alert('Please fill all fields'); 
                    return; 
                  }
                  if (next !== confirm) { 
                    Alert.alert('Passwords do not match'); 
                    return; 
                  }
                  if (next.length < 8) {
                    Alert.alert('Password must be at least 8 characters long');
                    return;
                  }
                  setShowChangePassword(false); 
                  setCurrent(''); 
                  setNext(''); 
                  setConfirm(''); 
                  Alert.alert('Success', 'Password changed successfully!');
                }}
              >
                <Text style={styles.simpleSaveButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Delete Account Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade" onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalDesc}>This action cannot be undone. Are you sure?</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: '#F44336', flex: 1, marginRight: 8 }]} onPress={() => { setShowDeleteModal(false); Alert.alert('Account deleted'); }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cancelBtn, { flex: 1, marginLeft: 8 }]} onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Account Settings Modal - Simplified */}
      <Modal visible={showAccountSettings} transparent animationType="slide" onRequestClose={() => setShowAccountSettings(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.simpleModalContent}>
            {/* Header */}
            <View style={styles.simpleModalHeader}>
              <TouchableOpacity onPress={() => setShowAccountSettings(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.simpleModalTitle}>Account Settings</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Content */}
            <View style={styles.simpleModalBody}>
              {/* Personal Information */}
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Personal Information</Text>
                <TextInput 
                  style={styles.simpleInput} 
                  value={accountName.split(' ')[0] || ''} 
                  onChangeText={(text) => setAccountName(text + ' ' + (accountName.split(' ')[1] || ''))}
                  placeholder="First Name"
                />
                <TextInput 
                  style={styles.simpleInput} 
                  value={accountName.split(' ')[1] || ''} 
                  onChangeText={(text) => setAccountName((accountName.split(' ')[0] || '') + ' ' + text)}
                  placeholder="Last Name"
                />
                <TextInput 
                  style={styles.simpleInput} 
                  value={accountEmail} 
                  onChangeText={setAccountEmail}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput 
                  style={styles.simpleInput} 
                  value={accountPhone} 
                  onChangeText={setAccountPhone}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Address Information */}
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Address Information</Text>
                <TextInput 
                  style={styles.simpleInput} 
                  value={accountAddress} 
                  onChangeText={setAccountAddress}
                  placeholder="Street Address"
                />
                <TextInput 
                  style={styles.simpleInput} 
                  value={accountCity} 
                  onChangeText={setAccountCity}
                  placeholder="City"
                />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TextInput 
                    style={[styles.simpleInput, { flex: 1 }]} 
                    value={accountState} 
                    onChangeText={setAccountState}
                    placeholder="State"
                  />
                  <TextInput 
                    style={[styles.simpleInput, { flex: 1 }]} 
                    value={accountZip} 
                    onChangeText={setAccountZip}
                    placeholder="ZIP Code"
                    keyboardType="number-pad"
                  />
                </View>
              </View>



              {/* Save Button */}
              <TouchableOpacity 
                style={styles.simpleSaveButton} 
                onPress={() => { 
                  setEditName(accountName); 
                  setEditEmail(accountEmail); 
                  setShowAccountSettings(false); 
                  Alert.alert('Success', 'Account settings updated successfully');
                }}
              >
                <Text style={styles.simpleSaveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delivery Addresses Modal */}
      <Modal visible={showDeliveryAddresses} transparent animationType="slide" onRequestClose={() => setShowDeliveryAddresses(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.simpleModalContent}>
            {/* Header */}
            <View style={styles.simpleModalHeader}>
              <TouchableOpacity onPress={() => setShowDeliveryAddresses(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.simpleModalTitle}>Delivery Addresses</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Content */}
            <View style={styles.simpleModalBody}>
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Saved Addresses</Text>
                
                {/* Default Address */}
                <View style={styles.addressCard}>
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressLabel}>Default Address</Text>
                    <Text style={styles.addressText}>123 Main Street</Text>
                    <Text style={styles.addressText}>Apt 4B, New York, NY 10001</Text>
                  </View>
                  <TouchableOpacity style={styles.editAddressButton}>
                    <Ionicons name="pencil" size={16} color="#5B9BD5" />
                  </TouchableOpacity>
                </View>

                {/* Add New Address Button */}
                <TouchableOpacity style={styles.addAddressButton}>
                  <Ionicons name="add" size={20} color="#5B9BD5" />
                  <Text style={styles.addAddressText}>Add New Address</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showPaymentMethods} transparent animationType="slide" onRequestClose={() => setShowPaymentMethods(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.simpleModalContent}>
            {/* Header */}
            <View style={styles.simpleModalHeader}>
              <TouchableOpacity onPress={() => setShowPaymentMethods(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.simpleModalTitle}>Payment Methods</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Content */}
            <ScrollView style={styles.simpleModalBody} showsVerticalScrollIndicator={false}>
              {/* Add New Card - Moved to Top */}
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Add New Card</Text>
                <TextInput 
                  style={styles.simpleInput} 
                  value={newCard.number} 
                  onChangeText={v => setNewCard({ ...newCard, number: v })} 
                  placeholder="Card Number" 
                  keyboardType="number-pad" 
                  maxLength={16} 
                />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TextInput 
                    style={[styles.simpleInput, { flex: 1 }]} 
                    value={newCard.exp} 
                    onChangeText={v => setNewCard({ ...newCard, exp: v })} 
                    placeholder="MM/YY" 
                    maxLength={5} 
                  />
                  <TextInput 
                    style={[styles.simpleInput, { flex: 1 }]} 
                    value={newCard.cvc} 
                    onChangeText={v => setNewCard({ ...newCard, cvc: v })} 
                    placeholder="CVC" 
                    keyboardType="number-pad" 
                    maxLength={4} 
                  />
                </View>
                <TouchableOpacity 
                  style={styles.simpleSaveButton} 
                  onPress={() => {
                    if (!newCard.number || !newCard.exp || !newCard.cvc) { 
                      Alert.alert('Please fill all card fields'); 
                      return; 
                    }
                    setCards([...cards, { id: Date.now().toString(), brand: 'Visa', last4: newCard.number.slice(-4), exp: newCard.exp }]);
                    setNewCard({ number: '', exp: '', cvc: '' });
                    Alert.alert('Success', 'Card added successfully');
                  }}
                >
                  <Text style={styles.simpleSaveButtonText}>Add Card</Text>
                </TouchableOpacity>
              </View>

              {/* Saved Cards */}
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Saved Cards</Text>
                {cards.map(card => (
                  <View key={card.id} style={styles.paymentMethodCard}>
                    <View style={styles.paymentMethodInfo}>
                      <Ionicons name={card.brand === 'Visa' ? 'card-outline' : 'card'} size={24} color="#5B9BD5" />
                      <Text style={styles.paymentMethodText}>{card.brand} •••• {card.last4}</Text>
                      <Text style={styles.paymentMethodExp}>Expires {card.exp}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setCards(cards.filter(c => c.id !== card.id))}>
                      <Ionicons name="trash-outline" size={20} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Digital Wallets */}
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Digital Wallets</Text>
                <TouchableOpacity style={styles.paymentMethodCard}>
                  <View style={styles.paymentMethodInfo}>
                    <Ionicons name="phone-portrait" size={24} color="#34A853" />
                    <Text style={styles.paymentMethodText}>Google Pay</Text>
                    <Text style={styles.paymentMethodSubtext}>Connected</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#34A853" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.paymentMethodCard}>
                  <View style={styles.paymentMethodInfo}>
                    <Ionicons name="logo-apple" size={24} color="#000" />
                    <Text style={styles.paymentMethodText}>Apple Pay</Text>
                    <Text style={styles.paymentMethodSubtext}>Connected</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#34A853" />
                </TouchableOpacity>
              </View>

              {/* Other Payment Methods */}
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Other Payment Methods</Text>
                <TouchableOpacity style={styles.paymentMethodCard}>
                  <View style={styles.paymentMethodInfo}>
                    <Ionicons name="logo-paypal" size={24} color="#0070BA" />
                    <Text style={styles.paymentMethodText}>PayPal</Text>
                    <Text style={styles.paymentMethodSubtext}>user@example.com</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#34A853" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.paymentMethodCard}>
                  <View style={styles.paymentMethodInfo}>
                    <Ionicons name="cash-outline" size={24} color="#FF9800" />
                    <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
                    <Text style={styles.paymentMethodSubtext}>Pay when you receive</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={showNotificationsModal} transparent animationType="slide" onRequestClose={() => setShowNotificationsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.simpleModalContent}>
            {/* Header */}
            <View style={styles.simpleModalHeader}>
              <TouchableOpacity onPress={() => setShowNotificationsModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.simpleModalTitle}>Notifications</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Content */}
            <ScrollView style={styles.simpleModalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Notification Preferences</Text>
                
                <View style={styles.notificationOption}>
                  <View style={styles.notificationInfo}>
                    <Ionicons name="notifications" size={24} color="#5B9BD5" />
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationText}>Push Notifications</Text>
                      <Text style={styles.notificationSubtext}>Receive alerts on your device</Text>
                    </View>
                  </View>
                  <Switch value={notifPush} onValueChange={setNotifPush} />
                </View>

                <View style={styles.notificationOption}>
                  <View style={styles.notificationInfo}>
                    <Ionicons name="mail" size={24} color="#34A853" />
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationText}>Email Notifications</Text>
                      <Text style={styles.notificationSubtext}>Get updates via email</Text>
                    </View>
                  </View>
                  <Switch value={notifEmail} onValueChange={setNotifEmail} />
                </View>

                <View style={styles.notificationOption}>
                  <View style={styles.notificationInfo}>
                    <Ionicons name="chatbubble" size={24} color="#FF9800" />
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationText}>SMS Notifications</Text>
                      <Text style={styles.notificationSubtext}>Receive text messages</Text>
                    </View>
                  </View>
                  <Switch value={notifSMS} onValueChange={setNotifSMS} />
                </View>
              </View>

              <View style={styles.simpleSection}>
                <Text style={styles.simpleSectionTitle}>Notification Types</Text>
                
                <View style={styles.notificationOption}>
                  <View style={styles.notificationInfo}>
                    <Ionicons name="calendar" size={24} color="#E91E63" />
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationText}>Booking Reminders</Text>
                      <Text style={styles.notificationSubtext}>Remind me before appointments</Text>
                    </View>
                  </View>
                  <Switch value={true} />
                </View>

                <View style={styles.notificationOption}>
                  <View style={styles.notificationInfo}>
                    <Ionicons name="star" size={24} color="#FFC107" />
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationText}>Provider Updates</Text>
                      <Text style={styles.notificationSubtext}>New providers in your area</Text>
                    </View>
                  </View>
                  <Switch value={true} />
                </View>

                <View style={styles.notificationOption}>
                  <View style={styles.notificationInfo}>
                    <Ionicons name="card" size={24} color="#9C27B0" />
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationText}>Payment Confirmations</Text>
                      <Text style={styles.notificationSubtext}>Transaction receipts</Text>
                    </View>
                  </View>
                  <Switch value={true} />
                </View>
              </View>

              <TouchableOpacity 
                style={styles.simpleSaveButton} 
                onPress={() => {
                  setShowNotificationsModal(false);
                  Alert.alert('Success', 'Notification settings updated');
                }}
              >
                <Text style={styles.simpleSaveButtonText}>Save Settings</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  centered: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIconBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  email: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
  },
  editBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 7,
    marginTop: 4,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1FA',
  },
  settingIconBox: {
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    padding: 7,
    marginRight: 14,
  },
  settingLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 8,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  bookingsSection: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  bookingAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  bookingProvider: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  bookingDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  bookingStatus: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 2,
  },
  bookingBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginLeft: 10,
  },
  bookingBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '95%',
    maxHeight: '85%',
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  modalDesc: {
    fontSize: 15,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
    marginTop: 10,
  },
  cancelBtnText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  profileHeader: {
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  editButtonText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabelNew: {
    fontSize: 14,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  section: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingProviderNew: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  bookingDateNew: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  bookingServiceNew: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  bookingStatusNew: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bookingStatusTextNew: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewAllText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  logoutTextNew: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  // New styles for Account Settings Modal
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 5,
  },
  settingsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  accountInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#F1F1FA',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginLeft: 10,
  },
  saveButtonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Simple Modal Styles
  simpleModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    margin: 20,
  },
  simpleModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  simpleModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  simpleModalBody: {
    padding: 20,
  },
  simpleSection: {
    marginBottom: 20,
  },
  simpleSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10,
  },
  simpleInput: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  simpleActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  simpleActionText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 10,
  },
  simpleSaveButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '100%',
    marginTop: 20,
  },
  simpleSaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Delivery Address Styles
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  editAddressButton: {
    padding: 8,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addAddressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Payment Method Styles
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  paymentMethodExp: {
    fontSize: 13,
    color: '#666',
  },
  paymentMethodSubtext: {
    fontSize: 13,
    color: '#666',
  },
  passwordRequirements: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
  },
  // Notification Styles
  notificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  notificationInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  notificationSubtext: {
    fontSize: 13,
    color: '#666',
  },
}); 