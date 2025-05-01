"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  onAnimationComplete: () => void;
}

const Hero = ({ onAnimationComplete }: HeroProps) => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="px-4 sm:px-8 lg:px-[270px] flex flex-col items-center sm:items-start justify-center py-10 gap-12">
        {/* Text Content */}
        <div className="w-full max-w-3xl text-center sm:text-left space-y-4">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
          >
            VideoAno is a purpose-built tool for video text based annotation .
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 2.6, duration: 1.2 }}
            className="text-base sm:text-lg text-[#8A8F98]"
          >
            Annotate the youtube videos that you wanna note.
            <br />
            Make the notes on video on specifc timestamp.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 4, duration: 1.2 }}
            className="mt-6 flex flex-col sm:flex-row sm:justify-start justify-center gap-4"
          >
            <Link href="/dashboard">
              <button className="bg-landingWhite text-landingBlack font-medium px-6 py-2 rounded-md hover:opacity-90 transition w-fit mx-auto sm:mx-0">
                Get started
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Rotated, Cropped, Animated Image */}
        <motion.div
  initial={{ opacity: 0, y: -100, scale: 1.05 }}
  animate={{ opacity: 0.9, y: 0, scale: 1 }}
  transition={{ delay: 5.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
  className="relative w-full sm:w-[120%] sm:-ml-[10%] lg:w-[130%] lg:-ml-[15%]"
  onAnimationComplete={onAnimationComplete}
>
  {/* Backdrop/Border */}
  <div className="absolute inset-0 rotate-[-6deg] origin-top-left border-4 border-landingWhite backdrop-blur-xl rounded-xl z-0 shadow-2xl" />

  {/* Image on top of the backdrop */}
  <div className="relative z-10 w-[200%] sm:w-full transform rotate-[-6deg] origin-top-left">
    <img
      src="/dashboard.png"
      alt="Dashboard"
      className="w-full h-[300px] sm:h-auto object-cover object-left rounded-xl shadow-2xl mix-blend-lighten transition duration-500"
    />
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default Hero