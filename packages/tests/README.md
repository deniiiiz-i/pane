# Tests

Integration tests that install the registry with the real shadcn CLI and check the result.

## Running tests

From the root of the workspace:

```bash
pnpm test
```

This builds the registry first. The install test creates a fresh Next.js app, which takes a few minutes; set `PANE_TEST_APP` to a directory to reuse one between runs:

```bash
PANE_TEST_APP=/tmp/pane-test-app pnpm test
```

## What's covered

- `src/install.test.ts` installs every component into a project with a Base UI style (`base-nova`), checks each installed file matches its source, and type-checks the project.
