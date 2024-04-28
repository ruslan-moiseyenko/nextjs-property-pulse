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
  children
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};
