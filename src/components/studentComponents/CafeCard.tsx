import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { FilteredCafe } from "@/types/Cafe.type";

interface CafeCardProps {
  cafe: FilteredCafe;
}

const CafeCard = ({ cafe }: CafeCardProps) => {
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
          <Typography gutterBottom variant="h5" component="div">
            {cafe.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cafe.loc.location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CafeCard;
