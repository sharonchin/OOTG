import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper, Rating } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Order from "./Order";
import useSession from "@/lib/useSession";
import { Order as OrderType } from "@/types/Order.type";
import STATUS from "@/constants/STATUS";
import { Cafe } from "@prisma/client";
import toast from "react-hot-toast";
import ActiveOrder from "./ActiveOrder";
import { FilteredCafe } from "@/types/Cafe.type";

export default function Dashboard() {
  const [online, setOnline] = React.useState(true);
  const [rating, setRating] = React.useState(0);

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const handleButtonClick = () => {
    setOnline(!online);
  };

  const user = useSession();
  function calculateRating(x: any) {
    let totalRating = 0;
    if (x.length > 0) {
      x.forEach((i: any) => {
        totalRating += Number(i.rating);
      });
      return totalRating / x.length;
    }
    return 0;
  }
  const [orders, setOrders] = React.useState<OrderType[]>([] as OrderType[]);

  const getOrder = async () => {
    const res = await fetch(
      `http://localhost:3000/api/orders?cafe=${user?.cafe?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setOrders(await res.json());
    setRating(calculateRating(user?.cafe?.Rating));
  };

  function calculateEarning() {
    let earningWithDeliveryFee = 0
    orders.forEach((order) => {
      earningWithDeliveryFee += Number(order.totalPrice)
    })

    const deliveryOrder = orders.filter((order) => order.deliveryOption === "DELIVERY")

    return earningWithDeliveryFee - (deliveryOrder.length * 2)
  }

  React.useEffect(() => {
    getOrder();
  }, []);

  const changeAvailability = async () => {
    if (user?.cafe?.status) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/cafe/changeToOffline/${user?.cafe?.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("Cafe is offline now.");
          return window.location.reload(); //will refresh and get updated data
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const res = await fetch(
          `http://localhost:3000/api/cafe/changeToOnline/${user?.cafe?.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("Cafe is online now.");
          return window.location.reload(); //will refresh and get updated data
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const activeOrder = orders.filter(
    (order) => order.status !== ("COMPLETED" as STATUS)
  );

  const completedOrder = orders.filter(
    (order) => order.status === ("COMPLETED" as STATUS)
  );

  return (
    <div>
      <span className="flex justify-center font-bold text-2xl ">
        Welcome Back {user?.cafe?.name}!
      </span>
      <span className="flex flex-row justify-center items-center text-md gap-1">
        <Rating value={rating} precision={0.1} readOnly />
        {`(${rating.toFixed(1)})`}
      </span>
      <div className="flex flew-row justify-between gap-20 pt-10">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Active Order</span>
              <span>{activeOrder.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Completed Order</span>
              <span>{completedOrder.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Total Earning</span>
              <span>{`RM ${calculateEarning()}`}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-row justify-between pt-10">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 0,
              width: 275,
              height: 128,
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <div className="flex flex-col justify-center gap-2 items-center">
              <span>{`You're ${
                user?.cafe?.status ? "online" : "offline"
              }`}</span>
              <Button
                onClick={changeAvailability}
                variant="contained"
                style={selectedStyle}
              >
                Change Status
              </Button>
            </div>
          </Paper>
        </Box>

        <ActiveOrder />
      </div>
    </div>
  );
}
