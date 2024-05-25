import React, { FC, ReactNode } from "react";
import { FaShare } from "react-icons/fa";
import { PropertyType } from "@/components/PropertyCard";

type ButtonsShareProps = {
  children: ReactNode | ReactNode[];
  isPrimary?: boolean;
  property: PropertyType;
};

export const ButtonsShare: FC<ButtonsShareProps> = ({
  children,
  isPrimary = true,
}) => {
  return (
    <button
      className={`flex w-full items-center justify-center rounded-full ${isPrimary ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"} px-4 py-2 font-bold text-white `}
    >
      <FaShare className=" mr-2" />
      {children}
    </button>
  );
};
