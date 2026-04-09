import createClient, { type Client } from "openapi-fetch";
import type { paths } from "./generated/schema.js";
import { createAuthMiddleware } from "./middleware.js";

export interface RootlyClientOptions {
  /** Rootly API token (Bearer token) */
  token: string;
  /** Base URL for the Rootly API. Defaults to "https://api.rootly.com" */
  baseUrl?: string;
  /** Custom fetch implementation (e.g., for testing) */
  fetch?: typeof globalThis.fetch;
}

export class RootlyClient {
  /** The underlying openapi-fetch client for direct access to all typed endpoints */
  public readonly client: Client<paths>;

  constructor(options: RootlyClientOptions) {
    const {
      token,
      baseUrl = "https://api.rootly.com",
      fetch: customFetch,
    } = options;

    this.client = createClient<paths>({
      baseUrl,
      ...(customFetch ? { fetch: customFetch } : {}),
    });

    this.client.use(createAuthMiddleware(token));
  }
}
