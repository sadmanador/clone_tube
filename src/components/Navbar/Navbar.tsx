"use client";
import React, { useContext, useState } from "react";
import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const { theme, sidebar, setSidebar } = useContext(SidebarToggleContext);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/query/${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav
      className={`flex justify-between items-center py-2 px-4 shadow-md sticky top-0 z-10 ${
        theme === "light" ? "bg-[#f9f9f9]" : "bg-black"
      }`}
    >
      <div className="flex items-center">
        <Image
          width={22}
          height={22}
          src="/assets/menu.png"
          alt="Menu"
          className="w-5 mr-6 cursor-pointer hidden md:block"
          onClick={() => setSidebar(!sidebar)}
        />
        <Link href="/">
          <Image
            width={128}
            height={31}
            src="/assets/logo.png"
            alt="Logo"
            className="w-32 hidden md:block"
          />
          <Image
            width={8}
            height={8}
            src="/assets/logo-small.png"
            alt="Logo"
            className="w-10 mr-4 md:hidden"
          />
        </Link>
      </div>

      <div className="flex items-center flex-grow justify-center">
        <div className="flex items-center border border-gray-300 py-2 px-3 rounded-full mr-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none"
          />
          <div
            className="hover:bg-base-200 p-2 rounded-full cursor-pointer active:bg-base-300"
            onClick={handleSearch}
          >
            <Image
              width={16}
              height={16}
              src="/assets/search.png"
              alt="Search"
              className="w-4 "
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <Image
          width={24}
          height={24}
          src="/assets/upload.png"
          alt="Upload"
          className="w-6 ml-1 md:ml-6 cursor-pointer hidden md:block"
        />
        <Image
          width={24}
          height={24}
          src="/assets/more.png"
          alt="More"
          className="w-6 ml-1 md:ml-6 cursor-pointer hidden md:block"
        />
        <Image
          width={24}
          height={24}
          src="/assets/notification.png"
          alt="Notification"
          className="w-6 ml-1 md:ml-6 cursor-pointer hidden md:block"
        />
        <Image
          width={32}
          height={32}
          src="/assets/jack.png"
          alt="Profile"
          className="w-8 h-8 rounded-full ml-1 md:ml-6 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
