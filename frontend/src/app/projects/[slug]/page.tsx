import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ShareButton from "@/components/ShareButton";

const siteUrl = "https://alanmlcrt.fr";

async function getProject(slug: string) {
  const projects = await fetchStrapi(`projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`);
  return projects[0];
}

function buildProjectDescription(project: any) {
  const content = String(project?.content || "")
    .replace(/[#*_>`\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!content) return `Projet ${project?.title || "Alan Molcrette"} sur l'IoT et la supervision de données.`;

  return content.slice(0, 160).trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Projet introuvable | Alan Molcrette",
      description: "Le projet demandé n'a pas pu être trouvé.",
    };
  }

  const imageUrl = getStrapiMedia(project.image?.url);
  const title = project.title;
  const description = buildProjectDescription(project);

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${slug}`,
      type: "article",
      images: imageUrl ? [imageUrl] : ["/photo alan.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : ["/photo alan.jpg"],
    },
  };
}

const markdownComponents = {
  h2: ({node, ...props}: any) => <h2 className="text-white font-headline text-3xl font-bold mt-16 mb-8 uppercase tracking-tight border-l-4 border-orange-600 pl-6" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="text-orange-500 font-headline text-xl font-bold mt-12 mb-6 uppercase tracking-widest" {...props} />,
  blockquote: ({node, ...props}: any) => (
    <blockquote className="border-l-4 border-orange-600/30 bg-orange-600/5 p-8 my-10 italic text-gray-300 relative" {...props}>
        <span className="absolute top-4 left-4 text-6xl text-orange-600/10 font-black leading-none pointer-events-none select-none">“</span>
        {props.children}
    </blockquote>
  ),
  ul: ({node, ...props}: any) => <ul className="space-y-1 my-6 list-none p-0 whitespace-normal" {...props} />,
  li: ({node, ...props}: any) => (
    <li className="flex items-start gap-3" {...props}>
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></span>
      <span className="whitespace-normal">{props.children}</span>
    </li>
  ),
  a: ({node, ...props}: any) => (
    <a 
      className="text-orange-500 hover:text-orange-400 font-bold underline decoration-orange-500/30 underline-offset-4 transition-all hover:decoration-orange-500" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props} 
    />
  ),
  strong: ({node, ...props}: any) => <strong className="text-orange-500 font-bold" {...props} />,
  img: ({node, ...props}: any) => {
    const src = getStrapiMedia(props.src);
    
    if (!src) return null;

    return (
      <span className="block my-12 group relative w-full flex justify-center">
          <img 
              src={src}
              alt={props.alt || "Project image"}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain border border-white/5 transition-all duration-700 hover:scale-[1.01]" 
          />
          <span className="absolute -bottom-6 left-0 text-[10px] text-gray-500 font-headline tracking-widest uppercase border-l border-orange-600/50 pl-2">IMG_REF // {props.alt}</span>
      </span>
    );
  },
};

export default async function ProjectSingle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) return notFound();

  const imageUrl = getStrapiMedia(project.image?.url);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: buildProjectDescription(project),
    datePublished: project.date,
    dateModified: project.updatedAt || project.date,
    url: `${siteUrl}/projects/${slug}`,
    image: imageUrl ? [imageUrl] : [`${siteUrl}/photo alan.jpg`],
    author: {
      "@type": "Person",
      name: "Alan Molcrette",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "alanmlcrt",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/photo alan.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/projects/${slug}`,
    },
  };

  return (
    <article className="max-w-5xl mx-auto px-8 py-20 w-full relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 font-headline text-[10px] tracking-[0.3em] uppercase mb-12 transition-colors border-b border-white/5 pb-1">
        <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Archive
      </Link>
      
      <header className="mb-24 relative">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-orange-600"></span>
                <p className="text-orange-600 font-headline text-xs tracking-[0.4em] uppercase">
                    {project.category}
                </p>
            </div>
            
            <h1 className="font-headline text-white font-black text-5xl md:text-7xl tracking-tighter mb-8 uppercase leading-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-12 items-center border-t border-white/5 pt-8">
              <div>
                <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">AUTHOR</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden relative border border-orange-600/30">
                    <Image src="/photo alan.jpg" alt="Alan Molcrette" fill className="object-cover" />
                  </div>
                  <span className="text-gray-400 font-headline text-sm tracking-widest">Alan Molcrette</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">DATE_STAMP</p>
                <span className="text-gray-400 font-headline text-sm tracking-widest">{project.date}</span>
                {project.updatedAt && project.updatedAt !== project.date && (
                  <p className="text-[8px] text-gray-700 font-headline tracking-tighter mt-1 italic">
                    UPDATED: {new Date(project.updatedAt).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
              <div>
                <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">TYPE</p>
                <span className="text-orange-500 font-headline text-sm tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    {project.category}
                </span>
              </div>
              {project.status && (
                <div>
                  <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">STATUS</p>
                  <span className={`font-headline text-sm tracking-widest flex items-center gap-2 ${
                    (project.status?.toLowerCase() === 'published' || project.status?.toLowerCase() === 'publié') ? 'text-green-500' : 
                    (project.status?.toLowerCase() === 'in progress' || project.status?.toLowerCase() === 'in_progress' || project.status?.toLowerCase() === 'en cours') ? 'text-orange-500' : 
                    (project.status?.toLowerCase() === 'archived' || project.status?.toLowerCase() === 'archive' || project.status?.toLowerCase() === 'archivé') ? 'text-red-500' : 'text-gray-500'
                  }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        (project.status?.toLowerCase() === 'published' || project.status?.toLowerCase() === 'publié') ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 
                        (project.status?.toLowerCase() === 'in progress' || project.status?.toLowerCase() === 'in_progress' || project.status?.toLowerCase() === 'en cours') ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 
                        (project.status?.toLowerCase() === 'archived' || project.status?.toLowerCase() === 'archive' || project.status?.toLowerCase() === 'archivé') ? 'bg-red-500' : 'bg-gray-500'
                      }`}></span>
                      {(project.status || 'Active').replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              )}
              {project.tech_stack && (
                <div className="md:col-span-2 lg:col-span-1">
                  <p className="text-gray-600 font-headline text-[10px] tracking-widest uppercase mb-1">TECH_STACK</p>
                  <span className="text-gray-400 font-headline text-sm tracking-widest">
                    {project.tech_stack}
                  </span>
                </div>
              )}
            </div>
          </div>

          {imageUrl && (
            <div className="w-full md:w-96 lg:w-[450px] shrink-0 bg-surface-container-low border border-white/5 overflow-hidden group relative shadow-2xl shadow-orange-600/5">
                <img 
                    src={imageUrl} 
                    alt={project.title}
                    className="w-full h-auto transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-orange-600/20 backdrop-blur-md px-2 py-1 border border-orange-500/50 text-[8px] text-orange-500 font-headline tracking-widest uppercase">IMG_REF // {project.title}</div>
                </div>
            </div>
          )}
        </div>
      </header>

      <div className="space-y-12">
        <div className="max-w-4xl mx-auto space-y-12">


            <div className="space-y-24">
                {project.content && (
                   <div className="prose prose-invert prose-orange max-w-none font-light leading-relaxed text-gray-400 text-lg whitespace-pre-line">
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
      </div>

      <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center">
        <div className="flex gap-4">
          <ShareButton />
        </div>
        <Link href="/projects" className="border border-orange-600/30 text-orange-600 px-12 py-4 font-headline font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-orange-600/10 transition-all duration-300">
           TERMINATE_SESSION // EXIT
        </Link>
      </div>
    </article>
  );
}
