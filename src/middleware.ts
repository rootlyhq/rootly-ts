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
