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
      <main className={`${showSidebar ? "xl:pl-64" : ""} min-h-screen flex flex-col transition-all duration-300 relative z-10 before:fixed before:inset-0 before:backdrop-blur-[2px] before:bg-black/40 before:pointer-events-none before:-z-10`}>
        <div className="flex-1 relative z-10 flex flex-col pt-32">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
