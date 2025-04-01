import Navbar from "@/components/navbar";
import React from "react";
import { AppProvider } from "@/contexts/appContext";
import BreadCrumbs from "@/components/breadCrumbs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppProvider>
        <Navbar />
        <BreadCrumbs />
        {children}
      </AppProvider>
    </>
  );
};

export default RootLayout;
