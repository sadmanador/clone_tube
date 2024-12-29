"use client";

import { SidebarContextProps } from "@/types";
import React, { createContext, ReactNode, useEffect, useState } from "react";

const defaultContextValue: SidebarContextProps = {
  sidebar: true,
  setSidebar: () => {},
  category: 0,
  setCategory: () => {},
  theme: "light",
  setTheme: () => {},
};

export const SidebarToggleContext = createContext(defaultContextValue);

const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const [category, setCategory] = useState<number>(0);

  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <SidebarToggleContext.Provider
      value={{ sidebar, setSidebar, category, setCategory, theme, setTheme }}
    >
      {children}
    </SidebarToggleContext.Provider>
  );
};

export default SidebarContextProvider;
