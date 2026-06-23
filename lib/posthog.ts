import PostHog from "posthog-react-native";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.posthogProjectToken as
  | string
  | undefined;
const host = Constants.expoConfig?.extra?.posthogHost as string | undefined;
const isConfigured = !!apiKey && apiKey !== "phc_your_project_token_here";

if (!isConfigured && __DEV__) {
  console.warn(
    "PostHog: POSTHOG_PROJECT_TOKEN not set — analytics disabled."
  );
}

export const posthog = new PostHog(apiKey || "placeholder", {
  host,
  disabled: !isConfigured,
  captureAppLifecycleEvents: true,
  debug: __DEV__,
  flushAt: 20,
  flushInterval: 10000,
});
