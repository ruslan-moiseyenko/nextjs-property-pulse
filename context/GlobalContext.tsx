"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// create context
const GlobalContext = createContext<any>({});

//create provider
export const GlobalProvider = ({ children }: any) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const context = {
    unreadCount,
    setUnreadCount,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
