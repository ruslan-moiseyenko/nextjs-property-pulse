import React, { FC, ReactNode } from "react";
import "@/assets/styles/global.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "PropertyPulse | Find the perfect Rental",
  description: "Find your dream renal property"
};
type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
