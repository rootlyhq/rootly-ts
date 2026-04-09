import { describe, it, expect } from "vitest";
import { RootlyClient } from "../src/index.js";

describe("RootlyClient", () => {
  it("should create a client with default base URL", () => {
    const client = new RootlyClient({ token: "test-token" });
    expect(client).toBeDefined();
    expect(client.client).toBeDefined();
  });

  it("should accept custom base URL", () => {
    const client = new RootlyClient({
      token: "test-token",
      baseUrl: "https://custom.rootly.com",
    });
    expect(client).toBeDefined();
  });
});
