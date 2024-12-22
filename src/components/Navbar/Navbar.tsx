"use client";
import React, { useContext, useState } from "react";
import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { sidebar, setSidebar } = useContext(SidebarToggleContext);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
    <nav className="flex justify-between items-center py-2 px-4 shadow-md bg-white sticky top-0 z-10">
      <div className="flex items-center mr-1">
        <Image
          width={22}
          height={22}
          src="/assets/menu.png"
          alt="Menu"
          className="hidden md:block w-5 mr-6 cursor-pointer"
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
            width={32}
            height={32}
            src="/assets/logo-small.png"
            alt="Logo"
            className=" md:hidden"
          />
        </Link>
      </div>

      <div className="flex items-center flex-grow justify-center">
        <div className="flex items-center border border-gray-300 py-2 px-3 rounded-full mr-4 w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none"
          />
          <Image
            width={16}
            height={16}
            src="/assets/search.png"
            alt="Search"
            className="w-4 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="flex items-center">
        <Image
          width={24}
          height={24}
          src="/assets/upload.png"
          alt="Upload"
          className="w-4 md:w-6 md:ml-6"
        />
        <Image
          width={24}
          height={24}
          src="/assets/more.png"
          alt="More"
          className="w-4 md:w-6 md:ml-6"
        />
        <Image
          width={24}
          height={24}
          src="/assets/notification.png"
          alt="Notification"
          className="w-4 md:w-6 md:ml-6"
        />
        <Image
          width={32}
          height={32}
          src="/assets/jack.png"
          alt="Profile"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full md:ml-6"
        />
      </div>
    </nav>
  );
};

export default Navbar;
