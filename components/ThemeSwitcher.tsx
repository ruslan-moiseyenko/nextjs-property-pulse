import React from "react";

import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeSwitcher = () => {
  const body = document.querySelector("body");
  const handleLightMode = () => {
    if (body) {
      body.dataset.theme = "light";
    }
  };

  const handleDarkMode = () => {
    if (body) {
      body.dataset.theme = "dark";
    }
  };
  return (
    <div className="mr-5 flex gap-3">
      <button
        onClick={handleLightMode}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100  hover:bg-yellow-200"
      >
        <FiSun size={15} color="black" />
      </button>
      <button
        onClick={handleDarkMode}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-900"
      >
        <FiMoon size={15} color="white" />
      </button>
    </div>
  );
};
