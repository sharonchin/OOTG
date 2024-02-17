"use client";
import Cafes from "@/components/studentComponents/Cafes";
import Recommended from "@/components/studentComponents/Recommendation";
import React, { useEffect } from "react";
import Products from "@/components/studentComponents/Products";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Cafes />
      <Products />
    </div>
  );
}
