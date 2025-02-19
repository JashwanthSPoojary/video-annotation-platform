"use client";

import ErrorPageComponent from "@/components/common/ErrorSignIn";
import { Suspense } from "react";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ErrorPageComponent />
    </Suspense>
  );
}
