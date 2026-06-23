import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/tw';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/languageStore';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const { clearSelectedLanguage } = useLanguageStore();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-1 items-center justify-center">
        <Text className="h2 text-foreground">Profile</Text>
        <Text className="body-md text-muted mt-2">Profile screen coming soon</Text>

        <TouchableOpacity
          onPress={() => router.push('/language-selection')}
          style={styles.button}
          activeOpacity={0.85}
        >
          <Text className="body-md font-poppins-semibold text-white">Change Language</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clearSelectedLanguage}
          style={[styles.button, styles.dangerButton]}
          activeOpacity={0.85}
        >
          <Text className="body-md font-poppins-semibold text-white">Clear Language</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, styles.mutedButton]}
          activeOpacity={0.85}
        >
          <Text className="body-md font-poppins-semibold text-white">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: '#6C4EF5',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  dangerButton: {
    backgroundColor: '#EF4444',
  },
  mutedButton: {
    backgroundColor: '#6B7280',
  },
});
