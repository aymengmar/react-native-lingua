import path from "path";
import { fileURLToPath } from "url";

if (!process.env.VISION_AGENT_URL) {
  try {
    const dir = path.dirname(fileURLToPath(import.meta.url));
    process.loadEnvFile(path.resolve(dir, "../../../.env"));
  } catch {
    // .env missing or Node < 20 — ignore
  }
}

/**
 * DELETE /api/agent/stop
 *
 * Proxies to the Vision Agent HTTP server to terminate an AI-teacher session.
 * A 404 from the agent server is treated as success (session already gone).
 *
 * Body:  { callId: string, sessionId: string }
 * Returns: { ok: true }
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { callId, sessionId } = body as { callId?: string; sessionId?: string };

    if (!callId || !sessionId) {
      return Response.json(
        { error: "callId and sessionId are required" },
        { status: 400 }
      );
    }

    const agentUrl = process.env.VISION_AGENT_URL;
    if (!agentUrl) {
      return Response.json({ ok: true });
    }

    const res = await fetch(
      `${agentUrl}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
      { method: "DELETE" }
    );

    if (!res.ok && res.status !== 404) {
      console.error("[agent/stop] Vision Agent error:", res.status);
      return Response.json({ error: "Failed to stop agent session" }, { status: res.status });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[agent/stop] error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
