type RecordValue = { count: number; firstRequestAt: number };

const WINDOW_MS = 1000 * 60 * 15; // 15 minutes
const MAX_REQUESTS = 5; // per window

const store = new Map<string, RecordValue>();

export function isRateLimited(key: string) {
  const now = Date.now();
  const record = store.get(key);
  if (!record) {
    store.set(key, { count: 1, firstRequestAt: now });
    return false;
  }

  if (now - record.firstRequestAt > WINDOW_MS) {
    store.set(key, { count: 1, firstRequestAt: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  store.set(key, record);
  return false;
}

export function resetRateLimit(key: string) {
  store.delete(key);
}
