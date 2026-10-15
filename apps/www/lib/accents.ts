/**
 * Ready-made values for `--pane-accent`: Apple's system colors, each with
 * its own light and dark shade. Green is what pane-style ships with.
 */
export const accents = {
  green: {
    light: { accent: "#34c759", foreground: "#ffffff" },
    dark: { accent: "#30d158", foreground: "#ffffff" },
  },
  blue: {
    light: { accent: "#007aff", foreground: "#ffffff" },
    dark: { accent: "#0a84ff", foreground: "#ffffff" },
  },
  indigo: {
    light: { accent: "#5856d6", foreground: "#ffffff" },
    dark: { accent: "#5e5ce6", foreground: "#ffffff" },
  },
  purple: {
    light: { accent: "#af52de", foreground: "#ffffff" },
    dark: { accent: "#bf5af2", foreground: "#ffffff" },
  },
  pink: {
    light: { accent: "#ff2d55", foreground: "#ffffff" },
    dark: { accent: "#ff375f", foreground: "#ffffff" },
  },
  red: {
    light: { accent: "#ff3b30", foreground: "#ffffff" },
    dark: { accent: "#ff453a", foreground: "#ffffff" },
  },
  orange: {
    light: { accent: "#ff9500", foreground: "#ffffff" },
    dark: { accent: "#ff9f0a", foreground: "#ffffff" },
  },
  // too light for a white label or check
  yellow: {
    light: { accent: "#ffcc00", foreground: "#1d1d1f" },
    dark: { accent: "#ffd60a", foreground: "#1d1d1f" },
  },
  teal: {
    light: { accent: "#30b0c7", foreground: "#ffffff" },
    dark: { accent: "#40c8e0", foreground: "#ffffff" },
  },
  // shadcn/ui's neutral primary: near-black on light, near-white on dark
  graphite: {
    light: { accent: "#1d1d1f", foreground: "#ffffff" },
    dark: { accent: "#f5f5f7", foreground: "#1d1d1f" },
  },
} as const;

export type AccentName = keyof typeof accents;
export const accentNames = Object.keys(accents) as AccentName[];
export const DEFAULT_ACCENT: AccentName = "green";

/** The two declarations to paste under `:root` or `.dark`. */
export function accentVars(name: AccentName, scheme: "light" | "dark") {
  const { accent, foreground } = accents[name][scheme];
  return {
    "pane-accent": accent,
    "pane-accent-foreground": foreground,
  };
}

export function accentCss(name: AccentName) {
  const block = (selector: string, scheme: "light" | "dark") =>
    [
      `${selector} {`,
      ...Object.entries(accentVars(name, scheme)).map(
        ([k, v]) => `  --${k}: ${v};`,
      ),
      "}",
    ].join("\n");
  return `${block(":root", "light")}\n\n${block(".dark", "dark")}`;
}
