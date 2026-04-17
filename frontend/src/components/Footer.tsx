import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Projets", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-4">
          <p className="font-headline text-[10px] tracking-[0.4em] uppercase">
            © {new Date().getFullYear()} // ALANMLCRT
          </p>
        </div>

        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-headline text-[8px] tracking-[0.3em] hover:text-orange-600 transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
          <a href="https://www.linkedin.com/in/alan-molcrette/" target="_blank" rel="noopener noreferrer" className="font-headline text-[8px] tracking-[0.3em] hover:text-orange-600 transition-colors uppercase">
            LI
          </a>
        </div>
      </div>
    </footer>
  );
}
