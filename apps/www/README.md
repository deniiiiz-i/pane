# www

The Pane docs site and the registry it serves.

Two things live here:

- **The registry** — items declared in `registry.json`, sources in
  `registry/pane/`. `shadcn build` flattens them into `public/r/*.json`, which
  is what the CLI fetches.
- **The docs site** — a Next.js app rendering a live preview and the full source
  for each component.

The demos under `registry/pane/examples/` are imported directly by
`lib/components-meta.ts` to render those previews. They are not published as
registry items, so they don't show up in `shadcn search`.

## Scripts

```bash
pnpm dev              # predev runs `shadcn build` first
pnpm registry:build   # shadcn build
pnpm registry:validate # shadcn registry validate
pnpm lint             # biome check
pnpm format           # biome format --write
pnpm build            # prebuild runs `shadcn build` first
```

`public/r/` is generated and gitignored. Delete it before rebuilding if you
removed an item — `shadcn build` writes files but never prunes stale ones.

## Adding a component

1. Put the source in `registry/pane/ui/`, and a demo in
   `registry/pane/examples/`.
2. Add an entry to `registry.json` with `title`, `description`, `author`,
   `categories` and `docs`, plus its `dependencies` and `registryDependencies`.
3. Register it in `lib/components-meta.ts` so it gets a docs page.
4. Run `pnpm registry:validate`.

Note that `components.json` here configures the docs site, not consumers of the
registry. The tsconfig aliases `@/components/ui/*` straight to
`registry/pane/ui/*`, so the registry sources are the site's components — never
run `shadcn add` in this workspace, it would write a second copy under
`components/ui/`.

See the [root README](../../README.md) for installation.
