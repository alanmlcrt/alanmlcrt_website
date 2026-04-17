import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Projets", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] mt-auto">
      <div className="w-full max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <p className="font-headline text-lg font-black text-orange-600 tracking-widest uppercase">
            ALANMLCRT
          </p>
          <p className="font-headline text-[10px] tracking-[0.4em] text-gray-700 uppercase">
            © {new Date().getFullYear()} // ALL_RIGHTS_RESERVED
          </p>
        </div>

        <div className="flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-headline text-[10px] tracking-widest text-gray-500 hover:text-orange-600 transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/alan-molcrette/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors">
            <span className="font-headline text-[10px] tracking-widest uppercase">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
