"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Dynamic Glow 1 */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full"
      />
      
      {/* Dynamic Glow 2 */}
      <motion.div 
        style={{ y: y2, rotate: rotate }}
        className="absolute bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-primary-container/5 blur-[150px] rounded-full"
      />

      {/* Grid Pattern with Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute inset-0 opacity-[0.03]"
        line-data-pattern="grid"
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ff6b00 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </motion.div>
    </div>
  );
}
