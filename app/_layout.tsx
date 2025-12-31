


import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const Layout = () => {
    return (
        <KeyboardProvider>
            <ClerkProvider tokenCache={tokenCache}>
                <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                </Stack>
            </ClerkProvider>

        </KeyboardProvider>

    )
}

export default Layout