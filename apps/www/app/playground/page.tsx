import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Playground } from "@/components/playground/playground";
import { getStyleTokens } from "@/lib/registry-source";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Tune the glass and the motion live, then copy the values into your project.",
};

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pt-10 pb-24">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">Playground</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Tune the glass and the motion, see every component react, then copy
            the values into your project.
          </p>
        </div>
        <Playground tokens={getStyleTokens()} />
      </main>
      <Footer />
    </div>
  );
}
