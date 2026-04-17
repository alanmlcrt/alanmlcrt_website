import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import MainWrapper from "@/components/MainWrapper";
import GlobalCircuitry from "@/components/GlobalCircuitry";

const siteUrl = "https://alanmlcrt.fr";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alan Molcrette",
  alternateName: "alanmlcrt",
  url: siteUrl,
  jobTitle: "Ingénieur Industries Connectées",
  description: "Ingénieur IoT, supervision de données et automatisation industrielle.",
  sameAs: ["https://www.linkedin.com/in/alan-molcrette/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "alanmlcrt",
  url: siteUrl,
  description: "Portfolio d'Alan Molcrette, ingénieur IoT et supervision de données.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alan Molcrette | Ingénieur IoT, Data Supervision et Portfolio",
    template: "%s | Alan Molcrette",
  },
  description: "Portfolio d'Alan Molcrette, ingénieur en électronique, IoT et supervision de données.",
  applicationName: "alanmlcrt",
  authors: [{ name: "Alan Molcrette", url: siteUrl }],
  creator: "Alan Molcrette",
  publisher: "Alan Molcrette",
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, personSchema]) }} />
      </head>
      <body className="font-body selection:bg-primary-container selection:text-white relative bg-[#050505] min-h-screen flex flex-col">
        <GlobalCircuitry />
        <TopNav />
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
