import Constants from "expo-constants";
import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

/** Shape of the user passed into the Stream Video client. */
interface VideoUserInput {
  id: string;
  name?: string;
  image?: string;
}

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY ?? "";

/**
 * Build the base URL for Expo Router API routes.
 *
 * - In development: the Metro / expo-serve dev server is the host. On the
 *   iOS Simulator and Android Emulator, `Constants.expoConfig.hostUri` is
 *   injected at bundle time and points at the host machine (e.g.
 *   "192.168.1.5:8081"). On a physical device with Expo Dev Client the same
 *   value is used over LAN/Tunnel.
 *
 * - In production / EAS Hosting: relative paths work because the server and
 *   the app share the same origin (empty-string base).
 *
 *   Override at any time by setting EXPO_PUBLIC_API_URL in your .env.
 */
export function getApiBase(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri ?? "localhost:8081";
    // hostUri = "192.168.x.x:8081" or "localhost:8081"
    return `http://${hostUri}`;
  }
  return "";
}

/** Fetch a fresh Stream user token from the server-side API route. */
export async function fetchStreamToken(userId: string): Promise<string> {
  const url = `${getApiBase()}/api/stream/token`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    throw new Error(`Stream token fetch failed (${res.status})`);
  }
  const data = (await res.json()) as { token: string };
  return data.token;
}

/**
 * Create (or reuse) the Stream Video client singleton for the given user.
 * Always use `StreamVideoClient.getOrCreateInstance` — never `new StreamVideoClient`.
 */
export function createVideoClient(user: VideoUserInput): StreamVideoClient {
  const { id, name, image } = user;
  const tokenProvider = () => fetchStreamToken(id);
  return StreamVideoClient.getOrCreateInstance({
    apiKey: STREAM_API_KEY,
    user: { id, name, image },
    tokenProvider,
  });
}

/** Sanitise a string so it is a valid Stream call-id (alphanumeric + dashes). */
export function toCallId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9-]/g, "-");
}
