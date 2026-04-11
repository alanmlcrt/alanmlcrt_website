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

      {/* Tech Interface Grid */}
      <section className="py-40 relative z-10 bg-[#020202] border-t border-white/5 overflow-hidden">
        {/* Glowing Grid Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] pointer-events-none perspective-[1000px]">
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#020202] to-transparent"></div>
        </div>
        
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
          <SectionReveal direction="right">
            <div className="flex flex-col items-start border-l border-orange-600/40 pl-8 relative group hover:border-orange-600 transition-colors duration-500">
              <span className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-none rotate-45 bg-orange-600 shadow-[0_0_15px_rgba(255,107,0,1)] group-hover:scale-150 transition-transform duration-500"></span>
              
              <div className="flex items-center gap-2 mb-6">
                 <span className="material-symbols-outlined text-orange-600 text-sm">hub</span>
                 <p className="text-orange-600 font-headline text-[10px] tracking-[0.4em] uppercase">/SYNAPSE_CORE_SYS</p>
              </div>
              
              <h2 className="font-headline text-4xl md:text-5xl text-white font-black uppercase tracking-tight mb-8">
                Data <br className="hidden md:block"/> Supervision
              </h2>
              
              <p className="text-gray-400 font-light text-xl leading-relaxed mb-8">
                De la couche réseau brute jusqu&apos;à l&apos;interface décisionnelle. Ingénierie d&apos;architectures résilientes pour la captation, le routage et la valorisation temps réel des données expertes.
              </p>

              <div className="flex flex-wrap gap-3">
                 <span className="px-3 py-1 border border-orange-600/30 text-orange-500 font-headline text-[10px] tracking-widest uppercase bg-orange-600/5">ETL PIPELINES</span>
                 <span className="px-3 py-1 border border-orange-600/30 text-orange-500 font-headline text-[10px] tracking-widest uppercase bg-orange-600/5">POWER BI</span>
                 <span className="px-3 py-1 border border-orange-600/30 text-orange-500 font-headline text-[10px] tracking-widest uppercase bg-orange-600/5">REACT / METRICS</span>
              </div>
            </div>
          </SectionReveal>
          
          <SectionReveal direction="left" delay={0.2}>
            <div className="flex flex-col items-start border-l border-[#00F0FF]/40 pl-8 relative group hover:border-[#00F0FF] transition-colors duration-500 h-full">
              <span className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-none rotate-45 bg-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,1)] group-hover:scale-150 transition-transform duration-500"></span>
              
              <div className="flex items-center gap-2 mb-6">
                 <span className="material-symbols-outlined text-[#00F0FF] text-sm">memory</span>
                 <p className="text-[#00F0FF] font-headline text-[10px] tracking-[0.4em] uppercase">/HARDWARE_LAYER</p>
              </div>
              
              <h2 className="font-headline text-4xl md:text-5xl text-white font-black uppercase tracking-tight mb-8">
                IoT <br className="hidden md:block"/> Convergence
              </h2>
              
              <p className="text-gray-400 font-light text-xl leading-relaxed mb-8">
                Pilotage matériel ultra-basse latence. Intégration de microcontrôleurs (ESP32) paramétrés en mesh pour l&apos;extraction fiable de la télémétrie critique sur site industriel.
              </p>

              <div className="flex flex-wrap gap-3 mt-auto">
                 <span className="px-3 py-1 border border-[#00F0FF]/30 text-[#00F0FF] font-headline text-[10px] tracking-widest uppercase bg-[#00F0FF]/5">MQTT / LORA</span>
                 <span className="px-3 py-1 border border-[#00F0FF]/30 text-[#00F0FF] font-headline text-[10px] tracking-widest uppercase bg-[#00F0FF]/5">ESP32 / SENSORS</span>
                 <span className="px-3 py-1 border border-[#00F0FF]/30 text-[#00F0FF] font-headline text-[10px] tracking-widest uppercase bg-[#00F0FF]/5">EDGE COMPUTE</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
