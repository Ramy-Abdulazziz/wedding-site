"use client";

import { motion } from "framer-motion"

export default function AnimatedArchBackground() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 63 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="M14.4332 37.2453C16.4951 27.9297 23.9231 15.5586 30.9693 6.12273L31.5025 5.4072L32.0357 6.12274C39.0819 15.5586 46.5099 27.9297 48.5718 37.2453C50.6433 46.6141 48.3279 53.3953 42.0505 58.2389C36.5479 62.4698 31.7888 64.3783 30.9693 64.7045C30.1498 64.3783 25.3907 62.4698 19.888 58.2389C13.6106 53.3953 11.2953 46.6141 13.3667 37.2453H14.4332Z"
          fill="white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg>
    </div>
  );
}
