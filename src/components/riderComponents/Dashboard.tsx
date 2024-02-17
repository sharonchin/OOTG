"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import STATUS from "@/constants/STATUS";
import useSession from "@/lib/useSession";
import toast from "react-hot-toast";
import { Order as OrderType } from "@/types/Order.type";
import useStore from "@/store";
import Loading from "../shared/Loading";

export default function Dashboard() {
  const [online, setOnline] = React.useState(true);

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const handleButtonClick = () => {
    setOnline(!online);
  };

  const user = useSession();
  const [orders, setOrders] = React.useState<OrderType[]>([] as OrderType[]);
  const store = useStore();

  const getOrder = async () => {
    store.setRequestLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/orders?rider=${user?.rider?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setOrders(await res.json());
    store.setRequestLoading(false);
  };

  React.useEffect(() => {
    getOrder();
  }, []);

  const changeAvailability = async () => {
    if (user?.rider?.status) {
      try {
        store.setRequestLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/rider/changeToOffline/${user?.rider?.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("You are offline now.");
          return window.location.reload(); //will refresh and get updated data
        }
      } catch (error) {
        console.error(error);
      } finally {
        store.setRequestLoading(false);
      }
    } else {
      try {
        store.setRequestLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/rider/changeToOnline/${user?.rider?.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("You are online now.");
          return window.location.reload(); //will refresh and get updated data
        }
      } catch (error) {
        console.error(error);
      } finally {
        store.setRequestLoading(false);
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
    <div className="pt-6">
      <span className="flex justify-center font-bold text-2xl ">
        Welcome Back {user?.rider?.firstName}!
      </span>
      <div className="flex flew-row justify-between gap-20 pt-10">
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
              <span>RM {completedOrder.length * 2}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flew-row justify-between gap-20 pt-10">
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
                user?.rider?.status ? "online" : "offline"
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 0,
              width: 275,
              height: 250,
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {activeOrder.length > 0 ? (
              <div className="flex flex-col justify-center gap-2 items-center">
                <h1 className="font-bold text-2xl">Active Order</h1>
                <span>{`Pick Up : ${activeOrder[0]?.cafe.loc.location} - ${activeOrder[0]?.cafe.name}`}</span>
                <span>{`Drop off: ${activeOrder[0]?.deliveryAddress}`}</span>
                <span>{`Note from Student: ${activeOrder[0]?.noteToRider}`}</span>

                <Link href={`/userRider/order/${activeOrder[0].id}`}>
                  <Button variant="contained" style={selectedStyle}>
                    View Your Order
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2 items-center">
                <h1 className="font-bold text-2xl">No Active Orders</h1>
              </div>
            )}
          </Paper>
        </Box>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
