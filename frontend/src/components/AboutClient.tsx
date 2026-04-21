"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, ExternalLink, GraduationCap, Briefcase, Rocket, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import ParallaxBackground from "@/components/ParallaxBackground";
import CircuitBackground from "@/components/CircuitBackground";

export default function AboutClient({ data }: { data: any }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [ctaActive, setCtaActive] = useState(false);

  // Defaults using the passed data
  const heroTitle = data.heroTitle || "ALAN MOLCRETTE";
  const heroSubtitle = data.heroSubtitle || "Industries Connectées // IoT // Data Supervision";
  const email = data.email || "molcrette.alan@gmail.com";
  const linkedinUrl = data.linkedinUrl || "https://www.linkedin.com/in/alan-molcrette/";
  const profileQuote = data.profileQuote || '"Mon parcours est guidé par une volonté de comprendre les systèmes dans leur globalité. De l\'électronique pure au déploiement logiciel, je vois chaque projet comme un puzzle complexe à optimiser pour l\'utilisateur final."';
  const profileSummary = data.profileSummary || "Ingénieur diplômé en électronique et informatique, spécialisé en IoT. Je souhaite mettre mes compétences au service de projets innovants au sein d'industries connectées pour optimiser les processus et valoriser la donnée.";
  const profileApproach = data.profileApproach || "Rigueur, curiosité et autonomie me permettent de m'adapter rapidement à de nouveaux environnements technologiques complexes.";
  
  const experiences = data.experiences && data.experiences.length > 0 ? data.experiences : [
    { title: "MAINTENANCE & DÉV. POWER BI", company: "ENEDIS", date: "FÉVRIER 2026 — AUJOURD'HUI", description: "Modernisation des processus métier via l'évolution d'outils digitaux. Gain de temps et amélioration de l'expérience utilisateur.", isCurrent: true },
    { title: "AMÉLIORATION SOLUTION DATAVIZ", company: "RTE", date: "SEPT. 2025 — DÉC. 2025", description: "Déploiement national de l'outil développé en stage. Extension des gains d'efficacité à l'échelle nationale.", isCurrent: false },
    { title: "STAGE DATAVIZ & ETL", company: "RTE", date: "FÉVRIER 2025 — AOÛT 2025", description: "Développement d'outils avec Power BI et Python. Création d'ETL SQL/Python automatisant le traitement des données.", isCurrent: false },
    { title: "RESEARCH STAGE (PIXHAWK/LORA)", company: "UQAR (CANADA)", date: "MAI 2024 — JUILLET 2024", description: "Contrôle de vol autonome Pixhawk et réseau mesh LoRa. Analyse de signaux série entre Pixhawk et ESP32.", isCurrent: false }
  ];

  const featuredProjects = data.featuredProjects || [];

  const skills = data.skills && data.skills.length > 0 ? data.skills : [
    { icon: "memory", label: "ESP32 / PI\nIOT PROTOCOLS" },
    { icon: "analytics", label: "POWER BI\nSUPERVISION" },
    { icon: "database", label: "SQL / MONGO\nSUPABASE" },
    { icon: "terminal", label: "PYTHON\nAUTOMATISATION" },
    { icon: "layers", label: "DOCKER\nCI/CD" },
    { icon: "hub", label: "MQTT / LORA\nZIGBEE" }
  ];

  const educations = data.educations && data.educations.length > 0 ? data.educations : [
    { title: "JUNIA ISEN, Lille", date: "2022 — 2025", description: "Diplôme d'Ingénieur en Électronique et Numérique." },
    { title: "Lycée Robespierre, Arras", date: "2020 — 2022", description: "CPGE MPSI/PSI (Physique et Sciences de l'Ingénieur)." }
  ];

  const interests = data.interests && data.interests.length > 0 ? data.interests : [
    { label: "ASTRONOMIE", icon: "flare" },
    { label: "COURSE À PIED", icon: "directions_run" },
    { label: "VÉLO", icon: "directions_bike" },
    { label: "PHOTOGRAPHIE", icon: "photo_camera" }
  ];

  const languages = data.languages && data.languages.length > 0 ? data.languages : [
    { name: "ANGLAIS", fluencyText: "NIVEAU TECHNIQUE", level: "B2", percentage: 75 },
    { name: "ALLEMAND", fluencyText: "CONNAISSANCES", level: "A2", percentage: 40 }
  ];

  return (
    <div ref={containerRef} className="flex-1 relative">
      <ParallaxBackground />

      {/* Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-8 py-32 relative min-h-[70vh] flex flex-col justify-center scroll-mt-24">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          <SectionReveal direction="down">
            <div className="flex items-center gap-4 mb-6">
                <span className="w-8 md:w-12 h-[1px] bg-orange-600"></span>
                <p className="text-orange-600 font-headline text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.5em] uppercase whitespace-nowrap">INGÉNIEUR_DIPLÔMÉ_JUNIA_ISEN</p>
            </div>
            <h1 className="font-headline text-white font-black text-6xl md:text-9xl tracking-tighter mb-4 leading-none text-glow">
              {heroTitle.split(' ')[0]} <span className="text-orange-600">{heroTitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <h2 className="font-headline text-2xl md:text-3xl text-gray-400 font-light tracking-[0.2em] mb-12 uppercase">
                {heroSubtitle}
            </h2>
            
            <div className="flex flex-wrap gap-8 items-center">
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
                    <span className="font-headline text-xs tracking-widest uppercase">{email}</span>
                </a>
                <a href={linkedinUrl} target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>link</span>
                    <span className="font-headline text-xs tracking-widest uppercase">LinkedIn Profile</span>
                </a>
            </div>
          </SectionReveal>
        </motion.div>
      </section>

      {/* Profil Section */}
      <section id="philosophy" className="max-w-7xl mx-auto px-8 mb-16 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <SectionReveal direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-orange-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="aspect-[4/5] bg-zinc-950 relative overflow-hidden border border-white/10 ring-1 ring-orange-600/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600/5 via-transparent to-transparent"></div>
                  <div className="w-full h-full relative border-white/5 group-hover:scale-105 transition-transform duration-1000">
                    <Image 
                      src="/photo alan.jpg" 
                      alt="Alan Molcrette" 
                      fill 
                      priority
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                    
                    <div className="absolute top-8 left-8">
                        <div className="w-16 h-16 rounded-full bg-orange-600/20 p-0.5 opacity-90 backdrop-blur-md shadow-[0_0_20px_rgba(255,107,0,0.3)] border border-orange-600/50">
                            <div className="w-full h-full rounded-full bg-zinc-950/90 flex items-center justify-center">
                                <span className="font-headline text-xl font-black text-orange-600">AM</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-24 left-8 transition-transform duration-500 group-hover:translate-x-2">
                        <p className="font-headline text-white text-2xl font-black tracking-widest mb-1 uppercase text-glow">{heroTitle}</p>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                            <p className="font-headline text-orange-500 text-[10px] font-bold tracking-[0.4em] uppercase">23 ANS // LILLE_SYSTEM_ACTIVE</p>
                        </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 bg-orange-600 w-full opacity-80">
                    <p className="font-headline font-bold text-white tracking-[0.3em] text-[10px] uppercase flex items-center gap-2">
                        <Star size={12} fill="currentColor" /> PLURIDISCIPLINAIRE // CURIEUX // AUTONOME
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 border-l-2 border-orange-600/30 bg-white/[0.02]">
                    <p className="text-orange-600 font-headline text-[10px] tracking-widest uppercase mb-3">SYSTEM_LOG // NOTE_PERSONNELLE</p>
                    <p className="text-gray-400 font-light italic text-sm leading-relaxed">
                        {profileQuote}
                    </p>
                </div>
              </div>
            </SectionReveal>
          </div>
          <div className="md:col-span-7">
            <SectionReveal direction="left" delay={0.2}>
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-orange-600 text-3xl text-glow">person_search</span>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-white uppercase text-glow-primary">PROFIL // RÉSUMÉ_SYSTÈME</h2>
              </div>
              <div className="space-y-8 text-gray-400 text-xl leading-relaxed font-light">
                <p>{profileSummary}</p>
                <div className="pt-8 border-t border-white/5">
                    <h4 className="text-white font-headline text-xs tracking-widest font-bold mb-4 uppercase">Soft Skills</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">{profileApproach}</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="timeline" className="py-12 border-y border-white/5 mb-32 scroll-mt-24 relative overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <SectionReveal>
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-4">
                    <Briefcase className="text-orange-600" size={24} />
                    <h2 className="font-headline text-5xl font-black tracking-widest text-white uppercase text-glow-primary">EXPÉRIENCES</h2>
                </div>
              <p className="text-orange-600 font-headline text-sm tracking-[0.5em] uppercase opacity-60">Log chronologique professionnel</p>
            </div>
          </SectionReveal>

          <div className="relative space-y-32 before:absolute before:left-0 md:before:left-1/2 before:top-0 before:h-full before:w-[1px] before:bg-orange-600/10">
            {experiences.map((item: any, i: number) => {
              const side = i % 2 === 0 ? "right" : "left";
              return (
              <SectionReveal key={i} direction={side === "right" ? "left" : "right"}>
                <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                  {side === "right" ? (
                    <>
                      {/* Conteneur de texte avec padding sur mobile pour éviter l'overlap */}
                      <div className="w-full md:w-[45%] pl-10 md:pl-0 md:text-right">
                        <h3 className="text-orange-600 font-headline font-bold text-2xl mb-1 uppercase text-glow">{item.title}</h3>
                        <div className="flex items-center gap-2 md:justify-end mb-4 opacity-80">
                           <p className="text-white font-headline text-sm tracking-widest">{item.company} // {item.date}</p>
                           <span className="w-1.5 h-1.5 rounded-none rotate-45 bg-orange-600 animate-pulse"></span>
                        </div>
                        <p className="text-gray-400 font-light text-lg italic leading-relaxed">{item.description}</p>
                      </div>
                      {/* Point de timeline corrigé pour mobile/desktop */}
                      <div className="absolute left-[-8px] md:left-1/2 md:-ml-2 top-2 md:top-auto w-4 h-4 z-10 flex items-center justify-center">
                        <div className={`w-3 h-3 rotate-45 border border-orange-600/50 bg-black transition-all duration-500 ${item.isCurrent ? 'shadow-[0_0_15px_rgba(255,107,0,0.8)] border-orange-500 bg-orange-600' : 'group-hover:border-orange-500 group-hover:bg-orange-600/20'}`}></div>
                        {item.isCurrent && <div className="absolute inset-0 rotate-45 border border-orange-600/20 animate-ping"></div>}
                      </div>
                      <div className="hidden md:block md:w-[45%]"></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block md:w-[45%]"></div>
                      {/* Point de timeline corrigé pour mobile/desktop */}
                      <div className="absolute left-[-8px] md:left-1/2 md:-ml-2 top-2 md:top-auto w-4 h-4 z-10 flex items-center justify-center">
                        <div className={`w-3 h-3 rotate-45 border border-orange-600/50 bg-black transition-all duration-500 group-hover:border-orange-500 group-hover:bg-orange-600/20`}></div>
                      </div>
                      {/* Conteneur de texte avec padding sur mobile pour éviter l'overlap */}
                      <div className="w-full md:w-[45%] pl-10 md:pl-0 text-left">
                        <h3 className="text-white font-headline font-bold text-2xl mb-1 uppercase text-glow-primary">{item.title}</h3>
                        <div className="flex items-center gap-2 mb-4 opacity-80">
                           <span className="w-1.5 h-1.5 rounded-none rotate-45 bg-orange-600 animate-pulse"></span>
                           <p className="text-orange-600 font-headline text-sm tracking-widest">{item.company} // {item.date}</p>
                        </div>
                        <p className="text-gray-400 font-light text-lg italic leading-relaxed">{item.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </SectionReveal>
            )})}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="max-w-7xl mx-auto px-8 mb-32 scroll-mt-24">
        <SectionReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="font-headline text-3xl md:text-5xl font-black tracking-widest text-white mb-2 uppercase text-glow-primary">CORE STACK</h2>
              <p className="text-orange-600 font-headline text-sm tracking-[0.5em] uppercase opacity-60">Compétences techniques & de supervision</p>
            </div>
            <div className="h-[1px] flex-1 bg-white/5 mx-8 hidden md:block"></div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill: any, i: number) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="bg-zinc-900/40 border border-white/5 p-8 flex flex-col items-center justify-center text-center group hover:border-orange-600/40 hover:bg-orange-600/[0.02] transition-all duration-500 aspect-square border-b-2 hover:border-b-orange-600 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-600/50 opacity-0 group-hover:block group-hover:animate-[scan_1.5s_linear_infinite] pointer-events-none"></div>
                <span className="material-symbols-outlined text-4xl text-orange-600 mb-6 group-hover:scale-110 transition-transform text-glow">{skill.icon}</span>
                <h4 className="font-headline text-[10px] font-bold text-white tracking-widest uppercase whitespace-pre-line leading-loose">{skill.label}</h4>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      {featuredProjects.length > 0 && (
        <section id="projects" className="max-w-7xl mx-auto px-8 mb-32 scroll-mt-24">
          <SectionReveal>
              <div className="flex items-center gap-4 mb-20">
                  <Rocket className="text-orange-600" size={24} />
                  <h2 className="font-headline text-3xl md:text-5xl font-black tracking-widest text-white uppercase text-glow-primary">PROJETS_PHARES</h2>
              </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredProjects.slice(0, 2).map((proj: any, i: number) => (
                  <SectionReveal key={proj.slug} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.2}>
                      <motion.div 
                          whileHover={{ 
                              y: -6, 
                              scale: 1.005,
                              boxShadow: "0 15px 30px -10px rgba(255, 107, 0, 0.25)"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="bg-zinc-950/30 border border-white/5 p-12 relative overflow-hidden group h-full cursor-pointer"
                      >
                          <motion.div 
                              variants={{ hover: { opacity: 0.3, scale: 1.4 } }}
                              initial={{ opacity: 0 }}
                              className="absolute inset-0 bg-orange-600/15 blur-[100px] pointer-events-none transition-opacity duration-500"
                          />

                          <div className="relative z-10">
                              <p className="text-orange-600 font-headline text-[10px] tracking-widest uppercase border-l-2 border-orange-600 pl-4 mb-8">
                                  {proj.category || 'PROJET_PHARE'}
                              </p>
                              <h3 className="text-white font-headline text-3xl font-bold mb-6 tracking-tighter uppercase">{proj.title}</h3>
                              <p className="text-gray-400 font-light text-lg leading-relaxed mb-10">
                                  {proj.description || (proj.content ? proj.content.split('\n')[0].replace(/#+\s*/, '').slice(0, 150) + '...' : 'Pas de description disponible.')}
                              </p>
                              <div className="flex gap-6">
                                  <Link href={`/projects/${proj.slug}`} className="text-orange-500 font-headline text-xs font-black tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                                      READ_MORE <ExternalLink size={14} />
                                  </Link>
                              </div>
                          </div>
                      </motion.div>
                  </SectionReveal>
              ))}
          </div>
        </section>
      )}

      {/* Education & Info Section */}
      <section id="education" className="max-w-7xl mx-auto px-8 mb-24 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <SectionReveal direction="right">
                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <GraduationCap className="text-orange-600" size={28} />
                        <h3 className="text-white font-headline text-3xl font-black uppercase tracking-widest text-glow-primary">FORMATION</h3>
                    </div>
                    <div className="space-y-12 pl-4 border-l border-white/5">
                        {educations.map((edu: any, i: number) => (
                          <div key={i} className="relative">
                              <span className={`absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-orange-600' : 'bg-zinc-800'}`}></span>
                              <h4 className="text-white font-headline text-xl font-bold mb-1 uppercase">{edu.school || edu.title}</h4>
                              <p className={`${i === 0 ? 'text-orange-600' : 'text-gray-500'} font-headline text-xs tracking-widest mb-4`}>{edu.date}</p>
                              <p className="text-gray-400 leading-relaxed text-lg font-light">{edu.description}</p>
                          </div>
                        ))}
                    </div>
                </div>
            </SectionReveal>

            <SectionReveal direction="left" delay={0.2}>
                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Sparkles className="text-orange-600" size={28} />
                        <h3 className="text-white font-headline text-3xl font-black uppercase tracking-widest text-glow-primary">INTÉRÊTS</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
                        {interests.map((item: any, i: number) => (
                            <motion.div 
                              key={i} 
                              whileHover="hover"
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                              className="bg-black/30 p-8 text-center group flex flex-col items-center gap-4 cursor-default relative overflow-hidden"
                            >
                                <motion.div
                                  variants={{
                                      hover: { scale: 1.05, backgroundColor: "rgba(234, 88, 12, 0.1)" }
                                  }}
                                  className="absolute inset-0 z-0"
                                />
                                <motion.span 
                                  variants={{
                                    hover: { scale: 1.2, color: "#ea580c" }
                                  }}
                                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                  className="material-symbols-outlined text-orange-600/40 text-2xl relative z-10"
                                >
                                  {item.icon}
                                </motion.span>
                                <span className="text-gray-400 font-headline text-[10px] tracking-[0.4em] uppercase group-hover:text-orange-500 transition-colors">
                                  {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="space-y-4 pt-12">
                        <p className="text-orange-600 font-headline text-xs font-bold tracking-[0.4em] uppercase mb-6 flex items-center gap-2">
                             <span className="material-symbols-outlined text-sm">language</span> LANGUES / GLOBAL_VIEW
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {languages.map((lang: any, i: number) => (
                             <div key={i} className="p-4 border border-white/5 bg-white/[0.02] group hover:border-orange-600/40 transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 py-1 px-2 bg-orange-600/10 text-[6px] text-orange-500 font-headline tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">AUTHORIZED</div>
                                 <p className="text-white font-headline text-xs font-bold tracking-widest mb-1 uppercase">{lang.name}</p>
                                 <p className="text-gray-500 font-headline text-[10px] tracking-widest uppercase mb-3">{lang.fluencyText}</p>
                                 <div className="flex items-center gap-4">
                                     <span className={`${i === 0 ? 'text-orange-600 text-glow' : 'text-gray-400'} font-headline text-xl font-black`}>{lang.level}</span>
                                     <div className="h-[2px] flex-1 bg-white/10 relative overflow-hidden">
                                         <div className={`absolute inset-0 ${i === 0 ? 'bg-orange-600 shadow-[0_0_10px_rgba(255,107,0,0.8)]' : 'bg-gray-500'}`} style={{ width: `${lang.percentage || 50}%` }}></div>
                                     </div>
                                 </div>
                              </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <SectionReveal>
          <div className="bg-[#050505] p-16 md:p-32 relative overflow-hidden border border-white/5">
            <CircuitBackground active={ctaActive} originX={0.5} originY={0.72} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-[1] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60 z-[1] pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className={`px-4 py-1 border font-headline text-[10px] tracking-[0.5em] uppercase transition-all duration-700 ${
                  ctaActive
                    ? 'border-orange-600/70 bg-orange-600/15 text-orange-500 shadow-[0_0_20px_rgba(255,107,0,0.4)]'
                    : 'border-orange-600/30 bg-orange-600/5 text-orange-600'
                }`}>READY_FOR_ENGAGEMENT // PHASE_04</div>
              </div>
              <h2 className={`font-headline text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter uppercase transition-all duration-700 ${
                ctaActive ? 'text-glow' : 'text-glow-primary'
              }`}>DISPONIBLE POUR COMMENCER LA PROCHAINE PHASE</h2>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <a
                  href={`mailto:${email}`}
                  onMouseEnter={() => setCtaActive(true)}
                  onMouseLeave={() => setCtaActive(false)}
                  className={`bg-orange-600 text-white px-16 py-5 font-headline font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto text-center border border-white/20 cursor-pointer ${
                    ctaActive ? 'shadow-[0_0_60px_rgba(255,107,0,0.8)]' : 'shadow-[0_0_20px_rgba(255,107,0,0.2)]'
                  }`}
                >
                  ÉTABLIR LA CONNEXION
                </a>
                <a href={linkedinUrl} target="_blank" className="bg-black/40 backdrop-blur-md border border-orange-600/30 text-orange-600 px-16 py-5 font-headline font-bold uppercase tracking-[0.2em] text-sm hover:bg-orange-600/10 transition-all duration-300 w-full md:w-auto text-center flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>link</span>
                    LIEN LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>
      
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 bg-orange-600/5 blur-[150px] pointer-events-none -z-10"></div>
    </div>
  );
}
