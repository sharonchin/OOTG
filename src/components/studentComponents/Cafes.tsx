"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonGroup, Button } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import { FilteredCafe } from "@/types/Cafe.type";
import { Product } from "@/types/Product.type";
import CafeCard from "./CafeCard";
import { apiGetAllCafe } from "@/lib/api-requests";
import useStore from "@/store";
import Loading from "../shared/Loading";
import { useCartStore } from "@/cart";
import DELIVERY_OPTION from "@/constants/DELIVERY_OPTION";

const Cafes = () => {
  const [cafes, setCafes] = React.useState<FilteredCafe[]>([] as FilteredCafe[]);
  const store = useStore();
  const { selectDeliveryOption } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const getCafe = async () => {
    store.setRequestLoading(true);
    const res = await apiGetAllCafe();

    setCafes(res);
    store.setRequestLoading(false);
  };

  React.useEffect(() => {
    getCafe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getProduct = async () => {
  //   const res = await fetch(
  //     `http://localhost:3000/api/product?cafe=`,
  //     {
  //       cache: "no-store",
  //     }
  //   );
  //   if (!res.ok) {
  //     console.log(res);
  //     throw new Error("Screwed up");
  //   }
  //   return res.json();
  // };

  // const products: Product[] = await getProduct();

  const [selectedButton, setSelectedButton] = React.useState<DELIVERY_OPTION>(
    "DELIVERY" as DELIVERY_OPTION
  ); // State to manage the selected button

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const notSelectedStyle = {
    backgroundColor: "transparent",
  };

  const handleButtonClick = (button: DELIVERY_OPTION) => {
    setSelectedButton(button === selectedButton ? selectedButton : button);
    selectDeliveryOption(button);
  };
  const router = useRouter();
  return (
    <div className="flex flex-col">
      {store.requestLoading && <Loading />}
      <div className="h-3/4 w-full flex justify-center flex-col pt-20 col-md-4 space-y-4">
        {/*Top*/}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => handleButtonClick("DELIVERY" as DELIVERY_OPTION)}
            variant={selectedButton === "DELIVERY" ? "contained" : "outlined"}
            style={
              selectedButton === "DELIVERY" ? selectedStyle : notSelectedStyle
            }
          >
            Delivery
          </Button>
          <Button
            onClick={() => handleButtonClick("PICKUP" as DELIVERY_OPTION)}
            variant={selectedButton === "PICKUP" ? "contained" : "outlined"}
            style={
              selectedButton === "PICKUP" ? selectedStyle : notSelectedStyle
            }
          >
            Pick Up
          </Button>
        </ButtonGroup>
        {/*Botton*/}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Offer</Button>
          <Button>Free Delivery</Button>
        </ButtonGroup>
      </div>

      <span className="text-3xl font-bold py-10">All cafes</span>

      {/* WRAPPER */}
      <div className="flex flex-row gap-5 justify-around">
        {/* SINGLE ITEM */}
        {cafes.map((Cafe) => (
          <Link href={`/userStudent/cafe/${Cafe.id}`} key={Cafe.id}>
            <CafeCard cafe={Cafe} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center py-8">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            router.push("/userStudent/cafe");
          }}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Cafes;
