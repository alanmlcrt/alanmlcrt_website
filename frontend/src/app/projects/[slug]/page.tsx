import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchStrapi } from "@/lib/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h2: ({node, ...props}: any) => <h2 className="text-white font-headline text-3xl font-bold mt-16 mb-8 uppercase tracking-tight border-l-4 border-orange-600 pl-6" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="text-orange-500 font-headline text-xl font-bold mt-12 mb-6 uppercase tracking-widest" {...props} />,
  blockquote: ({node, ...props}: any) => (
    <blockquote className="border-l-4 border-orange-600/30 bg-orange-600/5 p-8 my-10 italic text-gray-300 relative" {...props}>
        <span className="absolute top-4 left-4 text-6xl text-orange-600/10 font-black leading-none pointer-events-none select-none">“</span>
        {props.children}
    </blockquote>
  ),
  ul: ({node, ...props}: any) => <ul className="space-y-4 my-8 list-none p-0" {...props} />,
  li: ({node, ...props}: any) => (
    <li className="flex items-start gap-3" {...props}>
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></span>
      <span>{props.children}</span>
    </li>
  ),
  img: ({node, ...props}: any) => (
    <span className="block my-12 group relative aspect-video">
        <Image 
            src={props.src || ""}
            alt={props.alt || "Project image"}
            fill
            className="object-cover border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]" 
        />
        <span className="absolute -bottom-4 left-0 text-[10px] text-gray-600 font-headline tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">IMG_REF // {props.alt}</span>
    </span>
  ),
};

export default async function ProjectSingle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const populate = [
    'populate[image][populate]=*',
    'populate[specs][populate]=*',
  ].join('&');

  const projects = await fetchStrapi(`projects?filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}`);
  const project = projects[0];

  if (!project) return notFound();

  // Handle Strapi image format or fallback to local/external string
  const imageUrl = project.image?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${project.image.url}`
    : project.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200';

  return (
    <article className="max-w-5xl mx-auto px-8 py-20 w-full relative">
      <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 font-headline text-[10px] tracking-[0.3em] uppercase mb-12 transition-colors border-b border-white/5 pb-1">
        <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Archive
      </Link>
      
      <header className="mb-16 relative">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-[1px] bg-orange-600"></span>
            <p className="text-orange-600 font-headline text-xs tracking-[0.4em] uppercase">
                {project.category}
            </p>
        </div>
        
        <h1 className="font-headline text-white font-black text-5xl md:text-7xl tracking-tighter mb-8 uppercase leading-tight">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-12 items-center border-y border-white/5 py-8">
          <div>
            <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">DATE_STAMP</p>
            <span className="text-gray-400 font-headline text-sm tracking-widest">{project.date}</span>
          </div>
          <div>
            <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">STATUS</p>
            <span className="text-orange-500 font-headline text-sm tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {project.status}
            </span>
          </div>
          <div className="ml-auto">
             <button className="light-pipe text-on-primary px-6 py-2 font-headline font-bold uppercase text-[10px] tracking-widest transition-all hover:scale-105 active:scale-95">
                EXECUTE_PROJECT
             </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
            <div className="aspect-video bg-surface-container-low border border-white/5 overflow-hidden group relative">
                <Image 
                    src={imageUrl} 
                    alt={project.title}
                    fill
                    priority
                    className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
            </div>

            <div className="space-y-24">
                {project.content && (
                   <div className="prose prose-invert prose-orange max-w-none font-light leading-relaxed text-gray-400 text-lg">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                    >
                        {project.content}
                    </ReactMarkdown>
                   </div>
                )}
            </div>
        </div>

        <aside className="lg:col-span-4 space-y-12">
            <div className="bg-surface-container-lowest border border-white/5 p-8">
                <h3 className="text-white font-headline font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-orange-600"></span>
                    Project Specs
                </h3>
                <ul className="space-y-4">
                    {project.specs && project.specs.length > 0 ? (
                        project.specs.map((spec: any, idx: number) => (
                            <li key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                <span className="text-gray-500 font-headline tracking-widest">{spec.name}</span>
                                <span className="text-orange-600 material-symbols-outlined text-sm">check_circle</span>
                            </li>
                        ))
                    ) : (
                        ["Vector Scaling", "Quantum Grid", "High Chroma", "Luminance Control"].map((spec) => (
                            <li key={spec} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                <span className="text-gray-500 font-headline tracking-widest">{spec}</span>
                                <span className="text-orange-600 material-symbols-outlined text-sm">check_circle</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="p-8 border border-orange-600/10 bg-orange-600/5 group hover:bg-orange-600/10 transition-colors">
                <p className="text-gray-400 font-headline text-[10px] tracking-widest uppercase mb-4">WANT TO DISCUSS THIS SYSTEM?</p>
                <button className="text-orange-500 font-headline font-black text-lg tracking-tighter uppercase group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                    INITIATE_COMMS <span className="material-symbols-outlined">alternate_email</span>
                </button>
            </div>
        </aside>
      </div>

      <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
             <span className="material-symbols-outlined text-base">share</span>
          </button>
        </div>
        <Link href="/projects" className="border border-orange-600/30 text-orange-600 px-12 py-4 font-headline font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-orange-600/10 transition-all duration-300">
           TERMINATE_SESSION // EXIT
        </Link>
      </div>
    </article>
  );
}
