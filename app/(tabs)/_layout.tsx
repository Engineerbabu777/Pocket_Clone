import { COLORS } from '@/utils/Colors';
import { Platform } from 'react-native';

import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

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

export default function RootLayout() {
  if (Platform.OS === 'ios') {
    return <IosTabsLayout />;
  } else {
    return <AndroidTabsLayout />;
  }
}