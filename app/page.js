"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card3D } from "@/components/Card3D";
import { RightPanel } from "@/components/RightPanel";
import { Particles } from "@/components/Particles";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <Particles />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-7xl">
          {/* Left Side - 3D Card */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            style={{ perspective: "2000px" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card3D />
          </motion.div>

          {/* Right Side - Content Panel */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RightPanel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}