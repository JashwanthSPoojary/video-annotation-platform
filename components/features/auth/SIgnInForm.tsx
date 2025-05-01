"use client";

import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link"; // Importing the Link component

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    setLoadingProvider(provider);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoadingProvider(null);
    }
  };

  useEffect(() => {
    if (error) {
      router.push(`/signin/error?error=${error}`);
    }
  }, [error, router]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-1">Sign In</h1>
          <p className="text-sm text-zinc-400">Choose your preferred sign-in method</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSignIn("google")}
            disabled={loadingProvider === "google"}
            className="flex items-center justify-center w-full border border-zinc-700 bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-zinc-700 transition disabled:opacity-50"
          >
            {loadingProvider === "google" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
            )}
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-400">
          You are signing in to a video annotation platform built by Jashwanth S Poojary.
        </div>

        {/* "Go back home" link */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
