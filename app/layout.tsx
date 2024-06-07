import React, { FC, ReactNode } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import "@/assets/styles/global.css";

export const metadata: Metadata = {
  title: "PropertyPulse | Find the perfect Rental",
  description: "Find your dream renal property",
};
type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body
            suppressHydrationWarning={true}
            className="flex min-h-screen flex-col bg-bg_primary"
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
