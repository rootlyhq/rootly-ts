# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Type-safe TypeScript SDK for the Rootly API. Uses **openapi-typescript** to generate types from the OpenAPI spec and **openapi-fetch** as the runtime HTTP client. ESM-first with CJS compatibility, built with tsup.

## Commands

```bash
make generate   # Regenerate types from Rootly OpenAPI spec
make build      # Build ESM + CJS output with tsup
make typecheck  # Type-check without emitting
make test       # Run tests with vitest
make clean      # Remove dist/
npx vitest run test/client.test.ts  # Run a single test file
```

## Architecture

The SDK is a thin wrapper around openapi-fetch. The entire Rootly API surface is typed via a single generated schema file — there are no hand-written endpoint definitions.

- `src/generated/schema.d.ts` — **AUTO-GENERATED** by openapi-typescript from `https://rootly-heroku.s3.amazonaws.com/swagger/v1/swagger.json`. Never edit manually. Contains `paths`, `components`, and `operations` types covering all Rootly API endpoints.
- `src/client.ts` — `RootlyClient` class that wraps `openapi-fetch`'s `createClient<paths>()` and applies auth middleware. Consumers use `rootly.client.GET(...)`, `rootly.client.POST(...)`, etc. with full type inference.
- `src/middleware.ts` — openapi-fetch `Middleware` that sets Bearer token auth and `application/vnd.api+json` content-type/accept headers on every request.
- `src/index.ts` — Public API surface. Re-exports `RootlyClient`, generated types, `createAuthMiddleware`, and `createClient` for advanced usage.

## API Conventions

The Rootly API uses **JSON:API** format. Request/response bodies are wrapped in `{ data: { type, attributes } }` envelopes. Pagination uses `page[number]` and `page[size]` query params. Filtering uses `filter[field]` query params.

## Build Output

tsup produces dual ESM (`dist/index.js`) + CJS (`dist/index.cjs`) with declaration files. The package uses `"type": "module"` and conditional `exports` in package.json.
