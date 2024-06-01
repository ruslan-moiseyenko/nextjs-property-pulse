"use client";
import React, { useEffect, useState } from "react";

import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");
  const body = document.querySelector("body");

  useEffect(() => {
    const currentTheme = localStorage.getItem("propertypulse-theme");
    if (currentTheme && body) {
      body.dataset.theme = currentTheme;
      setTheme(currentTheme);
    }
  }, [body]);

  const toggleTheme = () => {
    if (body) {
      if (body.dataset.theme === "light") {
        body.dataset.theme = "dark";
        localStorage.setItem("propertypulse-theme", "dark");
        setTheme("dark");
      } else {
        body.dataset.theme = "light";
        localStorage.setItem("propertypulse-theme", "light");
        setTheme("light");
      }
    }
  };

  const lightButton = () => {
    return (
      <button
        onClick={toggleTheme}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-yellow-200"
      >
        <FiSun size={15} color="black" />
      </button>
    );
  };

  const darkButton = () => {
    return (
      <button
        onClick={toggleTheme}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-900"
      >
        <FiMoon size={15} color="white" />
      </button>
    );
  };

  return (
    <div className="mr-5 flex gap-3">
      {theme === "dark" ? lightButton() : darkButton()}
    </div>
  );
};
