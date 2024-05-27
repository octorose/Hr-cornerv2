
import Nav from "../Layout/Nav";
import SideBar from "../Layout/Sidebar";

import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  active: string;
}

function Layout({ children, active }: LayoutProps) {
  
  return (
    <div className="grid  w-full lg:grid-cols-[280px_1fr]">
      <SideBar  active={active} />
      <div className="flex flex-col">
        <Nav />
        <main className="flex flex-1 bg-white flex-col gap-4 p-2 md:gap-8 md:p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
