"use client";

import ErrorContent from "@/components/common/Error";
import { Suspense } from "react";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
