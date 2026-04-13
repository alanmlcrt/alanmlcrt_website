import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] mt-auto">
      <div className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="font-headline text-[10px] tracking-[0.4em] text-gray-700 uppercase">
          © {new Date().getFullYear()} ALAN MOLCRETTE // TOUS DROITS RÉSERVÉS
        </p>
        
        <div className="flex items-center gap-6">
            <div className="w-12 h-px bg-orange-600/20"></div>
            <p className="font-headline text-[10px] tracking-[0.4em] text-orange-600/40 uppercase">
              LILLE_SYSTEM_ACTIVE
            </p>
        </div>
      </div>
    </footer>
  );
}
