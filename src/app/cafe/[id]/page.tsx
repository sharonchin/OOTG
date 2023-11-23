import ProductCard from "@/components/ProductCard";
import { Cafe } from "@/types/Cafe.type";
import { Product } from "@/types/Product.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CafeDetails = async ({ params }: { params: { id: string } }) => {
  const getCafe = async () => {
    const res = await fetch(`http://localhost:3000/api/cafe/${params.id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    return res.json();
  };

  const cafe: Cafe = await getCafe();

  const getProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/product?cafe=${params.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    return res.json();
  };

  const products: Product[] = await getProduct();

  return (
    <div className="flex flex-col">
      <div className="flex pb-20 flex-row justify-center items-center mx-8">
        {/*ProductWrapper */}
        <div className=" h-100 w-200 ">
          {/* ImageContainer */}
          <img
            src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${cafe.img}.jpg`}
            alt={cafe.name}
            width={500}
            height={400}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold">{cafe.name}</h1>
          <h1 className="text-xl">{cafe.loc.location}</h1>
          <h1 className="text-xl">{cafe.operatingHour}</h1>
        </div>
      </div>

      <h1 className="font-black text-2xl py-5">Food availble</h1>
      <div className="flex flex-row gap-5">
        {/* SINGLE ITEM */}
        {products.map((Product) => (
          <Link href={`/product/${Product.id}`} key={Product.id}>
            <ProductCard product={Product} />
          </Link>
        ))}
      </div>

      {/* {products.map((product) => (
        <div className="w-80 ">
          <Link href={`/product/${product.id}`}>
            <img
              src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${product.img}.jpg`}
              alt={product.name}
              width={200}
              height={300}
            />
          </Link>
          <div className="flex-col mb-10">
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default CafeDetails;
