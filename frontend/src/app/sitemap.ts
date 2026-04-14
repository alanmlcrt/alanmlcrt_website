import type { MetadataRoute } from "next";
import { fetchStrapi } from "@/lib/strapi";

const siteUrl = "https://alanmlcrt.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchStrapi("projects?populate=*");

  const projectUrls = Array.isArray(projects)
    ? projects
        .filter((project) => project?.slug)
        .map((project) => ({
          url: `${siteUrl}/projects/${project.slug}`,
          lastModified: project.date ? new Date(project.date) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
    : [];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...projectUrls,
  ];
}