import { MetadataRoute } from 'next';
import { fetchStrapi } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alanmlcrt.fr';

  // Fetch projects/articles to include them in the sitemap
  // Strapi v5 returns flat objects (no .attributes wrapper)
  const projects = await fetchStrapi('projects?fields[0]=slug&fields[1]=updatedAt');

  const projectEntries = Array.isArray(projects)
    ? projects
        .filter((project: any) => project?.slug)  // skip any malformed entries
        .map((project: any) => ({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        }))
    : [];

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