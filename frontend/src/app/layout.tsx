import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import MainWrapper from "@/components/MainWrapper";
import GlobalCircuitry from "@/components/GlobalCircuitry";

export const metadata: Metadata = {
  title: "alanmlcrt // Portfolio",
  description: "Ingénieur Industries Connectées // IoT // Data Supervision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body selection:bg-primary-container selection:text-white relative bg-[#050505]">
        <GlobalCircuitry />
        <TopNav />
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
