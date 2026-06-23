import { View } from 'react-native';
import { Text } from '@/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LearnScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-1 items-center justify-center">
        <Text className="h2 text-foreground">Learn</Text>
        <Text className="body-md text-muted mt-2">Lessons coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
