import type { Middleware } from "openapi-fetch";

export function createAuthMiddleware(token: string): Middleware {
  return {
    async onRequest({ request }) {
      request.headers.set("Authorization", `Bearer ${token}`);
      if (!request.headers.has("Content-Type")) {
        request.headers.set("Content-Type", "application/vnd.api+json");
      }
      request.headers.set("Accept", "application/vnd.api+json");
      return request;
    },
  };
}

export interface RateLimitOptions {
  /** Maximum number of retries on 429 responses. Defaults to 3. */
  maxRetries?: number;
  /** Initial backoff in ms before first retry. Defaults to 1000. */
  initialBackoffMs?: number;
}

export function createRateLimitMiddleware(
  options: RateLimitOptions = {},
): Middleware {
  const { maxRetries = 3, initialBackoffMs = 1000 } = options;

  return {
    async onResponse({ response, request }) {
      if (response.status !== 429) {
        return response;
      }

      let lastResponse = response;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        const retryAfter = lastResponse.headers.get("Retry-After");
        const waitMs = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : initialBackoffMs * Math.pow(2, attempt);

        await new Promise((resolve) => setTimeout(resolve, waitMs));

        lastResponse = await fetch(request.clone());

        if (lastResponse.status !== 429) {
          return lastResponse;
        }
      }

      return lastResponse;
    },
  };
}
