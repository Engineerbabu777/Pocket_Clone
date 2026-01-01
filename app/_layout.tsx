import migrations from '@/drizzle/migrations';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';


const DATABASE_NAME = 'pocket';

const RootNav = () => {

    const db = openDatabaseSync(DATABASE_NAME);
    useDrizzleStudio(db);


    const { isSignedIn } = useAuth();

    return (
        <Stack>
            <Stack.Protected guard={!isSignedIn}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen
                name="(modal)/success"
                options={{
                    presentation: 'formSheet',
                    sheetAllowedDetents: [0.5, 1],
                    sheetGrabberVisible: true,
                    title: '',
                    headerShadowVisible: false,
                    contentStyle: {
                        height: '100%',
                    },
                }}
            />

        </Stack>
    );
};

const RootLayout = () => {

    const expoDb = openDatabaseSync(DATABASE_NAME);
    const db = drizzle(expoDb);
    const { success, error } = useMigrations(db, migrations);

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