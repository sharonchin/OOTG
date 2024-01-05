"use client";
import React, { useEffect, useState } from "react";
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
import { useCartStore } from "@/cart";
import toast from "react-hot-toast";
import ProductCard from "@/components/studentComponents/ProductCard";

const SingleProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("-");
  const { addToCart, products } = useCartStore();
  const [cafeProduct, setCafeProduct] = useState<Product[]>([] as Product[]);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setTotal(quantity * product?.price);
  }, [product, quantity]);
  const handleCart = () => {
    if (products.length < 1) {
      addToCart({
        id: product.id,
        name: product.name,
        img: product.img,
        price: product.price,
        amount: total,
        quantity: quantity,
        noteToCafe: note,
        cafeId: product.cafeId,
        cafe: product.cafe,
      });
      toast.success("The item is added to cart!");
    } else if (product?.cafeId === products[0].cafeId) {
      addToCart({
        id: product.id,
        name: product.name,
        img: product.img,
        price: product.price,
        amount: total,
        quantity: quantity,
        noteToCafe: note,
        cafeId: product.cafeId,
        cafe: product.cafe,
      });
      toast.success("The item is added to cart!");
    } else {
      toast.error("Please choose the item from the same cafe!");
    }
  };

  const getData = async () => {
    const res1 = await fetch(`http://localhost:3000/api/product/${params.id}`, {
      cache: "no-store",
    });

    if (!res1.ok) {
      throw new Error("Screwed up");
    }
    setProduct(await res1.json());
    setTotal(product?.price);

    const res2 = await fetch(
      `http://localhost:3000/api/product?cafe=${product?.cafeId}`,
      {
        cache: "no-store",
      }
    );
    if (!res2.ok) {
      throw new Error("Screwed up");
    }
    setCafeProduct(await res2.json());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  return (
    <div className="flex flex-col justify-center">
      {/* <div className="flex flex-row justify-center items-center">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="[#778CCC]">Home</Link>`
          <Link>Cafe A</Link>––––
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
            <TextField
              fullWidth
              label="Note to Cafe"
              value={note}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNote(event.target.value);
              }}
            />
          </div>

          <div className="flex flex-row gap-20">
            <div className="flex flex-row gap-5 items-center">
              <button
                onClick={() =>
                  setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1))
                }
              >
                {"-"}
              </button>
              <h1>{quantity}</h1>
              <button
                onClick={() =>
                  setQuantity((prev: number) => (prev < 9 ? prev + 1 : 9))
                }
              >
                {"+"}
              </button>
            </div>
            <Button onClick={handleCart} endIcon={<ShoppingCartOutlinedIcon />}>
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
      <div>
        <span className="text-3xl font-bold">From the same cafe</span>
        <div className="flex flex-row gap-5 pt-10">
          {cafeProduct.map((Product) => (
            <Link href={`/userStudent/product/${Product.id}`} key={Product.id}>
              <ProductCard product={Product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
