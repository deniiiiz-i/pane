import fs from "node:fs";
import path from "node:path";

const REGISTRY_ROOT = path.join(process.cwd(), "registry", "pane");

function readSource(relativePath: string) {
  const filePath = path.join(REGISTRY_ROOT, relativePath);
  return fs.readFileSync(filePath, "utf-8").trimEnd();
}

export function getComponentSource(name: string) {
  return readSource(`ui/${name}.tsx`);
}

export function getExampleSource(name: string) {
  return readSource(`examples/${name}-demo.tsx`);
}

export function getGlassSource(name: string) {
  return readSource(`lib/glass/${name}.ts`);
}
