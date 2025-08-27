"use client";
import React from "react";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className || ""}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(45deg, #667EEA, #764BA2, #667EEA)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative z-10 bg-white rounded-lg m-0.5">{children}</div>
    </motion.div>
  );
};
