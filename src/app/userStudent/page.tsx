"use client";
import Cafes from "@/components/studentComponents/Cafes";
import Recommended from "@/components/studentComponents/Recommendation";
import React from "react";
import Product from "@/components/studentComponents/Products";
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* <Recommended/> */}
      <Cafes />
      <Product />
    </div>
  );
}
