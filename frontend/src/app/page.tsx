"use client";

import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import ParallaxBackground from "@/components/ParallaxBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-8 text-center relative z-10">
        <motion.div style={{ y: textY }} className="max-w-4xl">
          <SectionReveal direction="down">
            <h1 className="font-headline text-white font-black text-6xl md:text-[10rem] tracking-tighter mb-8 leading-[0.85] text-glow">
              ALAN <span className="text-orange-600">MOLCRETTE</span>
            </h1>
          </SectionReveal>
          
          <SectionReveal delay={0.2}>
            <p className="text-body text-2xl text-gray-400 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
              Ingénieur diplômé spécialisé en <span className="text-white">Industries Connectées & IoT</span>. 
              Optimisation des processus et supervision de données critiques.
            </p>
          </SectionReveal>
          
          <SectionReveal delay={0.4} direction="up">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <Link href="/projects" className="light-pipe text-on-primary px-12 py-5 font-headline font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                EXPLORE_PROJECTS
              </Link>
              <Link href="/about" className="group border border-orange-600/20 text-orange-600 px-12 py-5 font-headline font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-orange-600/10 transition-all duration-300 flex items-center gap-4">
                SYSTEM_DOSSIER
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </SectionReveal>
        </motion.div>
      </div>

      {/* Decorative Grid Sections */}
      <section className="py-40 border-t border-white/5 bg-[#080808]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20">
          <SectionReveal direction="right">
            <div className="space-y-6">
              <p className="text-orange-600 font-headline text-xs tracking-widest uppercase">/DESIGN_PHILOSOPHY</p>
              <h2 className="font-headline text-4xl text-white font-bold uppercase text-glow-primary">Architectural Logic</h2>
              <p className="text-gray-400 font-light text-xl leading-relaxed">Every pixel is engineered for precision. We don&apos;t just build websites; we construct high-performance digital environments.</p>
            </div>
          </SectionReveal>
          <SectionReveal direction="left" delay={0.2}>
            <div className="space-y-6">
              <p className="text-orange-600 font-headline text-xs tracking-widest uppercase">/TECHNICAL_STACK</p>
              <h2 className="font-headline text-4xl text-white font-bold uppercase text-glow-primary">Vector-Path Connectivity</h2>
              <p className="text-gray-400 font-light text-xl leading-relaxed">Utilizing React, Next.js, and WebGL to create interfaces that respond with zero-latency and maximum luminance.</p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
