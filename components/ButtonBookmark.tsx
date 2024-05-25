import { PropertyType } from "@/components/PropertyCard";
import React, { FC, ReactNode } from "react";
import { FaBookmark } from "react-icons/fa";

type ButtonBookmarkProps = {
  children: ReactNode | ReactNode[];
  isPrimary?: boolean;
  property: PropertyType;
};

export const ButtonBookmark: FC<ButtonBookmarkProps> = ({
  children,
  isPrimary = true,
}) => {
  return (
    <button
      className={`flex w-full items-center justify-center rounded-full ${isPrimary ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"} px-4 py-2 font-bold text-white `}
    >
      <FaBookmark className=" mr-2"></FaBookmark>
      {children}
    </button>
  );
};
