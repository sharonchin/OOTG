"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CafeCard from "@/components/studentComponents/CafeCard";
import { apiGetAllCafe } from "@/lib/api-requests";
import { FilteredCafe } from "@/types/Cafe.type";
import Link from "next/link";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";

const SearchResult = () => {
  const store = useStore();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [cafes, setCafes] = React.useState<FilteredCafe[]>(
    [] as FilteredCafe[]
  );

  const getData = async () => {
    store.setRequestLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/cafe/search?search=${search}}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setCafes(await res.json());
    store.setRequestLoading(false);
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col p-10">
      <span className="font-bold text-3xl py-20">Search Results</span>

      <div className="flex flex-row gap-5 justify-around">
        {/* SINGLE ITEM */}
        {cafes.map((Cafe) => (
          <Link
            href={Cafe.status ? `/userStudent/cafe/${Cafe.id}` : ``}
            key={Cafe.id}
          >
            <CafeCard cafe={Cafe} />
          </Link>
        ))}
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
};

export default SearchResult;
