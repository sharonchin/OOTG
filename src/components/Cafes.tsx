"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Cafe } from "@/types/Cafe.type";
import { Product } from "@/types/Product.type";
import CafeCard from "./CafeCard";
import { apiGetAllCafe } from "@/lib/api-requests";
import useStore from "@/store";
import Loading from "./Loading";

const Cafes = () => {
  const [cafes, setCafes] = React.useState<Cafe[]>([] as Cafe[]);
  const store = useStore();

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

  const [selectedButton, setSelectedButton] = React.useState("Delivery"); // State to manage the selected button

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const notSelectedStyle = {
    backgroundColor: "transparent",
  };

  const handleButtonClick = (button: any) => {
    setSelectedButton(button === selectedButton ? "" : button);
  };
  const router = useRouter();
  return (
    <div className="flex flex-col">
      {store.requestLoading && <Loading />}
      <div className="h-3/4 w-full flex justify-center flex-col pt-20 col-md-4 space-y-4">
        {/*Top*/}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => handleButtonClick("Delivery")}
            variant={selectedButton === "Delivery" ? "contained" : "outlined"}
            style={
              selectedButton === "Delivery" ? selectedStyle : notSelectedStyle
            }
          >
            Delivery
          </Button>
          <Button
            onClick={() => handleButtonClick("Pick Up")}
            variant={selectedButton === "Pick Up" ? "contained" : "outlined"}
            style={
              selectedButton === "Pick Up" ? selectedStyle : notSelectedStyle
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
          <Link href={`/cafe/${Cafe.id}`} key={Cafe.id}>
            <CafeCard cafe={Cafe} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center py-8">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            router.push("/cafe");
          }}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Cafes;
