/**
 * Regenerates the `cssVars` of the `pane-style` registry item from
 * `app/globals.css`.
 *
 * Both files hold the same values: globals.css is what the docs site renders
 * with, cssVars is what `shadcn add` writes into a consumer's stylesheet. They
 * used to be maintained by hand, which meant retuning the material updated the
 * site and silently left the registry on the old values — the site looks right,
 * and nobody reads registry.json. Generating one from the other removes the
 * second copy as something anyone has to remember.
 *
 * Runs as part of `registry:build`, so `shadcn build` always flattens current
 * values, and a deploy is correct even if the committed registry.json is stale.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = join(root, "app/globals.css");
const registryPath = join(root, "registry.json");

const STYLE_ITEM = "pane-style";

/** Body of a top-level rule, by selector. Brace-counted rather than read to the
 *  first `}`, so a nested at-rule inside the block can't truncate it. */
function ruleBody(css, selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`No \`${selector}\` rule in globals.css`);

  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) {
      return css.slice(css.indexOf("{", start) + 1, i);
    }
  }
  throw new Error(`Unterminated \`${selector}\` rule in globals.css`);
}

/** `--pane-*` declarations in source order. The registry keys drop the leading
 *  `--`, which is the form shadcn writes back out. */
function paneVars(body) {
  const vars = {};
  for (const [, name, value] of body.matchAll(
    /--(pane-[a-z-]+)\s*:\s*([^;]+);/g,
  )) {
    vars[name] = value.trim();
  }
  return vars;
}

const css = readFileSync(cssPath, "utf8");
const cssVars = {
  light: paneVars(ruleBody(css, ":root")),
  dark: paneVars(ruleBody(css, ".dark")),
};

if (Object.keys(cssVars.light).length === 0) {
  throw new Error("No --pane-* vars found in :root — refusing to write");
}

const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const style = registry.items.find((item) => item.name === STYLE_ITEM);
if (!style) throw new Error(`No \`${STYLE_ITEM}\` item in registry.json`);

if (JSON.stringify(style.cssVars) === JSON.stringify(cssVars)) {
  process.exit(0);
}

const before = {
  light: Object.keys(style.cssVars?.light ?? {}).length,
  dark: Object.keys(style.cssVars?.dark ?? {}).length,
};

style.cssVars = cssVars;
writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);

// JSON.stringify expands every array; hand the file back to biome so it matches
// what `biome check` expects and `pnpm lint` stays green.
execFileSync(
  join(root, "node_modules/.bin/biome"),
  ["format", "--write", registryPath],
  {
    stdio: "ignore",
  },
);

console.log(
  `Synced ${STYLE_ITEM} cssVars from globals.css: ` +
    `light ${before.light} → ${Object.keys(cssVars.light).length}, ` +
    `dark ${before.dark} → ${Object.keys(cssVars.dark).length}`,
);
