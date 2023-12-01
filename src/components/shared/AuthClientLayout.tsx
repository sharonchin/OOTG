"use client";

import React from "react";
import useSession from "@/lib/useSession";
import StudentHeader from "@/components/studentComponents/StudentHeader";
import CafeHeader from "@/components/cafeComponents/CafeHeader";
import RiderHeader from "@/components/riderComponents/RiderHeader";
import Banner from "../studentComponents/Banner";
import Footer from "./Footer";
import CafeMainMenu from "@/components/cafeComponents/MainMenu";
import RiderMainMenu from "@/components/riderComponents/MainMenu";
import USERTYPE from "@/constants/USERTYPE";

const AuthClientLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSession();

  const LayoutPicker = () => {
    if (!user) {
      return (
        <div className="flex flex-col justify-between h-screen">
          <CafeHeader />
          <div className="flex flex-col justify-center items-center pt-10">
            {children}
          </div>
          <Footer />
        </div>
      );
    }

    if (user?.userType === ("STUDENT" as USERTYPE)) {
      return (
        <div>
          <StudentHeader />
          <Banner />
          <div className="px-20">{children}</div>
          <Footer />
        </div>
      );
    } else if (user?.userType === ("CAFE" as USERTYPE)) {
      return (
        <div className="flex flex-col justify-between h-screen">
          <CafeHeader />
          <div className="flex flex-col justify-center items-center pt-10">
            <CafeMainMenu />
            {children}
          </div>
          <Footer />
        </div>
      );
    } else if (user?.userType === ("RIDER" as USERTYPE)) {
      return (
        <div className="flex flex-col justify-between h-screen">
          <RiderHeader />
          {/* <Banner/> */}
          <div className="flex flex-col justify-center items-center pt-10">
            <RiderMainMenu />
            {children}
          </div>
          <Footer />
        </div>
      );
    }
  };

  return (
    <>
      {!user && (
        <div className="flex flex-col justify-between h-screen">
          <CafeHeader />
          <div className="flex flex-col justify-center items-center pt-10">
            {children}
          </div>
          <Footer />
        </div>
      )}
      {user?.userType === ("STUDENT" as USERTYPE) && (
        <div>
          <StudentHeader />
          <Banner />
          <div className="px-20">{children}</div>
          <Footer />
        </div>
      )}
      {user?.userType === ("CAFE" as USERTYPE) && (
        <div className="flex flex-col justify-between h-screen">
          <CafeHeader />
          <div className="flex flex-col justify-center items-center pt-10">
            <CafeMainMenu />
            {children}
          </div>
          <Footer />
        </div>
      )}
      {user?.userType === ("RIDER" as USERTYPE) && (
        <div className="flex flex-col justify-between h-screen">
          <RiderHeader />
          {/* <Banner/> */}
          <div className="flex flex-col justify-center items-center pt-10">
            <RiderMainMenu />
            {children}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AuthClientLayout;
