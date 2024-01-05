"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { apiGetAllProduct } from "@/lib/api-requests";
import React from "react";
import { Product } from "@/types/Product.type";

const Products = () => {
  const [products, setProducts] = React.useState<Product[]>([] as Product[]);

  const getProduct = async () => {
    const res = await apiGetAllProduct();

    setProducts(res);
  };

  React.useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-3xl font-bold py-10">All food</span>

      <div className="flex flex-row gap-5 justify-around overflow-x-scroll">
        {/* SINGLE ITEM */}
        {products.map((Product) => (
          <Link
            href={
              Product.availability === false || Product.cafe.status === false
                ? ``
                : `/userStudent/product/${Product.id}`
            }
            key={Product.id}
          >
            <ProductCard product={Product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
