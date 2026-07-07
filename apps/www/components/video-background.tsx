"use client";

export function VideoBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <video
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full scale-110 object-cover blur-2xl"
      />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}
