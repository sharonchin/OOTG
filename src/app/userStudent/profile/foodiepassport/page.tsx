"use client";
import { Box, Button, Grid, TextField, ThemeProvider } from "@mui/material";
import React from "react";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";

const FoodiePassport = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#C2D7F3",
              //   dark: '#0066CC',
            },
          },
        }}
      >
        <h1 className="font-bold text-2xl pt-20">Foodie Passport</h1>

        <Box
          sx={{
            width: 800,
            height: "auto",
            borderRadius: 1,
            bgcolor: "primary.main",
            display: "flex",
            flexDirection: "column",
            p: 5,
            //   '&:hover': {
            //     bgcolor: 'primary.dark',
            //   },
          }}
        >
          <div className="flex flex-row justify-around w-full pb-5">
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
              <AcUnitOutlinedIcon sx={{ fontSize: 50 }} />
            </Box>

            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="flex flex-row justify-around w-full">
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          </div>
        </Box>
        <h1>Complete 1 order to collect 1 stamp ;)</h1>
        <h1>Get 10 stamps to get RM 5 off voucher!</h1>
        <h1>Number of voucher remaining: 1</h1>
      </ThemeProvider>
    </div>
  );
};

export default FoodiePassport;
