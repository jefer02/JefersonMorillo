// Rate limit for the contact form: 3 messages per 10 minutes per IP.
// Uses Upstash Redis (REST) when its credentials are passed; otherwise an in-memory
// window (best effort: each Worker isolate keeps its own).

const LIMIT = 3;
const WINDOW_SECONDS = 600;
const memory = new Map<string, number[]>();

type Upstash = { url?: string; token?: string };

async function upstash(key: string, { url, token }: Upstash): Promise<boolean | null> {
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(WINDOW_SECONDS), "NX"],
      ]),
    });
    if (!res.ok) return null;
    const [[, count]] = (await res.json()).map((r: { result: number }) => [null, r.result]);
    return Number(count) <= LIMIT;
  } catch {
    return null;
  }
}

export async function allowRequest(ip: string, redis: Upstash = {}): Promise<boolean> {
  const key = `contact:${ip}`;
  const remote = await upstash(key, redis);
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
