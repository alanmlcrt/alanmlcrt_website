"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  const navLinks = [
    { label: "ACCUEIL", href: "/" },
    { label: "À PROPOS", href: "/about" },
    { label: "PROJETS", href: "/projects" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-orange-600/20 flex justify-between items-center px-8 py-4">
      <Link href="/" className="text-2xl font-black text-orange-600 tracking-widest font-headline uppercase hover:scale-105 transition-transform flex items-center gap-2 group">
        <span className="text-glow">alanmlcrt</span>
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shadow-[0_0_10px_rgba(255,107,0,1)] group-hover:animate-ping"></span>
      </Link>
      
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

      </div>

      <div className="w-8 h-px bg-orange-600/20 hidden md:block"></div>
    </nav>
  );
}
