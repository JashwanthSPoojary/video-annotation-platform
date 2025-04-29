import Hero from "@/components/features/LandingPage/Hero";
import Navbar from "@/components/features/LandingPage/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-landingBlack text-landingWhite">
      <Navbar/>
      <Hero/>
    </div>
  );
}
