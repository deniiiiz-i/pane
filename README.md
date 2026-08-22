# Pane

Liquid glass components for React.

Pane recreates Apple's liquid glass material as a shadcn registry: a refracted
rim, a tinted backdrop and a specular highlight that follows the pointer. It
ships as source you own, not as an npm package — the CLI copies the files into
your project.

**[pane.theui.company](https://pane.theui.company)**

## Installation

Register the namespace once per project, in `components.json`:

```json
{
  "registries": {
    "@pane": "https://pane.theui.company/r/{name}.json"
  }
}
```

Then add a component:

```bash
npx shadcn@latest add @pane/button
```

## License

[MIT](LICENSE)
