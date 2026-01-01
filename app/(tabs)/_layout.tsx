import { COLORS } from '@/utils/Colors';
import { Platform } from 'react-native';

import { Tabs, useRouter } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Sentry from '@sentry/react-native';
import { useShareIntentContext } from 'expo-share-intent';
import { useEffect } from 'react';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

function IosTabsLayout() {
  return (
    <NativeTabs blurEffect="systemChromeMaterial" tintColor={COLORS.textDark}>
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="saves">
        <Label>Saves</Label>
        <Icon sf={{ default: 'heart', selected: 'heart.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function AndroidTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: COLORS.textDark,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f5f5f5', 
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saves"
        options={{
          title: 'Saves',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabRootLayout() {

   const { hasShareIntent, shareIntent, resetShareIntent, error } = useShareIntentContext();
  const router = useRouter();
  const user = useUser();


    useEffect(() => {
    if (hasShareIntent && shareIntent.type === 'weburl' && shareIntent.webUrl) {
      router.push(`/(modal)/add-url?intent=${encodeURIComponent(shareIntent?.webUrl ?? '')}`);
      resetShareIntent();
    }
  }, [hasShareIntent]);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_RC_APPLE_KEY! });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY! });
    }
  }, []);

  useEffect(() => {
    if (user && user.user) {
      Sentry.setUser({ email: user.user.emailAddresses[0].emailAddress, id: user.user.id });
      Purchases.logIn(user.user.id);
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  if (Platform.OS === 'ios') {
    return <IosTabsLayout />;
  } else {
    return <AndroidTabsLayout />;
  }
}