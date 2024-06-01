import React, { ReactNode, FC } from "react";

type InfoBoxType = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
  children: ReactNode;
};

export const InfoBox: FC<InfoBoxType> = ({
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  heading,
  children,
}) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-6 shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mb-4 mt-2`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block rounded-lg bg-black px-4 py-2 text-primary hover:bg-gray-700 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};
