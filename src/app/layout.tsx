"use client";
import localFont from "next/font/local";
import "./globals.css";
import SidebarContextProvider, { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useContext } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarContextProvider>
          <LayoutContent>{children}</LayoutContent>
        </SidebarContextProvider>
      </body>
    </html>
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { sidebar } = useContext(SidebarToggleContext);



  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        className={`${
          sidebar ? "md:pl-[17%]" : "md:pl-[7%]"
        }  pt-5 pb-5 px-[3%] ${sidebar ? "" : "lg:pl-20"}`}
      >
        {children}
      </div>
    </>
  );
};

export default RootLayout;
