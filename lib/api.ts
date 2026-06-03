const DEFAULT_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://satkhirar-amm-backend.vercel.app"
    : "http://localhost:5000";
const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE_URL = (
  configuredApiUrl || DEFAULT_API_URL
).replace(/\/$/, "");

type ApiRequestOptions = RequestInit & {
  body?: BodyInit | null;
  timeoutMs?: number;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const { timeoutMs = 15000, signal, ...requestOptions } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...requestOptions,
      cache: method === "GET" ? "no-store" : options.cache,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.message || "API request failed.");
    }

    return payload as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function getApiError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message === "Failed to fetch") {
    return "Backend API চালু নেই বা MongoDB কানেকশন ব্লক হয়েছে।";
  }

  return error instanceof Error ? error.message : fallback;
}
