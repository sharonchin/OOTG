"use client";
import EditItem from "@/components/cafeComponents/EditItem";
import React from "react";
import { Product } from "@/types/Product.type";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";

export default function editItem({ params }: { params: { id: string } }) {
  const productId = params.id as string;
  const [product, setProduct] = React.useState<Product>({} as Product);
  const store = useStore();
  const getData = async () => {
    store.setRequestLoading(true);
    const res = await fetch(`http://localhost:3000/api/product/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setProduct(await res.json());
    store.setRequestLoading(false);

  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <EditItem product={product} />
      {store.requestLoading && <Loading />}
    </>
  );
}
