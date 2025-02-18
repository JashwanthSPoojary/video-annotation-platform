import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Pencil, Share2, Heart } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Youtube className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">VideoAno</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Annotate Videos with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  VideoAno helps you annotate YouTube videos effortlessly. Copy,
                  paste, annotate, and share your insights in minutes.
                </p>
              </div>
              <Link href='/dashboard' className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-600">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Youtube className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Video Import</h3>
                <p className="text-gray-500">
                  Simply copy and paste any YouTube URL to start annotating.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Pencil className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Full Video Annotation</h3>
                <p className="text-gray-500">
                  Add notes throughout the entire video.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Share2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-gray-500">
                  Share your annotated videos with colleagues or friends in one
                  click.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Paste YouTube URL</h3>
                  <p className="text-gray-500">
                    Copy the URL of any YouTube video and paste it into
                    VideoAno.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Annotate the Video</h3>
                  <p className="text-gray-500">
                    Add your notes to specific timestamps.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Share Your Insights</h3>
                  <p className="text-gray-500">
                    Share the annotated video with others via a unique link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className=" bg-gray-100 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2">
          <span>Made by</span>
          <Heart size={16} />
          <span>Jashwanth S Poojary</span>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://github.com/JashwanthSPoojary"
          >
            Github
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://www.linkedin.com/in/jashwanth-s-poojary/"
          >
            X.com
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://x.com/JashwantPoojary"
          >
            Linkdin
          </Link>
        </nav>
      </footer>
    </div>
  );
}
