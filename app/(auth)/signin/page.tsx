import SignInForm from "@/components/features/auth/SIgnInForm";
import { Suspense } from "react";
export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>{" "}
    </Suspense>
  );
}
