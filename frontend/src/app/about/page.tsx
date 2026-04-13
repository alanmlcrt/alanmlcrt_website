import { fetchStrapi } from "@/lib/strapi";
import AboutClient from "@/components/AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Alan Molcrette",
  description: "Découvrez mon parcours d'ingénieur en électronique et informatique spécialisé en IoT et Dataviz.",
};

export default async function AboutPage() {
  let aboutData = null;
  
  try {
    const populate = 'populate[experiences]=*&populate[skills]=*&populate[educations]=*&populate[interests]=*&populate[languages]=*&populate[featuredProjects][populate]=*';
    const data = await fetchStrapi(`about?${populate}`);
    
    // Strapi single type might return data inside a 'data' wrapper depending on version
    if (data && !Array.isArray(data)) {
        aboutData = data;
    } else if (Array.isArray(data) && data.length > 0) {
        aboutData = data[0];
    }
  } catch (err) {
    console.error("Failed to load about data on server", err);
  }

  // We pass the data (or null, the client component handles defaults) to the client component
  return <AboutClient data={aboutData || {}} />;
}
