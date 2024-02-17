"use client";
import { Box, Button, Grid, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import { Order } from "@/types/Order.type";
import useSession from "@/lib/useSession";
import { Promo } from "@/types/Promo.type";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";

const FoodiePassport = () => {
  const totalBoxes = 10;
  const chop: any[] = [];
  const [completedOrders, setCompletedOrders] = useState<Order[]>(
    [] as Order[]
  );
  const [activeFoodieVoucher, setActiveFoodieVoucher] = useState<Promo[]>(
    [] as Promo[]
  );
  const orders = completedOrders.length % 10;
  const user = useSession();
  const store = useStore();

  const boxes = Array.from({ length: totalBoxes }, (_, i) => (
    <Box
      sx={{
        width: 100,
        height: 100,
        backgroundColor: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {i < orders ? <AcUnitOutlinedIcon sx={{ fontSize: 50 }} /> : null}
    </Box>
  ));

  const Chop = () => {
    for (let i = 0; i < 10; i++) {
      chop.push(
        <Grid
          item
          xs={2}
          key={i}
          sx={{
            width: 100,
            height: 100,
            backgroundColor: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {i < orders ? <AcUnitOutlinedIcon sx={{ fontSize: 50 }} /> : <></>}
        </Grid>
      );
    }

    return chop;
  };

  const row1 = boxes.slice(0, 5);
  const row2 = boxes.slice(5);

  const getData = async () => {
    store.setRequestLoading(true);
    const completeOrders = await fetch(
      `http://localhost:3000/api/orders?student=${user?.student?.id}&completed=true`,
      {
        cache: "no-store",
      }
    );

    const foodiePassport = await fetch(
      `http://localhost:3000/api/foodiePassport?student=${user?.student?.id}&active=true`,
      {
        cache: "no-store",
      }
    );
    if (!completeOrders.ok || !foodiePassport.ok) {
      throw new Error("Screwed up");
    }
    setCompletedOrders(await completeOrders.json());
    setActiveFoodieVoucher(await foodiePassport.json());
    store.setRequestLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#C2D7F3",
            },
          },
        }}
      >
        <h1 className="font-bold text-2xl pt-20 pb-10">Foodie Passport</h1>

        <Box
          sx={{
            width: 800,
            height: "auto",
            borderRadius: 1,
            bgcolor: "primary.main",
            display: "flex",
            flexDirection: "column",
            p: 5,
          }}
        >
          {/* {boxes} */}
          <div className="flex flex-row justify-around w-full pb-5">{row1}</div>
          <div className="flex flex-row justify-around w-full pb-5">{row2}</div>
        </Box>
        <div className="flex pt-6 flex-col">
          <h1>Complete 1 order to collect 1 stamp ;)</h1>
          <h1>Get 10 stamps to get RM 5 off voucher!</h1>
          <h1 className="font-bold">
            Number of voucher remaining: {activeFoodieVoucher.length}
          </h1>
        </div>
      </ThemeProvider>
      {store.requestLoading && <Loading />}
    </div>
  );
};

export default FoodiePassport;
