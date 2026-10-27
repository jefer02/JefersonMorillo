// Rate limit for the contact form: 3 messages per 10 minutes per IP.
// Uses Upstash Redis (REST) automatically when its env vars exist; otherwise an
// in-memory window (fine for a single serverless instance, best effort on Vercel).

const LIMIT = 3;
const WINDOW_SECONDS = 600;
const memory = new Map<string, number[]>();

async function upstash(key: string): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(WINDOW_SECONDS), "NX"],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const [[, count]] = (await res.json()).map((r: { result: number }) => [null, r.result]);
    return Number(count) <= LIMIT;
  } catch {
    return null;
  }
}

export async function allowRequest(ip: string): Promise<boolean> {
  const key = `contact:${ip}`;
  const remote = await upstash(key);
  if (remote !== null) return remote;

  const now = Date.now();
  const recent = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_SECONDS * 1000);
  if (recent.length >= LIMIT) {
    memory.set(key, recent);
    return false;
  }
  recent.push(now);
  memory.set(key, recent);
  return true;
}
