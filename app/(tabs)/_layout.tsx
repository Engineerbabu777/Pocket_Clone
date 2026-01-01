import { COLORS } from '@/utils/Colors';
import { Platform } from 'react-native';

// Import components for both platforms
import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

// Import an icon set for the Android version
import Ionicons from '@expo/vector-icons/Ionicons';

// Component for iOS using NativeTabs
function IosTabsLayout() {
  return (
    <NativeTabs blurEffect="systemChromeMaterial" tintColor={COLORS.textDark}>
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        {/* The `drawable` prop is ignored on iOS, so it's safe to leave or remove */}
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

// Component for Android using standard Tabs
function AndroidTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Optional: hide headers on tab screens
        tabBarActiveTintColor: COLORS.textDark,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f5f5f5', // A light background color for the tab bar
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

// The main layout component conditionally renders the correct layout
export default function RootLayout() {
  if (Platform.OS === 'ios') {
    return <IosTabsLayout />;
  } else {
    return <AndroidTabsLayout />;
  }
}