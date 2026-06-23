import { posthog } from "@/lib/posthog";
import { createVideoClient } from "@/lib/stream";
import { useLanguageStore } from "@/store/languageStore";
import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useFonts } from "expo-font";
import {
  Stack,
  useGlobalSearchParams,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useRef, useState } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

/**
 * Mounts StreamVideo for the whole authenticated session so every descendant
 * (including lesson screens) can call useStreamVideoClient(). The client is
 * created once per user login and torn down on sign-out, which is the pattern
 * recommended by the Stream SDK to avoid WebSocket restarts.
 */
function StreamVideoWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const streamUser = {
      id: user.id,
      name: user.fullName ?? user.firstName ?? user.id,
      image: user.imageUrl,
    };

    const client = createVideoClient(streamUser);
    setVideoClient(client);

    return () => {
      client.disconnectUser().catch((err) => console.error("[StreamVideo] disconnect error", err));
      setVideoClient(undefined);
    };
  }, [user?.id, isLoaded]);

  if (!videoClient) return <>{children}</>;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  useEffect(() => {
    if (!isLoaded || !_hasHydrated) return;

    const inAuthGroup = segments[0] === "(auth)";
    const onOnboarding = segments[0] === "onboarding";
    const onLanguageSelection = segments[0] === "language-selection";

    if (!isSignedIn && !inAuthGroup && !onOnboarding) {
      router.replace("/onboarding");
    } else if (isSignedIn && (inAuthGroup || onOnboarding)) {
      if (!selectedLanguage) {
        router.replace("/language-selection");
      } else {
        router.replace("/(tabs)");
      }
    } else if (isSignedIn && !selectedLanguage && !onLanguageSelection) {
      router.replace("/language-selection");
    }
  }, [isSignedIn, isLoaded, segments, selectedLanguage, _hasHydrated]);

  return (
    <StreamVideoWrapper>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="language-selection"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="lesson/[id]" options={{ headerShown: false }} />
      </Stack>
    </StreamVideoWrapper>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
        propsToCapture: ["testID"],
      }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <RootLayoutNav />
      </ClerkProvider>
    </PostHogProvider>
  );
}
