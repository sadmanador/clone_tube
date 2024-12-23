"use client";

import Feed from "@/components/Feed/Feed";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { useContext } from "react";

export default function Home() {
  const { sidebar } = useContext(SidebarToggleContext);

  console.log(process.env.NEXT_PUBLIC_BASE_URL,process.env.NEXT_PUBLIC_API_KEY,)

  return (
    <>
      <Sidebar />
      <div
        className={`${sidebar ? "md:pl-[17%]" : "md:pl-[7%]"}  pt-5 pb-5 px-[3%] ${
          sidebar ? "" : "lg:pl-20"
        }`}
      >
        <Feed />
      </div>
    </>
  );
}
