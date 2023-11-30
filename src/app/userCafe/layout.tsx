"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/cafeComponents/CafeHeader";
import Footer from "@/components/shared/Footer";
import MainMenu from "@/components/cafeComponents/MainMenu";
import { Toaster } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();
  console.log(user)
  const auth = Boolean(user?.cafe?.id);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {auth && (
          <div className="flex flex-col justify-between h-screen">
            <Toaster position="top-center" />
            <Header />
            {/* <Banner/> */}
            <div className="flex flex-col justify-center items-center pt-10">
              <MainMenu />

              {children}
            </div>
            <Footer />
          </div>
        )}
        {!auth && (
          <div className="flex flex-col justify-between h-screen">
            <Toaster position="top-center" />
            <Header />
            {/* <Banner/> */}
            <div className="flex flex-col justify-center items-center pt-10">
              {children}
            </div>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
