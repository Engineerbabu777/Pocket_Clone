import { Stack } from 'expo-router';

export default function SavesLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
</Stack>;
}
