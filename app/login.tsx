import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/partial-react-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.forgotBtn} onPress={() => setForgotModal(true)}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.replace('/') /* Replace with main app route */}>
        <Text style={styles.loginBtnText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or continue with</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Not implemented yet')}>
          <FontAwesome name="google" size={22} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Not implemented yet')}>
          <FontAwesome name="apple" size={22} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Not implemented yet')}>
          <FontAwesome name="facebook" size={22} color="#1877F3" />
        </TouchableOpacity>
      </View>
      <Modal visible={forgotModal} animationType="slide" transparent onRequestClose={() => setForgotModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            {resetSent ? (
              <Text style={{ marginVertical: 24, fontSize: 16 }}>A password reset link has been sent to {forgotEmail}.</Text>
            ) : (
              <>
                <TextInput style={styles.input} value={forgotEmail} onChangeText={setForgotEmail} placeholder="Enter your email" keyboardType="email-address" />
                <TouchableOpacity style={styles.confirmBtn} onPress={() => setResetSent(true)}>
                  <Text style={styles.confirmBtnText}>Send Reset Link</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => { setForgotModal(false); setResetSent(false); setForgotEmail(''); }}>
              <Text style={styles.cancelBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={signupModal} animationType="slide" transparent onRequestClose={() => setSignupModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Up</Text>
            {signupSuccess ? (
              <Text style={{ marginVertical: 24, fontSize: 16 }}>Account created! You can now sign in.</Text>
            ) : (
              <>
                <TextInput style={styles.input} value={signupName} onChangeText={setSignupName} placeholder="Name" />
                <TextInput style={styles.input} value={signupEmail} onChangeText={setSignupEmail} placeholder="Email" keyboardType="email-address" />
                <TextInput style={styles.input} value={signupPassword} onChangeText={setSignupPassword} placeholder="Password" secureTextEntry />
                <TouchableOpacity style={styles.confirmBtn} onPress={() => setSignupSuccess(true)}>
                  <Text style={styles.confirmBtnText}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => { setSignupModal(false); setSignupSuccess(false); setSignupName(''); setSignupEmail(''); setSignupPassword(''); }}>
              <Text style={styles.cancelBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setSignupModal(true)}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    color: '#6C63FF',
    fontWeight: '500',
    fontSize: 15,
  },
  loginBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  orText: {
    color: '#888',
    fontSize: 15,
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#888',
    fontSize: 15,
    marginRight: 4,
  },
  signupLink: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },
  confirmBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  cancelBtn: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  cancelBtnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 17,
  },
}); 