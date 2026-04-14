import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { fetchStrapi } from "@/lib/strapi";

const siteUrl = "https://alanmlcrt.fr";

export async function generateMetadata(): Promise<Metadata> {
  const about = await fetchStrapi("about");
  
  // Fusion logic: use SEO fields if available, otherwise fallback to Hero/Summary
  const title = about?.attributes?.seoTitle || about?.attributes?.heroTitle || "Alan Molcrette | Ingénieur IoT & Portfolio";
  const description = about?.attributes?.seoDescription || about?.attributes?.profileSummary || "Portfolio d'Alan Molcrette, ingénieur en électronique, IoT et supervision de données.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteUrl,
      title,
      description,
      siteName: "alanmlcrt",
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

export default function Home() {
  return <HomeClient />;
}
