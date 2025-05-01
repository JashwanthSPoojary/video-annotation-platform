import SignInForm from "@/components/features/auth/SIgnInForm";
export default function SignInPage() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-landingBlack text-landingWhite">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>
  );
}
