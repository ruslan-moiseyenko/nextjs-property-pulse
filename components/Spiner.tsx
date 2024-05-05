"use client";
import React, { CSSProperties, FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

type LoadingType = {
  loading?: boolean;
};

export const Spinner: FC<LoadingType> = ({ loading }) => {
  const override: CSSProperties = {
    display: "block",
    margin: "100px auto",
  };

  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      aria-label="LoadingSpinner"
    />
  );
};
