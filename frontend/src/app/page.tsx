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
              Ingénieur diplômé en <span className="text-white">éléctronique et informatique, spécialisé en IoT</span>.
              Optimisation des processus et supervision de données critiques.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4} direction="up">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <Link href="/projects" className="light-pipe text-on-primary px-12 py-5 font-headline font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                EXPLORE_PROJECTS
              </Link>
              <Link href="/about" className="group border border-orange-600/20 text-orange-600 px-12 py-5 font-headline font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-orange-600/10 transition-all duration-300 flex items-center gap-4">
                MY_CV
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </SectionReveal>
        </motion.div>
      </div>

      {/* Why this site section */}
      <section className="py-40 relative z-10 bg-[#020202] border-t border-white/5 overflow-hidden">
        {/* Glowing Grid Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] pointer-events-none perspective-[1000px]">
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#020202] to-transparent"></div>
        </div>

        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <SectionReveal direction="up">
            <div className="flex flex-col items-start border-l border-orange-600/40 pl-8 md:pl-16 relative group hover:border-orange-600 transition-colors duration-500">
              <span className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-none rotate-45 bg-orange-600 shadow-[0_0_15px_rgba(255,107,0,1)] group-hover:scale-150 transition-transform duration-500"></span>

              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-orange-600 text-sm">terminal</span>
                <p className="text-orange-600 font-headline text-[10px] tracking-[0.4em] uppercase">/LOGS_MANIFESTO</p>
              </div>

              <h2 className="font-headline text-4xl md:text-6xl text-white font-black uppercase tracking-tight mb-12">
                Pourquoi <span className="text-orange-600">ce site ?</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-400 font-light text-lg md:text-xl leading-relaxed">
                <div className="space-y-8">
                  <p>
                    C&apos;est difficile de mettre en valeur ses compétences sur une seule page de CV. Un site personnalisé est une manière originale de se mettre en avant. C&apos;est aussi un petit projet que j&apos;avais : <span className="text-white">héberger mon propre site web sur un VPS en partant de zéro</span>. Ce VPS me servira aussi pour d&apos;autres projets à l'avenir.
                  </p>
                  <p>
                    Sur ce site, il y a une touche de personnalisation, mais il y aura également des expériences et projets plus personnels que je mettrai en avant. Ce seront des petits projets qui ne mériteront pas forcément un post, ou bien une ligne sur le CV, mais qui mériteront d&apos;être mentionnés ici.
                  </p>
                </div>
                <div className="space-y-8">
                  <p>
                    Car oui, comme mentionné dans mon profil, je suis quelqu&apos;un de curieux et pluridisciplinaire, et j&apos;aime toucher à tout. <span className="text-orange-600/80">Chaque jour, je m&apos;informe, j&apos;apprends, je bidouille, je bricole car il n'y a qu'en faisant qu'on apprends. Il est impossible d'apprendre sans expérimenter.</span>
                  </p>
                  <p>
                    J&apos;estime que ces petites expériences valent la peine d&apos;être mises en avant quelque part pour tracer mon savoir au fil du temps. Ce sont des petits projets qui peuvent attirer l'attention et qui peuvent aider les autres.
                  </p>
                </div>
              </div>

              <div className="mt-16 flex items-center gap-4 py-4 px-8 border border-white/5 bg-white/[0.02]">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                <p className="font-headline text-[10px] tracking-[0.3em] text-gray-500 uppercase">STATUS: SYSTEM_SELF_HOSTED // VPS_READY</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
