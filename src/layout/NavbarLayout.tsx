import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import ScrollbarLayout from "./ScrollbarLayout";

type NavbarLayoutProps = {
  children: ReactNode;
};

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  return (
    <main className="flex flex-col w-full h-screen font-poppins bg-creamBg relative">
      <Navbar />
      <ScrollbarLayout rootClassName="h-[calc(h-screen-64px)]">
        {children}
      </ScrollbarLayout>
    </main>
  );
};

export default NavbarLayout;
