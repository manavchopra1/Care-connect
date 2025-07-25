import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FavoritesProvider } from '../components/FavoritesContext';
import { NotificationsProvider } from '../components/NotificationsContext';
import LoginScreen from './login';

export default function RootLayout() {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Pass a navigation prop to LoginScreen to allow login
  if (!isLoggedIn) {
    return (
      <LoginScreen navigation={{ replace: () => setIsLoggedIn(true) }} />
    );
  }

  return (
    <NotificationsProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FavoritesProvider>
    </NotificationsProvider>
  );
}
