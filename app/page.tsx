"use client";
import { useState } from "react";
import Features from "@/components/features/LandingPage/Features";
import Footer from "@/components/features/LandingPage/Footer";
import Hero from "@/components/features/LandingPage/Hero";
import Navbar from "@/components/features/LandingPage/Navbar";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [showRest, setShowRest] = useState(false); // initially false

  return (
    <div className="min-h-screen bg-landingBlack text-landingWhite">
      <Navbar />
      <Hero onAnimationComplete={() => setShowRest(true)} />
      {showRest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Features />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
