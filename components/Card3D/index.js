"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sword, Brain, Heart, Zap } from "lucide-react";
import Image from "next/image";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

const StatDisplay = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/10 rounded-lg p-2 text-center transform transition-transform hover:scale-105">
    <div className="flex justify-center mb-1">
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <div className="text-white/60 text-xs sm:text-sm">{label}</div>
    <div className="text-white font-bold">{value}</div>
  </div>
);

export const Card3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleWindowMouseMove = (event) => {
    const xPct = event.clientX / window.innerWidth - 0.5;
    const yPct = event.clientY / window.innerHeight - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-72 h-[450px] rounded-xl"
    >
      <NeonGradientCard className="absolute inset-0">
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 rounded-xl bg-black/90 p-4 flex flex-col items-center justify-between"
        >
          <div
            className="w-full h-48 relative rounded-lg overflow-hidden mb-4"
            style={{ transform: "translateZ(50px)" }}
          >
            <Image
              src="/char.gif"
              alt="Character Animation"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div
            className="text-white text-xl font-bold mb-4"
            style={{ transform: "translateZ(25px)" }}
          >
            Master Baiter #1337
          </div>

          <div
            className="grid grid-cols-2 gap-2 w-full"
            style={{ transform: "translateZ(25px)" }}
          >
            <StatDisplay
              icon={Sword}
              label="STR"
              value={85}
              color="text-red-400"
            />
            <StatDisplay
              icon={Zap}
              label="DEX"
              value={92}
              color="text-yellow-400"
            />
            <StatDisplay
              icon={Brain}
              label="INT"
              value={78}
              color="text-blue-400"
            />
            <StatDisplay
              icon={Heart}
              label="VIT"
              value={88}
              color="text-green-400"
            />
          </div>
        </div>
      </NeonGradientCard>
    </motion.div>
  );
};