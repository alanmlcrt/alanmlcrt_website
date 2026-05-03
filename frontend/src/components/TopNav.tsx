"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { label: "ACCUEIL", href: "/" },
    { label: "À PROPOS", href: "/about" },
    { label: "PROJETS", href: "/projects" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-[#050505]/60 backdrop-blur-xl border-b border-orange-600/20 flex justify-between items-center px-8 py-4">
        <Link href="/" className="text-2xl font-black text-orange-600 tracking-widest font-headline uppercase hover:scale-105 transition-transform flex items-center gap-2 group">
          <span className="text-glow">alanmlcrt</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shadow-[0_0_10px_rgba(255,107,0,1)] group-hover:animate-ping"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline tracking-tighter uppercase text-sm transition-all duration-300 hover:scale-105
                  ${isActive
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-gray-400 hover:text-orange-400"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="w-8 h-px bg-orange-600/20"></div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-orange-600 hover:bg-orange-600/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-[#050505] flex flex-col pt-32 px-12"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
              <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-orange-600 blur-[120px] rounded-full"></div>
              <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-orange-600 blur-[100px] rounded-full"></div>
            </div>

            <div className="mb-12">
              <p className="text-orange-600 font-headline text-[10px] tracking-[0.4em] uppercase mb-2">SYSTEM_NAVIGATION // READY</p>
              <div className="h-[2px] w-12 bg-orange-600"></div>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-headline text-4xl font-black tracking-widest uppercase flex items-center gap-4 group
                        ${isActive ? "text-orange-600 text-glow" : "text-gray-600 hover:text-white"}`}
                    >
                      <span className={`text-xs ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>0{i + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto mb-16 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-headline text-gray-500 tracking-[0.3em]">
                <Terminal size={14} className="text-orange-600" />
                <span>USER_ACCESS: AUTHORIZED</span>
              </div>
              <p className="text-[10px] font-headline text-gray-700 tracking-widest">© ALANMLCRT // {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
