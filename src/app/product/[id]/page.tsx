import React from "react";
import {
  Breadcrumbs,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Product } from "@/types/Product.type";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/product/${params.id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    return res.json();
  };

  const product: Product = await getData();

  return (
    <div className="flex flex-col justify-center">
      {/* <div className="flex flex-row justify-center items-center">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="[#778CCC]">Home</Link>
          <Link>Cafe A</Link>
          <Typography color="text.primary">KKTM</Typography> */}
      {/* </Breadcrumbs> */}
      {/* </div> */}

      <div className="flex flex-row pt-8 pb-10 space-x-5 justify-center">
        {/* LeftImage */}
        <div className=" h-100 w-200 justify-start">
          <img
            src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${product.img}.jpg`}
            alt={product.name}
            width={500}
            height={400}
            className="object-contain"
          />
        </div>

        {/* RightContainer */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-extrabold">{product.name}</h1>
            <h1 className="text-xl">RM{product.price}</h1>
            <h1 className="text-xl">
              Availability: {product.availability ? "Active" : "Inactive"}
            </h1>
          </div>

          <div>
            <Divider sx={{ pb: 4 }} />
          </div>
          <div className="pt-5 pb-5">
            <TextField fullWidth label="Note to Cafe" />
          </div>

          <div className="flex flex-row gap-20">
            <div className="flex flex-row gap-5 items-center">
              <button>{"-"}</button>
              <h1>1</h1>
              <button>{"+"}</button>
            </div>
            <Button endIcon={<ShoppingCartOutlinedIcon />}>Add To Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
