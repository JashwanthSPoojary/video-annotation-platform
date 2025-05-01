"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const FeatureThird = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px 0px -0% 0px",
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section className="flex flex-col items-center justify-center gap-12 py-20">
      {/* Top Text Section */}
      <div className="text-white text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          Dashboard to manage Annotated videos
          <br />
        </h2>
      </div>

      {/* Bottom Image Section with smooth glow effect */}
      <motion.div
        ref={ref}
        className="w-full max-w-4xl rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 shadow-xl"
        animate={controls}
        initial="hidden"
        variants={{
          hidden: {
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            opacity: 0, // Start invisible
          },
          visible: {
            opacity: 1, // Fade in smoothly
            boxShadow:
              "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.15)", // Strong glow
            transition: {
              opacity: { duration: 0.6, ease: "easeInOut" }, // Smooth fade-in
              boxShadow: { duration: 0.8, ease: "easeOut" }, // Smooth shadow transition
            },
          },
        }}
      >
        <img
          src="/feature3.png"
          alt="feature"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </section>
  );
};

export default FeatureThird;
