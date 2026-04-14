import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

const siteUrl = "https://alanmlcrt.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alan Molcrette | Ingénieur IoT, Data Supervision et Portfolio",
  description: "Portfolio d'Alan Molcrette, ingénieur en électronique, IoT et supervision de données.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: "Alan Molcrette | Ingénieur IoT, Data Supervision et Portfolio",
    description: "Portfolio d'Alan Molcrette, ingénieur en électronique, IoT et supervision de données.",
    siteName: "alanmlcrt",
    images: ["/photo alan.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Molcrette | Ingénieur IoT, Data Supervision et Portfolio",
    description: "Portfolio d'Alan Molcrette, ingénieur en électronique, IoT et supervision de données.",
    images: ["/photo alan.jpg"],
  },
};

export default function Home() {
  return <HomeClient />;
}
