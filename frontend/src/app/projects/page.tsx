import Link from "next/link";
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import Image from "next/image";

export const metadata = {
  title: "Projets | Alan Molcrette",
  description: "Articles, projets et retours d'expérience autour de l'IoT, de la supervision de données et des systèmes connectés.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function Projects() {
  const projects = await fetchStrapi('projects?populate=*');

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 w-full">
      <div className="mb-20">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-1 light-pipe"></span>
                <p className="text-orange-600 font-headline text-sm tracking-[0.6em] uppercase">Archive_System // v0.4</p>
            </div>
            <h1 className="font-headline text-white font-black text-5xl md:text-8xl tracking-tighter mb-4 uppercase leading-none">
              PROJECT <span className="text-orange-600 text-glow">DOSSIER</span>
            </h1>
          </div>
          <div className="hidden md:block py-2 px-4 border border-orange-600/20 bg-orange-600/5 text-orange-600 font-headline text-[10px] tracking-widest translate-y-[-20px]">
            DATABASE_ENCRYPTED // {projects.length}_ENTRIES_LOADED
          </div>
        </div>
        <p className="text-gray-500 font-headline text-xs tracking-[0.4em] uppercase mt-4">
          Personal research projects // Engineered view
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
        {projects.length === 0 && (
          <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/10">
            <span className="material-symbols-outlined text-4xl text-gray-700 mb-4 italic">database_off</span>
            <p className="text-gray-600 font-headline text-xs tracking-widest uppercase">No data units found in dossier</p>
          </div>
        )}
        {projects.map((proj: any) => {
          const imageUrl = getStrapiMedia(proj.image?.url);
          
          return (
          <Link key={proj.id} href={`/projects/${proj.slug}`} className="group block h-full bg-[#050505] relative overflow-hidden">
            {/* Image Background */}
            {imageUrl && (
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <Image 
                  src={imageUrl} 
                  alt={proj.title} 
                  fill 
                  className="object-cover transition-all duration-700"
                />
              </div>
            )}
            
            {/* Image Placeholder if null */}
            {!imageUrl && (
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-50"></div>
            )}
            
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/[0.05] transition-colors duration-500 z-10"></div>
            
            <div className="p-10 h-full flex flex-col relative z-10">
              {/* Corner Notches */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-orange-600 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-orange-600 transition-colors"></div>

              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col gap-1">
                  <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase border-l border-orange-600/30 pl-3">
                    {proj.category || 'PROJECT'}
                  </p>
                  <p className={`text-[8px] font-headline tracking-tighter pl-3 ${
                    proj.status === 'Published' ? 'text-green-500/50' : 
                    proj.status === 'In Progress' ? 'text-orange-500/50' : 
                    proj.status === 'Archived' ? 'text-red-500/50' : 'text-gray-500/50'
                  }`}>STATUS: {(proj.status || 'ACTIVE').toUpperCase()}</p>
                </div>
                <span className="text-gray-800 font-headline text-xs group-hover:text-orange-600 transition-colors">ID_{proj.documentId?.slice(0, 6) || proj.id}</span>
              </div>
              
              <h2 className="font-headline text-2xl font-bold text-white mb-6 group-hover:text-orange-400 transition-all duration-300 group-hover:translate-x-2">
                {proj.title}
              </h2>
              {/* Excerpt removed */}
              
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
        )})}
      </div>

      {/* Background Decorative Element */}
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 bg-orange-600/5 blur-[150px] pointer-events-none -z-10"></div>
    </div>
  );
}
