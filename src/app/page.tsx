"use client";
import Cafes from "@/components/Cafes";
import Recommended from "@/components/Recommendation";
import React from "react";
import Product from "@/components/Products";
import useSession from "@/lib/useSession";
export default function Home() {
  const reload = useSession();

  return (
    <div className="flex flex-col">
      {/* <Recommended/> */}
      <Cafes />
      <Product />
    </div>
  );
}
