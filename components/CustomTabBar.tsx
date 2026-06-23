import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@/tw';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;
const CIRCLE_SIZE = 50;
const TAB_ROW_HEIGHT = 64;

type TabName = 'index' | 'learn' | 'ai-teacher' | 'chat' | 'profile';

interface TabConfig {
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const TAB_CONFIG: Record<TabName, TabConfig> = {
  index: { activeIcon: 'home', inactiveIcon: 'home-outline', label: 'Home' },
  learn: { activeIcon: 'book', inactiveIcon: 'book-outline', label: 'Learn' },
  'ai-teacher': {
    activeIcon: 'sparkles',
    inactiveIcon: 'sparkles-outline',
    label: 'AI Teacher',
  },
  chat: {
    activeIcon: 'chatbubble-ellipses',
    inactiveIcon: 'chatbubble-ellipses-outline',
    label: 'Chat',
  },
  profile: { activeIcon: 'person', inactiveIcon: 'person-outline', label: 'Profile' },
};

export function CustomTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const translateX = useSharedValue(state.index * TAB_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 200,
      easing: Easing.out(Easing.quad),
    });
  }, [state.index]);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.outerContainer}>
      {/* Tab row — fixed 64 px, circle + icons both live here */}
      <View style={styles.tabRow}>
        <Animated.View style={[styles.circle, circleAnimatedStyle]} />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name as TabName];
          if (!config) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={isFocused ? config.activeIcon : config.inactiveIcon}
                  size={22}
                  color={isFocused ? '#FFFFFF' : '#9CA3AF'}
                />
              </View>
              {!isFocused && <Text style={styles.label}>{config.label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Safe-area spacer — pushes content above the home indicator */}
      <View style={{ height: insets.bottom, backgroundColor: '#FFFFFF' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 10,
  },
  tabRow: {
    flexDirection: 'row',
    height: TAB_ROW_HEIGHT,
    alignItems: 'stretch',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#6C4EF5',
    top: (TAB_ROW_HEIGHT - CIRCLE_SIZE) / 2,
    left: TAB_WIDTH / 2 - CIRCLE_SIZE / 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    marginTop: -8,
  },
});
