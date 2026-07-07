"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "pane-preview-video";

export function PreviewSurface({ children }: { children: React.ReactNode }) {
  const [video, setVideo] = React.useState(false);

  React.useEffect(() => {
    setVideo(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const toggle = () => {
    const next = !video;
    setVideo(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl p-4 pt-14 sm:p-10",
        !video && "border border-foreground/10",
      )}
    >
      {video ? (
        <video
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute top-3 right-3 z-20">
        <Pane
          variant="clear"
          radius={999}
          className="inline-flex items-center p-1"
        >
          <button
            type="button"
            onClick={toggle}
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            {video ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
            <span className="sr-only">
              {video ? "Hide video background" : "Show video background"}
            </span>
          </button>
        </Pane>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
