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
import CustomizedSwitches from "@/components/studentComponents/Switch";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Link from "next/link";
import toast from "react-hot-toast";
import { Order } from "@/types/Order.type";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";
import { io } from "socket.io-client";

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

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon className="text-4xl" color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon className="text-4xl" color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon className="text-4xl" color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon className="text-4xl" color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon className="text-4xl" color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const OrderDetails = ({ params }: { params: { id: string } }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const store = useStore();
  const [order, setOrder] = React.useState<Order>({} as Order);
  const [rating, setRating] = React.useState<number | null>(3);
  const [review, setReview] = React.useState<string>("");

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/orders/${params.id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setOrder(await res.json());
  };

  const updateToComplete = async () => {
    const res = await fetch(
      `http://localhost:3000/api/orders/updateToComplete/${params.id}`,
      {
        method: "PUT",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed Up");
    }

    toast.success("Status Updated Successfully");
    return handleOpen();
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [subtotal, setSubtotal] = React.useState<number>(0);
  const calculateSubtotal = () => {
    let x: number = 0;
    order?.products?.forEach((product) => {
      x += product.amount;
    });
    // x += order.deliveryFee as number;
    setSubtotal(x);
  };

  React.useEffect(() => {
    calculateSubtotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const [socket, setSocket] = React.useState<any>(undefined);
  React.useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("update_user", (update) => {
      if (update) {
        getData();
      }
    });

    setSocket(socket);
  }, []);

  const handleCreateRating = async () => {
    try {
      store.setRequestLoading(true);
      const res = await fetch("http://localhost:3000/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          review: review ? review : null,
          cafeId: order.cafeId,
          orderId: order.id,
          studentId: order.studentId,
        }),
      });
      if (res) {
        toast.success("Thank you for your feedback!");
        return router.push("/userStudent");
      }
    } catch (err) {
      console.log(err);
    } finally {
      store.setRequestLoading(false);
    }
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
          height: "auto",
          pb: 10,
        },
      }}
    >
      <Paper elevation={1}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="font-bold text-2xl">Your order is confirmed!</h1>
            <h1 className="text-xl font-bold">#{order?.id?.slice(-5)}</h1>
            <h1>8:30am-8:45am</h1>

            {order.deliveryOption === "DELIVERY" ? (
              <div className="flex flex-row gap-6">
                <SelfImprovementIcon
                  className={
                    order.status === "PREPARING"
                      ? "text-4xl animate-pulse"
                      : "text-4xl"
                  }
                  color={order.status === "PREPARING" ? "success" : "inherit"}
                />
                <EastIcon />
                <DirectionsRunIcon
                  className={
                    order.status === "PICKUP"
                      ? "text-4xl animate-pulse"
                      : "text-4xl"
                  }
                  color={order.status === "PICKUP" ? "success" : "inherit"}
                />
                <EastIcon />
                <DirectionsBikeIcon
                  className={
                    order.status === "DELIVERING"
                      ? "text-4xl animate-pulse"
                      : "text-4xl"
                  }
                  color={order.status === "DELIVERING" ? "success" : "inherit"}
                />
                <EastIcon />
                <WhereToVoteIcon
                  className="text-4xl"
                  color={order.status === "COMPLETED" ? "success" : "inherit"}
                />
              </div>
            ) : (
              <div className="flex flex-row gap-6">
                <SelfImprovementIcon
                  className={
                    order.status === "PREPARING"
                      ? "text-4xl animate-pulse"
                      : "text-4xl"
                  }
                  color={order.status === "PREPARING" ? "success" : "inherit"}
                />
                <EastIcon />
                <DirectionsRunIcon
                  className={
                    order.status === "PICKUP"
                      ? "text-4xl animate-pulse"
                      : "text-4xl"
                  }
                  color={order.status === "PICKUP" ? "success" : "inherit"}
                />
                <EastIcon />
                <WhereToVoteIcon
                  className="text-4xl"
                  color={order.status === "COMPLETED" ? "success" : "inherit"}
                />
              </div>
            )}

            <h1 className="underline underline-offset-4">Order Summary</h1>
          </div>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid container>
              {order?.products?.map((row) => (
                <>
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
                      {row.quantity} x {row.name}
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
                    <h1>{row.amount}</h1>
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
                    <h1>{row.noteToCafe}</h1>
                  </Grid>
                </>
              ))}
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
                <h1>{subtotal}</h1>
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
                <h1>{order?.deliveryFee}</h1>
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
                <h1>
                  {Number(subtotal) +
                    Number(order?.deliveryFee) -
                    order?.totalPrice}
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
                <h1 className="text-xl font-bold">RM{order?.totalPrice}</h1>
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
                <h1>Pick up at: {order?.cafe?.loc.location}</h1>
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
                <h1>Note to Rider: {order?.noteToRider}</h1>
              </Grid>
              {(order.deliveryOption === "DELIVERY" &&
                order.status === "DELIVERING") ||
              (order.deliveryOption === "PICKUP" &&
                order.status === "PICKUP") ? (
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
                    handleOpen={updateToComplete}
                  />
                </Grid>
              ) : null}
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  pl: 10,
                  pt: 3,
                }}
                xs={12}
              >
                {order.deliveryOption === "DELIVERY" &&
                order.status === "DELIVERING" ? (
                  <Link
                    target="_blank"
                    href={`https://wa.me/${order?.rider?.phoneNo}`}
                  >
                    <Button variant="contained" style={selectedStyle}>
                      <WhatsAppIcon />
                      <h1 className="pl-2">Chat with Rider</h1>
                    </Button>
                  </Link>
                ) : (
                  <Link
                    target="_blank"
                    href={`https://wa.me/${order?.cafe?.phoneNo}`}
                  >
                    <Button variant="contained" style={selectedStyle}>
                      <WhatsAppIcon />
                      <h1 className="pl-2">Chat with Cafe</h1>
                    </Button>
                  </Link>
                )}
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
              <StyledRating
                name="highlight-selected-only"
                defaultValue={3}
                IconContainerComponent={IconContainer}
                getLabelText={(value: number) => customIcons[value].label}
                highlightSelectedOnly
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div className="flex justify-center pt-5">
              <TextField
                id="filled-multiline-static"
                label="Leave your review here"
                multiline
                rows={4}
                variant="filled"
                fullWidth
                value={review}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setReview(event.target.value);
                }}
              />
            </div>
            <div className="flex justify-center pt-5">
              <Button
                variant="contained"
                style={selectedStyle}
                onClick={handleCreateRating}
              >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {store.requestLoading && <Loading />}
    </Box>
  );
};

export default OrderDetails;
