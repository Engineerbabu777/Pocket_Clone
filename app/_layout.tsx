import { COLORS } from '@/utils/Colors';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function RootLayout() {
  return <NativeTabs tintColor={COLORS.textDark}>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>;
}
