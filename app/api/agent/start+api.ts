import path from "path";
import { fileURLToPath } from "url";

// Re-read .env if VISION_AGENT_URL hasn't been injected yet (e.g. when the Expo
// dev server was started before the variable was added to .env).
if (!process.env.VISION_AGENT_URL) {
  try {
    const dir = path.dirname(fileURLToPath(import.meta.url));
    process.loadEnvFile(path.resolve(dir, "../../../.env"));
  } catch {
    // .env missing or Node < 20 — ignore, variable stays unset
  }
}

/**
 * POST /api/agent/start
 *
 * Proxies to the Vision Agent HTTP server to spawn an AI-teacher session on a
 * Stream call. The Vision Agent URL and any internal secrets never reach the
 * mobile app — only the session ID is returned.
 *
 * Body:  { callType: string, callId: string }
 * Returns: { sessionId: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { callType, callId } = body as { callType?: string; callId?: string };

    if (!callType || !callId) {
      return Response.json(
        { error: "callType and callId are required" },
        { status: 400 }
      );
    }

    const agentUrl = process.env.VISION_AGENT_URL;
    if (!agentUrl) {
      console.warn("[agent/start] VISION_AGENT_URL not set — agent disabled");
      return Response.json({ error: "Vision Agent not configured" }, { status: 503 });
    }

    const res = await fetch(`${agentUrl}/calls/${encodeURIComponent(callId)}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ call_type: callType }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[agent/start] Vision Agent error:", res.status, text);
      return Response.json({ error: "Failed to start agent session" }, { status: res.status });
    }

    const data = (await res.json()) as Record<string, unknown>;
    const sessionId =
      (data.session_id as string | undefined) ??
      (data.id as string | undefined) ??
      "";

    return Response.json({ sessionId });
  } catch (err) {
    console.error("[agent/start] error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
