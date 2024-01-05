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
  const [cafes, setCafes] = React.useState<FilteredCafe[]>(
    [] as FilteredCafe[]
  );
  const [activeRider, setActiveRider] = React.useState<number>(0);
  const store = useStore();
  const { selectDeliveryOption } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const getCafe = async () => {
    store.setRequestLoading(true);
    const cafeRes = await apiGetAllCafe();
    const riderRes = await fetch(
      `http://localhost:3000/api/rider/getActiveRiderCount`
    );

    setCafes(cafeRes);
    setActiveRider(await riderRes.json());
    store.setRequestLoading(false);
  };

  React.useEffect(() => {
    getCafe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function calculateRating(x: any) {
    let totalRating = 0;
    if (x.Rating.length > 0) {
      x.Rating.forEach((i: any) => {
        totalRating += i.rating;
      });
      return totalRating / x.Rating.length;
    }
    return 0;
  }

  function compare(a: any, b: any) {
    if (calculateRating(a) > calculateRating(b)) {
      return -1;
    }
    if (calculateRating(a) < calculateRating(b)) {
      return 1;
    }
    return 0;
  }

  return (
    <div className="flex flex-col">
      {store.requestLoading && <Loading />}
      <div className="h-3/4 w-full flex justify-between flex-row pt-20 col-md-4 ">
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
        <Button
          disabled
          variant="contained"
          style={{
            backgroundColor: "#778CCC",
            color: "white",
            fontSize: "20px",
          }}
        >
          Current available rider: {activeRider}
        </Button>

        {/*Botton*/}
        {/* <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Offer</Button>
          <Button>Free Delivery</Button>
        </ButtonGroup> */}
      </div>

      <span className="text-3xl font-bold py-10">All cafes</span>

      {/* WRAPPER */}
      <div className="flex flex-row gap-5 justify-around">
        {/* SINGLE ITEM */}
        {cafes
          .slice(0, 3)
          .sort(compare)
          .map((Cafe) => (
            <Link
              href={Cafe.status ? `/userStudent/cafe/${Cafe.id}` : ``}
              key={Cafe.id}
            >
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
