"use client";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import ItemClick from "./ItemClick";
import NewItem from "./NewItem";
import Link from "next/link";

export default function Management() {
  const [selectedButton, setSelectedButton] = React.useState(""); // State to manage the selected button

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const notSelectedStyle = {
    backgroundColor: "transparent",
  };
  const handleButtonClick = (button: any) => {
    setSelectedButton(button === selectedButton ? "" : button);
  };

  return (
    <div>
      <div>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Link href={`/management/item`}>
            <Button
              onClick={() => handleButtonClick("Item")}
              variant={selectedButton === "Item" ? "contained" : "outlined"}
              style={
                selectedButton === "Item" ? selectedStyle : notSelectedStyle
              }
            >
              Item
            </Button>
          </Link>
          <Link href={`/management/promo`}>
            <Button
              onClick={() => handleButtonClick("Promo")}
              variant={selectedButton === "Promo" ? "contained" : "outlined"}
              style={
                selectedButton === "Promo" ? selectedStyle : notSelectedStyle
              }
            >
              Promo
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
}
