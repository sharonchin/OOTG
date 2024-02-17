"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "@/components/studentComponents/Search";
import { FilteredCafe } from "@/types/Cafe.type";
import CafeCard from "@/components/studentComponents/CafeCard";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";

const CafeList = () => {
  const store = useStore();
  const [cafe, setCafe] = useState<FilteredCafe[]>([] as FilteredCafe[]);

  const getData = async () => {
    store.setRequestLoading(true);
    const res = await fetch("http://localhost:3000/api/cafe", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    store.setRequestLoading(false);
    setCafe(await res.json());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col p-10">
      {/* <Search/> */}
      <span className="font-bold text-3xl py-20">All Cafes</span>

      <div className="flex pb-20 justify-around ">
        {cafe.map((Cafe) => (
          <Link href={`/userStudent/cafe/${Cafe.id}`} key={Cafe.id}>
            <CafeCard cafe={Cafe} />
          </Link>
        ))}
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
};

export default CafeList;
