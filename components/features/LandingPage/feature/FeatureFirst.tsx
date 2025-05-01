"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const FeatureFirst = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px 0px -50% 0px",
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
      {/* Left Section */}
      <div className="flex-1 text-white">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          Copy youtube link
          <br />
          <span className="text-white/80">Specify the video title</span>
        </h2>
        <ul className="space-y-3 mt-6">
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <span className="text-white">Select the video you wanna note</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600"></span>
            <span className="text-white/50">Simple and easy</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600"></span>
            <span className="text-white/50">Click on Add video</span>
          </li>
        </ul>
      </div>

      {/* Right Section with motion */}
      <motion.div
        ref={ref}
        className="flex-1 w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 shadow-xl"
        animate={controls}
        initial="hidden"
        variants={{
          hidden: { 
            boxShadow: "0 0 0 rgba(0,0,0,0)", 
            filter: "brightness(1)" // Default brightness
          },
          visible: {
            boxShadow: 
              "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.15)", // Increased shadow
            filter: "brightness(1.3)", // Increase brightness
            transition: { duration: 0.6 },
          },
        }}
      >
        <img
          src="/feature1.png"
          alt="feature"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </section>
  );
};

export default FeatureFirst;
