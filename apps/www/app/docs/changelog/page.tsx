import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Pane } from "@/components/ui/pane";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every Pane release, newest first.",
};

interface Release {
  version: string;
  /** ISO date the GitHub release was published */
  date: string;
  prerelease?: boolean;
  summary: string;
  changes: string[];
}

interface GitHubRelease {
  tag_name: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  body: string | null;
}

/**
 * Release notes come straight from GitHub so they're written once. A release
 * body is read as a summary paragraph followed by a `- ` bullet per change.
 */
async function getReleases(): Promise<Release[]> {
  const repo = new URL(siteConfig.links.github).pathname.slice(1);
  // anonymous requests share a 60/hour limit per IP, which build machines
  // regularly exhaust; a token (no scopes needed for a public repo) lifts it
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/repos/${repo}/releases`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    // At build time a GitHub hiccup must not fail the deploy: ship an empty
    // changelog and let the hourly revalidation fill it in. Later, throwing
    // keeps the last good page instead of replacing it with an empty one.
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Changelog: GitHub releases returned ${res.status}`);
      return [];
    }
    throw new Error(`GitHub releases: ${res.status}`);
  }

  const data: GitHubRelease[] = await res.json();
  return data
    .filter((release) => !release.draft && release.published_at)
    .map((release) => {
      const lines = (release.body ?? "").split(/\r?\n/).map((l) => l.trim());
      return {
        version: release.tag_name.replace(/^v/, ""),
        date: (release.published_at as string).slice(0, 10),
        prerelease: release.prerelease,
        summary: lines
          .filter((line) => line && !line.startsWith("- "))
          .join(" "),
        changes: lines
          .filter((line) => line.startsWith("- "))
          .map((line) => line.slice(2)),
      };
    });
}

/** Release notes are plain text with `code` spans, as GitHub renders them. */
function Inline({ text }: { text: string }) {
  return text.split(/`([^`]+)`/).map((part, i) =>
    i % 2 ? (
      <code
        // biome-ignore lint/suspicious/noArrayIndexKey: parts of a fixed string
        key={i}
        className="rounded bg-foreground/[0.06] px-1 py-0.5 font-mono text-[0.9em] text-foreground"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Changelog</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Every Pane release, newest first, with full{" "}
          <a
            href={`${siteConfig.links.github}/releases`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            release notes
          </a>
          .
        </p>
      </div>

      {releases.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Release notes couldn't be loaded right now. Read the{" "}
          <a
            href={`${siteConfig.links.github}/releases`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            full release notes
          </a>
          .
        </p>
      ) : null}

      <ol className="flex flex-col gap-8">
        {releases.map((release, index) => (
          <li key={release.version}>
            <Pane radius={20} className="flex flex-col gap-4 p-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="mr-1 text-xl font-semibold">
                  <a
                    href={`${siteConfig.links.github}/releases/tag/v${release.version}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    v{release.version}
                  </a>
                </h2>
                {index === 0 ? <Badge>Latest</Badge> : null}
                {release.prerelease ? <Badge>Pre-release</Badge> : null}
                <time
                  dateTime={release.date}
                  className="basis-full text-sm text-muted-foreground sm:ml-auto sm:basis-auto"
                >
                  {formatDate(release.date)}
                </time>
              </div>
              {release.summary ? (
                <p className="text-[15px] leading-relaxed">
                  <Inline text={release.summary} />
                </p>
              ) : null}
              {release.changes.length ? (
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {release.changes.map((change) => (
                    <li key={change} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-foreground/25"
                      />
                      <span>
                        <Inline text={change} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Pane>
          </li>
        ))}
      </ol>
    </div>
  );
}
