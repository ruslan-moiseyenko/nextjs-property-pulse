import React, { FC, ReactNode } from "react";
import "@/assets/styles/global.css";

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
        <div> MainLayout</div>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
