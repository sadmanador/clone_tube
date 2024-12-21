"use client";
import SearchResult from "@/components/SearchResult/SearchResult";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import React, { useContext } from "react";

const QueryPage = () => {
  const { sidebar } = useContext(SidebarToggleContext);

  return (
    <>
      <Sidebar />
      <div
        className={`${
          sidebar ? "pl-[17%]" : "pl-[7%]"
        } bg-[#f9f9f9] pt-5 pb-5 pr-2 ${sidebar ? "" : "lg:pl-20"}`}
      >
        <SearchResult />
      </div>
    </>
  );
};

export default QueryPage;
