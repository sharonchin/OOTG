import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Product } from "@/types/Product.type";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, minHeight: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://res.cloudinary.com/devlognxn/image/upload/${product.img}.jpg`}
          alt={product.name}
          sx={{ minHeight: 250, maxHeight: 250 }}
        />
        <CardContent>
          <div
            className={
              product.availability === false || product.cafe.status === false
                ? "absolute bg-gray-500 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full opacity-60"
                : "hidden"
            }
          >
            <h1 className="flex justify-center text-2xl text-white py-20">
              Unavailable
            </h1>
          </div>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            RM{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
