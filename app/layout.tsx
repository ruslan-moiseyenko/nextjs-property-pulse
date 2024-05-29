import React, { FC, ReactNode } from "react";
import "@/assets/styles/global.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
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
            className="flex min-h-screen flex-col"
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
