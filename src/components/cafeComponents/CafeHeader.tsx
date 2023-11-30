"use client";
import OOTG from "./../../../public/assets/ootg.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="fixed w-full h-20 z-[100] bg-[#778CCC]">
      <div className="flex pl-5 w-full h-full">
        <Link href="/">
          <Image src={OOTG} alt="ootg logo" />
        </Link>
      </div>
    </div>
  );
}
