import migrations from '@/drizzle/migrations';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { isRunningInExpoGo } from 'expo';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: 'https://20b471e680646a1e8554173bb7d19110@o4510633964142593.ingest.us.sentry.io/4510633968599040',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: __DEV__,
});


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

      <Stack.Screen
        name="(modal)/add-url"
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

  const ref = useNavigationContainerRef();
  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (

    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <KeyboardProvider>
          <Suspense fallback={<ActivityIndicator />}>
            <SQLiteProvider
              databaseName={DATABASE_NAME}
              options={{ enableChangeListener: true }}
              useSuspense>
              <RootNav />
            </SQLiteProvider>
          </Suspense>
        </KeyboardProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Sentry.wrap(RootLayout);