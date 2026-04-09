/**
 * Auto-generates src/types.ts from the generated schema.
 * Extracts all schema names from components.schemas and creates
 * PascalCase type aliases so users can `import type { Incident }` directly.
 *
 * Run via: npx tsx scripts/generate-types.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";

const SCHEMA_PATH = path.resolve("src/generated/schema.d.ts");
const OUTPUT_PATH = path.resolve("src/types.ts");

const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");

// Extract schema names: lines like `        some_schema_name: {`
// inside the `schemas: {` block (indented 8 spaces under components.schemas)
const schemaNames: string[] = [];
let inSchemas = false;
let braceDepth = 0;

for (const line of schema.split("\n")) {
  if (/^\s{4}schemas:\s*\{/.test(line)) {
    inSchemas = true;
    braceDepth = 1;
    continue;
  }
  if (!inSchemas) continue;

  // Track brace depth to know when we leave the schemas block
  for (const ch of line) {
    if (ch === "{") braceDepth++;
    if (ch === "}") braceDepth--;
  }
  if (braceDepth <= 0) break;

  // Match top-level schema entries (8 spaces indent)
  const match = line.match(/^        ([a-z_][a-z0-9_]*):\s*\{/);
  if (match) {
    schemaNames.push(match[1]!);
  }
}

// Convert snake_case to PascalCase
function toPascalCase(str: string): string {
  return str
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// Filter out task_params schemas — these are workflow internals, not useful as top-level exports
const filtered = schemaNames.filter((name) => !name.endsWith("_task_params"));

// Also filter out trigger_params
const exportable = filtered.filter((name) => !name.endsWith("_trigger_params"));

// Generate output
const lines: string[] = [
  "/**",
  " * Auto-generated convenience type aliases.",
  " * DO NOT EDIT — regenerate with: make generate",
  " */",
  "",
  'import type { components } from "./generated/schema.js";',
  "",
  "type Schemas = components[\"schemas\"];",
  "",
];

for (const name of exportable) {
  const pascalName = toPascalCase(name);
  lines.push(`export type ${pascalName} = Schemas["${name}"];`);
}

lines.push(""); // trailing newline

fs.writeFileSync(OUTPUT_PATH, lines.join("\n"));

console.log(
  `Generated ${exportable.length} type aliases in ${OUTPUT_PATH}`,
);
