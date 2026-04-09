# rootly-ts

Type-safe TypeScript SDK for the [Rootly](https://rootly.com) API, powered by [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) and [openapi-fetch](https://openapi-ts.dev/openapi-fetch/).

- Zero runtime overhead — types are generated at build time, not runtime
- Full type safety — every endpoint, parameter, and response is typed from the OpenAPI spec
- Tiny footprint — openapi-fetch is ~6 KB, wraps native `fetch`
- ESM and CommonJS support

## Installation

```bash
npm install rootly-ts
```

## Quick Start

```typescript
import { RootlyClient } from "rootly-ts";

const rootly = new RootlyClient({
  token: process.env.ROOTLY_API_TOKEN!,
});
```

### List Incidents

```typescript
const { data, error } = await rootly.client.GET("/v1/incidents", {
  params: {
    query: {
      "page[number]": 1,
      "page[size]": 10,
      "filter[status]": "started",
    },
  },
});
```

### Get an Incident

```typescript
const { data, error } = await rootly.client.GET("/v1/incidents/{id}", {
  params: { path: { id: "abc123" } },
});
```

### Create an Incident

```typescript
const { data, error } = await rootly.client.POST("/v1/incidents", {
  body: {
    data: {
      type: "incidents",
      attributes: {
        title: "Service degradation",
        kind: "normal",
        summary: "Users are experiencing elevated latency",
        severity_id: "sev-1",
      },
    },
  },
});
```

### Update an Incident

```typescript
const { data, error } = await rootly.client.PATCH("/v1/incidents/{id}", {
  params: { path: { id: "abc123" } },
  body: {
    data: {
      type: "incidents",
      attributes: {
        summary: "Root cause identified",
      },
    },
  },
});
```

### Error Handling

```typescript
const { data, error } = await rootly.client.GET("/v1/incidents/{id}", {
  params: { path: { id: "abc123" } },
});

if (error) {
  // error is typed — 401, 404, etc.
  console.error("Request failed:", error);
  return;
}

// data is typed as incident_response
console.log(data);
```

## Using Types

```typescript
import type { components } from "rootly-ts";

type Incident = components["schemas"]["incident"];
type IncidentResponse = components["schemas"]["incident_response"];
type NewIncident = components["schemas"]["new_incident"];
type Service = components["schemas"]["service"];
type ErrorsList = components["schemas"]["errors_list"];
```

## Configuration

### Custom Base URL

```typescript
const rootly = new RootlyClient({
  token: "your-token",
  baseUrl: "https://custom.rootly.com",
});
```

### Custom Fetch

```typescript
const rootly = new RootlyClient({
  token: "your-token",
  fetch: customFetchImplementation,
});
```

## Advanced Usage

For direct access to the underlying openapi-fetch client with full type inference:

```typescript
import { createClient, type paths } from "rootly-ts";
import { createAuthMiddleware } from "rootly-ts";

const client = createClient<paths>({
  baseUrl: "https://api.rootly.com",
});

client.use(createAuthMiddleware("your-token"));
```

## Requirements

- Node.js >= 18 (native `fetch` required)

## Development

```bash
make generate   # Regenerate types from OpenAPI spec
make build      # Build ESM + CJS
make typecheck  # Type-check
make test       # Run tests
make clean      # Remove dist/
```

## License

MIT
