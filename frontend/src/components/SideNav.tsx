"use client";

import Link from "next/link";

export default function SideNav() {
  const sections = [
    { label: "OVERVIEW", href: "#hero", icon: "grid_view" },
    { label: "PROFIL", href: "#philosophy", icon: "person" },
    { label: "EXPÉRIENCES", href: "#timeline", icon: "work" },
    { label: "CORE STACK", href: "#stack", icon: "token" },
    { label: "PROJETS", href: "#projects", icon: "rocket" },
    { label: "FORMATION", href: "#education", icon: "school" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-orange-600/10 bg-[#0E0E0E] pt-32 pb-20 hidden xl:flex flex-col z-40">
      <div className="px-8 mb-12">
        <p className="text-orange-600 font-headline font-bold text-xs tracking-widest mb-1 uppercase">
          alanmlcrt // STUDIO
        </p>
        <p className="text-gray-500 font-headline text-[10px] tracking-[0.2em] uppercase">SYSTEMS ANALYSIS</p>
      </div>

      <nav className="flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
        {sections.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="flex items-center gap-4 pl-4 py-2 text-gray-500 hover:text-orange-400 hover:bg-white/5 border-l-4 border-transparent hover:border-orange-600 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
              {item.icon}
            </span>
            <span className="font-headline font-medium text-xs tracking-widest uppercase">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="px-8 mt-auto flex flex-col gap-6 pb-8">
        <button className="text-gray-500 hover:text-orange-400 font-headline text-[10px] tracking-widest text-left flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-sm">share</span> SHARE_INTEL
        </button>
        <Link 
          href="/projects" 
          className="border border-orange-600/30 text-orange-600 px-4 py-2 font-headline font-bold text-[10px] tracking-widest hover:bg-orange-600/10 transition-all uppercase text-center"
        >
          ARCHIVE_PROJETS
        </Link>
      </div>
    </aside>
  );
}
