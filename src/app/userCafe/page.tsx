"use client";
import Dashboard from "@/components/cafeComponents/Dashboard";
import React from "react";
import useSession from "@/lib/useSession";

export default function Home() {
  const reload = useSession()
  return (
    <div className="flex flex-col items-center justify-between">
      <Dashboard />
    </div>
  );
}
