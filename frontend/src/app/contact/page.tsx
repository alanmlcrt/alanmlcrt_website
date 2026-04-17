"use client";

import SectionReveal from "@/components/SectionReveal";
import ParallaxBackground from "@/components/ParallaxBackground";
import CircuitBackground from "@/components/CircuitBackground";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ExternalLink, Link as LinkIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchStrapi } from "@/lib/strapi";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchStrapi("about");
        if (data && !Array.isArray(data)) setContactData(data);
      } catch (err) {
        console.error("Failed to load contact info from Strapi", err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const email = contactData?.email || "molcrette.alan@gmail.com";
  const linkedinUrl = contactData?.linkedinUrl || "https://www.linkedin.com/in/alan-molcrette/";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex-1 relative transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <ParallaxBackground />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-32 pb-20 relative z-10">
        <SectionReveal direction="down">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-orange-600"></span>
            <p className="text-orange-600 font-headline text-sm tracking-[0.5em] uppercase">SYSTEM_NODE_04 // CONTACT</p>
          </div>
          <h1 className="font-headline text-white font-black text-6xl md:text-9xl tracking-tighter mb-8 leading-none text-glow">
            GET IN <span className="text-orange-600">TOUCH</span>
          </h1>
          <p className="text-gray-400 font-headline text-xl md:text-2xl font-light tracking-widest max-w-2xl uppercase">
            Entrez en contact avec moi car un échange sera toujours plus humain et représentatif qu'une vitrine de mes expériences et compétences ;)
          </p>
        </SectionReveal>
      </section>

      {/* Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-8 py-20 relative z-10 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Email Card */}
          <SectionReveal direction="right" delay={0.1}>
            <div className="group relative bg-[#050505] border border-white/5 p-12 overflow-hidden h-full flex flex-col justify-between">


              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <div className="p-4 bg-orange-600/10 border border-orange-600/30">
                    <Mail className="text-orange-600" size={32} />
                  </div>
                  <div className="font-headline text-[10px] tracking-[0.4em] text-orange-600 opacity-40 group-hover:opacity-100 transition-opacity">
                    DIRECT_COMMS_PROTOCOL
                  </div>
                </div>

                <h2 className="font-headline text-white font-black text-4xl mb-4 tracking-tighter uppercase text-glow-primary">EMAIL</h2>
                <p className="text-gray-400 font-light text-lg mb-12 max-w-xs">
                  Si vous voulez en apprendre d'avantage sur mon profil ou pour toute autre question, contactez moi !
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${email}`}
                  className="flex-1 light-pipe text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  SEND_MESSAGE <ExternalLink size={14} />
                </a>
                <button
                  onClick={copyEmail}
                  className="flex-1 bg-white/5 border border-white/10 text-white px-8 py-4 font-headline font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  {copied ? (
                    <>COPIED <Check size={14} className="text-orange-500" /></>
                  ) : (
                    <>COPY_ADDRESS <Copy size={14} /></>
                  )}
                </button>
              </div>
            </div>
          </SectionReveal>

          {/* LinkedIn Card */}
          <SectionReveal direction="left" delay={0.2}>
            <div className="group relative bg-[#050505] border border-white/5 p-12 overflow-hidden h-full flex flex-col justify-between">


              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <div className="p-4 bg-orange-600/10 border border-orange-600/30">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-600"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div className="font-headline text-[10px] tracking-[0.4em] text-orange-600 opacity-40 group-hover:opacity-100 transition-opacity">
                    SOC_NETWORK_CORE
                  </div>
                </div>

                <h2 className="font-headline text-white font-black text-4xl mb-4 tracking-tighter uppercase text-glow-primary">LINKEDIN</h2>
                <p className="text-gray-400 font-light text-lg mb-12 max-w-xs">
                  Suivez mon activité et connectez-vous sur LinkedIn.
                </p>
              </div>

              <div className="relative z-10">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600/10 border border-orange-600/30 text-orange-600 px-8 py-4 font-headline font-bold uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2 hover:bg-orange-600/20 transition-colors"
                >
                  VIEW_PROFILE <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </SectionReveal>

        </div>
      </section>


      {/* Decorative Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,107,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0"></div>
    </div>
  );
}
