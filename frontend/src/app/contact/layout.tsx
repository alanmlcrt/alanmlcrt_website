import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact // alanmlcrt",
  description: "Entrez en contact avec Alan Molcrette pour vos projets IoT, Electronique et Data Supervision.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
