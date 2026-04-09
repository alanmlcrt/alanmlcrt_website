"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import Footer from "./Footer";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pathname === "/about";

  return (
    <>
      {showSidebar && <SideNav />}
      <main className={`${showSidebar ? "xl:pl-64" : ""} pt-24 min-h-screen flex flex-col transition-all duration-300`}>
        {children}
        <Footer />
      </main>
    </>
  );
}
