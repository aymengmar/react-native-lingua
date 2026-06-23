import { View } from 'react-native';
import { Text } from '@/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-1 items-center justify-center">
        <Text className="h2 text-foreground">Home</Text>
        <Text className="body-md text-muted mt-2">Home screen coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
