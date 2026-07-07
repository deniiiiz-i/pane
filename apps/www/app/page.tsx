import {
  CompassIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { Pane } from "@/components/ui/pane";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center gap-16 px-4 pt-12 pb-24 sm:gap-24 sm:pt-20 sm:pb-32">
        <section className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <Badge variant="tinted">Copy-paste. No npm install.</Badge>
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Liquid glass, for React.
          </h1>
          <p className="max-w-xl text-lg text-balance text-muted-foreground">
            A component registry that recreates Apple&apos;s liquid glass
            material — real refraction, pointer-reactive light, spring physics.
            Install with the shadcn CLI or copy the code.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/docs">Get started</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/docs/installation">npx shadcn add</Link>
            </Button>
          </div>
        </section>

        <section className="w-full max-w-4xl">
          <Pane
            variant="clear"
            radius={40}
            className="flex flex-col items-center gap-6 px-5 py-10 sm:px-16 sm:py-16"
          >
            <Image
              src="/pane.png"
              alt="Pane"
              width={72}
              height={72}
              className="rounded-2xl"
              priority
            />
            <p className="max-w-md text-center text-muted-foreground">
              Every component — buttons, cards, dialogs, the dock below — is
              built on one primitive,{" "}
              <span className="font-medium text-foreground">{"<Pane>"}</span>,
              so the whole library looks and behaves like a single material.
            </p>
            <Navbar
              defaultValue="Home"
              items={[
                { label: "Home", icon: <HomeIcon /> },
                { label: "Search", icon: <SearchIcon /> },
                { label: "Explore", icon: <CompassIcon /> },
                { label: "Favorites", icon: <HeartIcon /> },
                { label: "Profile", icon: <UserIcon /> },
              ]}
            />
          </Pane>
        </section>

        <section className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <Card radius={22} className="py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-base">Own the code</CardTitle>
              <CardDescription>
                Every file is copied into your repo. Read it, change it, ship
                it.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card radius={22} className="py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-base">Real refraction</CardTitle>
              <CardDescription>
                An SVG displacement filter bends the background at the edges,
                not just blur.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card radius={22} className="py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-base">One tuning dial</CardTitle>
              <CardDescription>
                Blur, tint, lensing and spring physics all live in one config
                file.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
