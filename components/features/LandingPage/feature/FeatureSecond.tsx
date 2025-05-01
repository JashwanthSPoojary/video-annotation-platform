"use client"
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const FeatureSecond = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-20">
        <motion.div
        ref={ref}
        className="flex-1 w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 shadow-xl"
        animate={controls}
        initial="hidden"
        variants={{
          hidden: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
          visible: {
            boxShadow:
            "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.15)", // Increased shadow
            transition: { duration: 0.6 },
          },
        }}
      >
        <img
          src="/feature2.png"
          alt="feature"
          className="w-full h-auto object-cover"
        />
      </motion.div>
      {/* Left Section */}
      <div className="flex-1 text-white">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          Annotate your timeframe
          <br />
          <span className="text-white/80">To take notes of video</span>
        </h2>
        <ul className="space-y-3 mt-6">
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <span className="text-white">Navigate through timestamp</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600"></span>
            <span className="text-white/50">Write long paragraphs</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600"></span>
            <span className="text-white/50">It's editable and deletable</span>
          </li>
        </ul>
      </div>

      
    </section>
  );
};

export default FeatureSecond;
