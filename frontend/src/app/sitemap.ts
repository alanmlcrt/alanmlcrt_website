import { MetadataRoute } from 'next';
import { fetchStrapi } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alanmlcrt.fr';

  // Fetch projects/articles to include them in the sitemap
  const projects = await fetchStrapi('projects?populate=*');
  
  const projectEntries = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.attributes.slug}`,
    lastModified: new URLSearchParams(project.attributes.updatedAt).toString(), // simplified
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...projectEntries,
  ];
}