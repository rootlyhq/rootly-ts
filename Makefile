SPEC_URL := https://rootly-heroku.s3.amazonaws.com/swagger/v1/swagger.json
SCHEMA_OUTPUT := src/generated/schema.d.ts

.PHONY: generate build typecheck test clean

generate:
	@echo "Generating TypeScript types from Rootly OpenAPI spec..."
	@mkdir -p src/generated
	npx openapi-typescript "$(SPEC_URL)" -o "$(SCHEMA_OUTPUT)"
	@echo "Done! Types written to $(SCHEMA_OUTPUT)"

build:
	npx tsup

typecheck:
	npx tsc --noEmit

test:
	npx vitest run

clean:
	rm -rf dist
