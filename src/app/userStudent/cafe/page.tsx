import Image from "next/image";
import React from "react";
import Link from "next/link";
import Search from "@/components/studentComponents/Search";
import { FilteredCafe } from "@/types/Cafe.type";
import CafeCard from "@/components/studentComponents/CafeCard";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/cafe", {
    cache: "no-store",
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Screwed up");
  }
  return res.json();
};

const CafeList = async () => {
  const cafe: FilteredCafe[] = await getData();
  return (
    <div className="flex flex-col p-10">
      {/* <Search/> */}
      <span className="font-bold text-2xl pt-20">All Cafes</span>

      <div className="flex pb-20 justify-around ">
        {cafe.map((Cafe) => (
          <Link href={`/userStudent/cafe/${Cafe.id}`} key={Cafe.id}>
            <CafeCard cafe={Cafe} />
            {/* <div key={Cafe.id} className=" h-60 w-80 justify-start ">
              <img
                // Cafe.cafeImg as string
                src={`https://res.cloudinary.com/devlognxn/image/upload/${Cafe.cafeImg}.jpg`}
                alt={Cafe.cafeName}
                width={400}
                height={300}
              />
              <span>{Cafe.cafeName}</span>
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CafeList;
