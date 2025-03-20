import Navbar from "@/components/navbar";
import React from "react";
import { AppProvider } from "@/contexts/appContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppProvider>
        <Navbar />
        {children}
      </AppProvider>
    </>
  );
};

export default RootLayout;
