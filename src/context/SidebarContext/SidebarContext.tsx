"use client";

import { SidebarContextProps } from "@/types";
import React, { useState, createContext, ReactNode } from "react";

const defaultContextValue: SidebarContextProps = {
  sidebar: true,
  setSidebar: () => {},
  category: 0,
  setCategory: () => {},
};

export const SidebarToggleContext = createContext(defaultContextValue);

const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [category, setCategory] = useState<number>(0);

  return (
    <SidebarToggleContext.Provider
      value={{ sidebar, setSidebar, category, setCategory }}
    >
      {children}
    </SidebarToggleContext.Provider>
  );
};

export default SidebarContextProvider;
