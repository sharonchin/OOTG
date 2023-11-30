"use client";
import EditItem from "@/components/cafeComponents/EditItem";
import React from "react";
import { Product } from "@/types/Product.type";

export default function editItem({ params }: { params: { id: string } }) {
  const productId = params.id as string;
  const [product, setProduct] = React.useState<Product>({} as Product);
  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/product/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setProduct(await res.json());
    // setValue("name", product?.name);
    // setValue("price", product?.price);
    // setValue("desc", product?.desc);
    // setValue("productCategory", product?.productCategory as PRODUCT_CATEGORY);
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <EditItem product={product} />;
}
