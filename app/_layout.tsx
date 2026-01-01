import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';






const RootNav = () => {

  const { isSignedIn } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    
    </Stack>
  );
};

const RootLayout = () => {

  return (
  
      <ClerkProvider tokenCache={tokenCache}>
        <ClerkLoaded>
          <KeyboardProvider>
            <Suspense fallback={<ActivityIndicator />}>
           
                <RootNav />
            </Suspense>
          </KeyboardProvider>
        </ClerkLoaded>
      </ClerkProvider>
  );
};

export default RootLayout;