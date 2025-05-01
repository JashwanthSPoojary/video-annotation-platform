import SignInForm from "@/components/features/auth/SIgnInForm";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
export default function SignInPage() {
  return (
    <Suspense fallback={
      (
        <div className="bg-landingBlack min-h-screen flex justify-center items-center">
          <Loader2Icon className="animate-spin w-8 bg-landingWhite"/>
        </div>
      )
    }>
      <div className="flex items-center justify-center min-h-screen bg-landingBlack text-landingWhite">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>
      </Suspense>
  );
}
