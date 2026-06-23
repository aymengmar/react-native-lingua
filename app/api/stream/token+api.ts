export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body?.userId as string | undefined;

    if (!userId || typeof userId !== "string") {
      return Response.json({ error: "userId is required" }, { status: 400 });
    }

    const apiKey = process.env.STREAM_API_KEY;
    const secret = process.env.STREAM_API_SECRET;

    if (!apiKey || !secret) {
      console.error("Stream credentials missing in environment");
      return Response.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const token = await generateStreamToken(userId, secret);
    return Response.json({ token, apiKey });
  } catch (err) {
    console.error("stream/token error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Generate a Stream user JWT using Web Crypto (works in Node.js and edge runtimes).
async function generateStreamToken(userId: string, secret: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = toBase64Url(
    JSON.stringify({ user_id: userId, iat: now, exp: now + 4 * 60 * 60 })
  );
  const message = `${header}.${payload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );

  return `${message}.${uint8ToBase64Url(new Uint8Array(sigBytes))}`;
}

function toBase64Url(str: string): string {
  return uint8ToBase64Url(new TextEncoder().encode(str));
}

function uint8ToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
