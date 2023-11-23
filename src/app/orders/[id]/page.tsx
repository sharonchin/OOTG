"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import EastIcon from "@mui/icons-material/East";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button, Grid, Modal, TextField } from "@mui/material";
import CustomizedSwitches from "@/components/Switch";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Link from "next/link";

type OrderLine = {
  id: number;
  p1: string;
  quantity: number;
  price1: string;
  loc: string;
};

const Order: OrderLine = {
  id: 1,
  p1: "Laksa",
  price1: "RM5",
  quantity: 1,
  loc: "KKE",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const selectedStyle = {
  backgroundColor: "#778CCC",
};

const OrderDetails = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        pt: 10,
        justifyContent: "center",
        alignContent: "center",
        "& > :not(style)": {
          m: 1,
          pt: 10,
          width: 600,
          height: 600,
        },
      }}
    >
      <Paper elevation={1}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-bold text-2xl">Your order is confirmed!</h1>
          <h1>#0001</h1>
          <h1>8:30am-8:45am</h1>
          <div className="flex flex-row gap-6">
            <SelfImprovementIcon />
            <EastIcon />
            <DirectionsRunIcon />
            <EastIcon />
            <DirectionsBikeIcon />
            <EastIcon />
            <WhereToVoteIcon />
          </div>
          <h1 className="underline underline-offset-4">Order Summary</h1>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid container>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>
                  {Order.quantity} x {Order.p1}
                </h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>{Order.price1}</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>Subtotal:</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>{Order.price1}</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>Delivery Fee:</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>0</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>Offer:</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1>0</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1 className="text-xl font-bold">Total</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                xs={6}
              >
                <h1 className="text-xl font-bold">RM5</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  pl: 10,
                }}
                xs={12}
              >
                <h1>Delivered to: {Order.loc}</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  pl: 10,
                }}
                xs={12}
              >
                <h1>Note to Rider: wait me outside library</h1>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  pr: 10,
                }}
                xs={12}
              >
                <CustomizedSwitches
                  label="Order Received"
                  handleOpen={handleOpen}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  pl: 10,
                }}
                xs={12}
              >
                <Link target="_blank" href={`https://wa.me/${"60149750619"}`}>
                  <Button variant="contained" style={selectedStyle}>
                    <WhatsAppIcon />
                    <h1 className="pl-2">Chat with Cafe</h1>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1>Rate your order</h1>
            <div className="flex flex-row justify-center gap-10">
              <SentimentVeryDissatisfiedIcon />
              <SentimentSatisfiedIcon />
              <SentimentSatisfiedAltIcon />
              <SentimentVerySatisfiedIcon />
            </div>
            <div className="flex justify-center pt-5">
              <TextField
                id="filled-multiline-static"
                label="Leave your review here"
                multiline
                rows={4}
                variant="filled"
                fullWidth
              />
            </div>
            <Link href={`/`}>
              <div className="flex justify-center pt-5">
                <Button variant="contained" style={selectedStyle}>
                  Submit
                </Button>
              </div>
            </Link>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderDetails;
