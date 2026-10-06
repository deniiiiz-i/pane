import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Changelog</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Every Pane release, newest first. Full release notes live on{" "}
          <Link
            href={`${siteConfig.links.github}/releases`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>

      {releases.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Release notes couldn't be loaded right now. See them on{" "}
          <Link
            href={`${siteConfig.links.github}/releases`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      ) : null}

      {releases.map((release) => (
        <section key={release.version} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">v{release.version}</h2>
            {release.prerelease ? <Badge>Pre-release</Badge> : null}
            <time
              dateTime={release.date}
              className="text-sm text-muted-foreground"
            >
              {formatDate(release.date)}
            </time>
          </div>
          <p className="text-sm text-muted-foreground">{release.summary}</p>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground marker:text-foreground/30">
            {release.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
          <Link
            href={`${siteConfig.links.github}/releases/tag/v${release.version}`}
            className="w-fit text-sm font-medium underline underline-offset-4"
          >
            View on GitHub
          </Link>
        </section>
      ))}
    </div>
  );
}
