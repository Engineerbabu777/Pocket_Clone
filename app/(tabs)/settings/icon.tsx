import { COLORS } from '@/utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { getAppIcon, setAppIcon } from '@howincodes/expo-dynamic-app-icon';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IconOption {
  id: string;
  name: string;
  image: any;
  description?: string;
}

const ICON_OPTIONS: IconOption[] = [
  {
    id: 'mono',
    name: 'Monochrome',
    image: require('@/assets/images/icon-mono.png'),
  },
  {
    id: 'default',
    name: 'Classic',
    image: require('@/assets/images/icon.png'),
  },
  {
    id: 'dark',
    name: 'Dark',
    image: require('@/assets/images/icon-dark.png'),
  },
];

const AppIconPage = () => {
  const [selectedIcon, setSelectedIcon] = useState('default');

  useEffect(() => {
    const currentIcon = getAppIcon();
    setSelectedIcon(currentIcon);
  }, []);

  const handleIconChange = async (iconId: string) => {
    try {
      // Set the app icon (only works on iOS)
      await setAppIcon(iconId);
      setSelectedIcon(iconId);
    } catch (error) {
      console.error('Failed to change app icon:', error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'App Icon',
          headerBackTitle: 'Settings',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />

      <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
        {/* Alternative Icons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select your favorite icon</Text>
          {ICON_OPTIONS.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              style={[styles.iconRow, selectedIcon === icon.id && styles.selectedRow]}
              onPress={() => handleIconChange(icon.id)}>
              <View style={styles.iconContainer}>
                <Image source={icon.image} style={styles.iconImage} />
              </View>
              <Text style={styles.iconName}>{icon.name}</Text>
              {selectedIcon === icon.id && (
                <View style={styles.checkContainer}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedRow: {
    backgroundColor: '#E3F2FD',
  },
  iconContainer: {
    marginRight: 16,
  },
  iconImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  iconName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppIconPage;