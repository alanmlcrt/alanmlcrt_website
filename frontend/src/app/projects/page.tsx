import Link from "next/link";
import { fetchStrapi } from "@/lib/strapi";

export default async function Projects() {
  const projects = await fetchStrapi('projects');

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 w-full">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-1 light-pipe"></span>
            <p className="text-orange-600 font-headline text-sm tracking-[0.6em] uppercase">Archive_System</p>
        </div>
        <h1 className="font-headline text-white font-black text-5xl md:text-8xl tracking-tighter mb-4 uppercase leading-none">
          PROJECT <span className="text-orange-600 text-glow">DOSSIER</span>
        </h1>
        <p className="text-gray-500 font-headline text-xs tracking-[0.4em] uppercase mt-4">
          Personal personal projects // Engineered view
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
        {projects.map((proj: any) => (
          <Link key={proj.id} href={`/projects/${proj.slug}`} className="group block h-full bg-[#050505] relative overflow-hidden">
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/[0.03] transition-colors duration-500"></div>
            
            <div className="p-10 h-full flex flex-col relative z-10">
              <div className="flex justify-between items-start mb-12">
                <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase border-l border-orange-600/30 pl-3">
                  {proj.category}
                </p>
                <span className="text-gray-800 font-headline text-xs group-hover:text-orange-600 transition-colors">/00{proj.documentId || proj.id}</span>
              </div>
              
              <h2 className="font-headline text-2xl font-bold text-white mb-6 group-hover:text-orange-400 transition-all duration-300 group-hover:translate-x-2">
                {proj.title}
              </h2>
              
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-12 flex-1 group-hover:text-gray-300 transition-colors">
                {proj.excerpt}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="space-y-1">
                    <p className="text-gray-700 font-headline text-[8px] tracking-widest">RELEASE_DATE</p>
                    <span className="text-gray-500 font-headline text-[10px] tracking-widest uppercase">
                    {proj.date ? proj.date.replace(/-/g, '.') : 'PENDING'}
                    </span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center border border-white/5 group-hover:border-orange-600/40 group-hover:rotate-45 transition-all duration-500">
                    <span className="material-symbols-outlined text-orange-600 text-sm group-hover:-rotate-45 transition-all">
                        north_east
                    </span>
                </div>
              </div>
            </div>

            {/* Grid Line Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-orange-600/20 transition-colors"></div>
            <div className="absolute top-0 right-0 h-full w-[1px] bg-white/5 group-hover:bg-orange-600/20 transition-colors"></div>
          </Link>
        ))}
      </div>

      {/* Background Decorative Element */}
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 bg-orange-600/5 blur-[150px] pointer-events-none -z-10"></div>
    </div>
  );
}
