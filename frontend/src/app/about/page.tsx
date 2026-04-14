import { fetchStrapi } from "@/lib/strapi";
import AboutClient from "@/components/AboutClient";

const siteUrl = "https://alanmlcrt.fr";

async function getAboutData() {
  const populate = 'populate[experiences]=*&populate[skills]=*&populate[educations]=*&populate[interests]=*&populate[languages]=*&populate[featuredProjects][populate]=*';
  const data = await fetchStrapi(`about?${populate}`);

  if (data && !Array.isArray(data)) return data;
  if (Array.isArray(data) && data.length > 0) return data[0];
  return null;
}

export async function generateMetadata() {
  const aboutData = await getAboutData();
  const heroSubtitle = aboutData?.heroSubtitle || "Ingénieur Industries Connectées // IoT // Data Supervision";
  const profileSummary = aboutData?.profileSummary || "Découvrez mon parcours d'ingénieur en électronique et informatique spécialisé en IoT et Dataviz.";
  const description = aboutData?.seoDescription || `${heroSubtitle}. ${profileSummary}`;
  const title = aboutData?.seoTitle || "À Propos | Alan Molcrette";

  return {
    title,
    description,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/about`,
      type: "profile",
      images: ["/photo alan.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/photo alan.jpg"],
    },
  };
}

export default async function AboutPage() {
  let aboutData = null;
  
  try {
    aboutData = await getAboutData();
  } catch (err) {
    console.error("Failed to load about data on server", err);
  }

  // We pass the data (or null, the client component handles defaults) to the client component
  return <AboutClient data={aboutData || {}} />;
}
