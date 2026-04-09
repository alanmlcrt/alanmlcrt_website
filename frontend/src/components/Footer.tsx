import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-orange-600/10 bg-[#050505] mt-auto">
      <div className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="font-['Manrope'] text-xs tracking-widest text-gray-600 uppercase">
          © 2024 THE NEON ARCHITECT. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-12">
          <Link className="font-['Manrope'] text-xs tracking-widest text-gray-600 hover:text-orange-400 transition-opacity duration-500 uppercase" href="#">
            PRIVACY
          </Link>
          <Link className="font-['Manrope'] text-xs tracking-widest text-gray-600 hover:text-orange-400 transition-opacity duration-500 uppercase" href="#">
            TERMS
          </Link>
          <Link className="font-['Manrope'] text-xs tracking-widest text-gray-600 hover:text-orange-400 transition-opacity duration-500 uppercase flex items-center gap-2" href="#">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SYSTEM_STATUS
          </Link>
        </div>
      </div>
    </footer>
  );
}
