import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SidebarContextProvider from "@/context/SidebarContext/SidebarContext";
import Navbar from "@/components/Navbar/Navbar";

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

export const metadata: Metadata = {
  title: "VidTube",
  description: "Complete clone for youtube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarContextProvider>
          <Navbar />
          {children}
        </SidebarContextProvider>
      </body>
    </html>
  );
}
