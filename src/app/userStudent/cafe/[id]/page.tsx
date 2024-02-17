"use client";

import Loading from "@/components/shared/Loading";
import ProductCard from "@/components/studentComponents/ProductCard";
import useStore from "@/store";
import { FilteredCafe } from "@/types/Cafe.type";
import { Product } from "@/types/Product.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CafeDetails = ({ params }: { params: { id: string } }) => {
  const store = useStore();
  const [cafe, setCafe] = useState<FilteredCafe>({} as FilteredCafe);
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const getData = async () => {
    store.setRequestLoading(true);
    const cafeRes = await fetch(`http://localhost:3000/api/cafe/${params.id}`, {
      cache: "no-store",
    });
    const productRes = await fetch(
      `http://localhost:3000/api/product?cafe=${params.id}`,
      {
        cache: "no-store",
      }
    );
    if (!cafeRes.ok || !productRes.ok) {
      throw new Error("Screwed up");
    }

    setCafe(await cafeRes.json());
    setProducts(await productRes.json());
    store.setRequestLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex pt-20 pb-20 flex-row justify-center items-center mx-8">
        {/*ProductWrapper */}
        <div className=" h-100 w-200 ">
          {/* ImageContainer */}
          <img
            src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${cafe.img}.jpg`}
            alt={cafe.name}
            width={400}
            height={300}
          />
        </div>
        <div className="flex flex-col gap-3 pl-10">
          <h1 className="text-4xl font-extrabold">{cafe.name}</h1>
          <h1 className="text-xl">{cafe.loc?.location}</h1>
          <h1 className="text-xl">{cafe.operatingHour}</h1>
        </div>
      </div>

      <h1 className="font-black text-2xl py-5">Food availble</h1>
      <div className="flex flex-row gap-5">
        {/* SINGLE ITEM */}
        {products.map((Product) => (
          <Link href={`/userStudent/product/${Product.id}`} key={Product.id}>
            <ProductCard product={Product} />
          </Link>
        ))}
      </div>

      {store.requestLoading && <Loading />}
    </div>
  );
};

export default CafeDetails;
