import { createClient } from "redis";

type RedisCacheClient = {
  get: (key: string) => Promise<string | null>;
  set: (
    key: string,
    value: string,
    options?: { EX?: number }
  ) => Promise<void>;
};

const noopCache: RedisCacheClient = {
  get: async () => null,
  set: async () => {},
};

let cache: RedisCacheClient = noopCache;
let initPromise: Promise<void> | null = null;
let initialized = false;

function isRedisEnabled(): boolean {
  if (process.env.REDIS_DISABLED === "true") return false;
  if (process.env.REDIS_URL) return true;
  return process.env.NODE_ENV === "production";
}

async function initializeRedis(): Promise<void> {
  if (initialized) return;
  initialized = true;

  if (!isRedisEnabled()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[redis] Caching disabled — set REDIS_URL to enable, or start Redis locally."
      );
    }
    return;
  }

  const client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: () => false,
    },
  });

  let errorLogged = false;
  client.on("error", (err) => {
    if (!errorLogged) {
      console.warn(
        "[redis] Unavailable, caching disabled:",
        err instanceof Error ? err.message : err
      );
      errorLogged = true;
      cache = noopCache;
    }
  });

  try {
    await client.connect();
    cache = {
      get: (key) => client.get(key),
      set: async (key, value, options) => {
        await client.set(key, value, options);
      },
    };
  } catch (err) {
    console.warn(
      "[redis] Failed to connect, caching disabled:",
      err instanceof Error ? err.message : err
    );
    cache = noopCache;
  }
}

async function ensureRedis(): Promise<void> {
  if (initialized) return;
  if (!initPromise) {
    initPromise = initializeRedis();
  }
  await initPromise;
}

const redisClient: RedisCacheClient = {
  get: async (key) => {
    await ensureRedis();
    return cache.get(key);
  },
  set: async (key, value, options) => {
    await ensureRedis();
    return cache.set(key, value, options);
  },
};

export default redisClient;
