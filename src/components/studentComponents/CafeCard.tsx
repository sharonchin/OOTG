import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { FilteredCafe } from "@/types/Cafe.type";
import StarIcon from "@mui/icons-material/Star";

interface CafeCardProps {
  cafe: FilteredCafe;
}

const CafeCard = ({ cafe }: CafeCardProps) => {
  function calculateRating(x: any) {
    let totalRating = 0;
    if (x.Rating.length > 0) {
      x.Rating.forEach((i: any) => {
        totalRating += Number(i.rating);
      });
      return totalRating / x.Rating.length;
    }
    return 0;
  }
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, minHeight: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://res.cloudinary.com/devlognxn/image/upload/${cafe.img}.jpg`}
          alt={cafe.name}
          sx={{ minHeight: 250, maxHeight: 250 }}
        />
        <CardContent>
          <div
            className={
              cafe.status
                ? "hidden"
                : "absolute bg-gray-500 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full opacity-60"
            }
          >
            <h1 className="flex justify-center items-center text-2xl text-white py-20">
              Unavailable
            </h1>
          </div>
          <Typography gutterBottom variant="h5" component="div">
            {cafe.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cafe.loc.location}
          </Typography>
          <div className="flex flex-row items-center gap-1">
            <StarIcon color="warning" />
            <Typography variant="body2" color="text.secondary">
              {calculateRating(cafe).toFixed(1)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CafeCard;
