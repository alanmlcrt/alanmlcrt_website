"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  const navLinks = [
    { label: "ACCUEIL", href: "/" },
    { label: "À PROPOS", href: "/about" },
    { label: "PROJETS", href: "/projects" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-orange-600/20 flex justify-between items-center px-8 py-4">
      <Link href="/" className="text-2xl font-black text-orange-600 tracking-widest font-headline uppercase hover:scale-105 transition-transform">alanmlcrt</Link>
      
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
        <Link 
          className={`font-headline tracking-tighter uppercase text-sm transition-all duration-300 hover:scale-105
            ${pathname === "/contact" 
              ? "text-orange-500 border-b-2 border-orange-500 pb-1" 
              : "text-gray-400 hover:text-orange-400"
            }`} 
          href="#"
        >
          CONTACT
        </Link>
      </div>

      <button className="light-pipe text-on-primary px-6 py-2 font-headline font-bold uppercase text-sm tracking-widest hover:scale-105 active:opacity-80 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
        START PROJECT
      </button>
    </nav>
  );
}
