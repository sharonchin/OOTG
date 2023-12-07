"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import DeliveryOption from "@/components/studentComponents/DeliveryOption";
import PaymentType from "@/components/studentComponents/PaymentType";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import STATUS from "@/constants/STATUS";
import { Order } from "@/types/Order.type";

import {
  Breadcrumbs,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { Payment } from "@mui/icons-material";
import { useCartStore } from "@/cart";
import { useEffect } from "react";
import useSession from "@/lib/useSession";
import PAYMENT_TYPE from "@/constants/PAYMENT_TYPE";
import PayPage from "@/components/studentComponents/Pay";

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

export default function Cart() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
    handleReset();
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [order, setOrder] = React.useState<Order>({} as Order);
  const [note, setNote] = React.useState<string>("-");

  const stepsPickUp = ["Select Payment Type", "Stripe", "Order Sent"];

  const stepsDelivery = [
    "Select delivery address",
    "Select Payment Type",
    "Stripe",
    "Order Sent",
  ];

  const getStepContentDelivery = (
    step: number,
    setActiveStep: (i: number) => void,
    paymentValue: number,
    setPaymentValue: (i: number) => void
    // handleNext:()=> void,
    // handleBack:()=> void,
  ) => {
    switch (step) {
      case 0:
        return <DeliveryOption />;
      case 1:
        return (
          <PaymentType
            paymentValue={paymentValue}
            setPaymentValue={setPaymentValue}
          />
        );
      case 2:
        return (
          <div className="flex justify-center items-center pt-4">
            <Button variant="contained" style={selectedStyle}>
              Proceed to payment gateway
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center pt-5">
            <CheckCircleIcon sx={{ fontSize: 80 }} color="primary" />
            <h1>Success</h1>
          </div>
        );
      default:
        <div>Why you here bro? jalan la</div>;
    }
  };

  const getStepContentPickUp = (
    step: number,
    setActiveStep: (i: number) => void,
    paymentValue: number,
    setPaymentValue: (i: number) => void
    // handleNext:()=> void,
    // handleBack:()=> void,
  ) => {
    switch (step) {
      case 0:
        return (
          <PaymentType
            paymentValue={paymentValue}
            setPaymentValue={setPaymentValue}
          />
        );
      case 1:
        return (
          <div className="flex justify-center items-center pt-5">
            <Button
              variant="contained"
              style={selectedStyle}
              onClick={() => {
                router.push(`/userStudent/pay/${order?.id}`);
              }}
            >
              Proceed to Payment Gateway
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center pt-5">
            <CheckCircleIcon sx={{ fontSize: 80 }} color="primary" />
            <h1>Success</h1>
          </div>
        );
      default:
        <div>Why you here bro? jalan la</div>;
    }
  };

  const router = useRouter();
  const user = useSession();

  const handleFinish = () => {
    router.push(`/userStudent/orders/${order?.id}`);
  };
  const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set<number>());

  const [paymentValue, setPaymentValue] = React.useState(1);
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  const handleTest = () => {
    console.log("halo");
    handleNextPickUp();
  };
  const handleNextDelivery = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    if (activeStep === 1 && paymentValue === 0) {
      setActiveStep(3);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // setSkipped(newSkipped);
  };

  const handleNextPickUp = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    if (activeStep === 0 && paymentValue === 0) {
      setActiveStep(2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
    setPaymentValue(1);
  };

  const {
    products,
    totalItems,
    totalPrice,
    deliveryOption,
    removeFromCart,
    reset,
  } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice,
          products,
          status: "DRAFT" as STATUS,
          studentId: user?.student?.id,
          cafeId: products[0]?.cafeId,
          deliveryOption,
          paymentType:
            paymentValue === 0
              ? ("CASH" as PAYMENT_TYPE)
              : ("ONLINE" as PAYMENT_TYPE),
        }),
      });
      setOrder(await res.json());
      console.log(order);
      reset();
      handleNextPickUp();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-20 flex flex-col justify-center">
      <div className="flex flex-row justify-center items-center">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/" className="[#778CCC]">
            <h1>Home</h1>
          </Link>

          <h1>Checkout</h1>
          {/* <Typography color="text.primary">KKTM</Typography> */}
        </Breadcrumbs>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Note to rider</TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  <img
                    src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${row.img}.jpg`}
                    alt={row.name}
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">RM{row.price}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">RM {row.amount}</TableCell>
                <TableCell align="center">{row.noteToCafe}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        removeFromCart(row);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={4}>
        <Grid item xs={6} sx={{ alignItems: "center" }}>
          <div className="flex flex-col pt-5 gap-5 w-1/2">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <h1>You have available voucher,do you wish to apply?</h1>
            <div className="flex flex-row gap-10">
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <Button variant="contained" style={selectedStyle}>
                APPLY
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} sx={{ justifyContent: "center", display: "flex" }}>
          <div className="flex flex-col pt-5 gap-5">
            <h1>Subtotal ({totalItems} items)</h1>
            <h1>RM({totalPrice})</h1>
            <h1>Shipping Fee: RM2.00</h1>
            <h1>Discount Applied: -</h1>
            <Divider />
            <h1>TOTAL : RM{totalPrice + 2}</h1>
            <Button
              variant="contained"
              style={selectedStyle}
              onClick={handleOpen}
            >
              Make Payment
            </Button>
          </div>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEscapeKeyDown
        >
          <Box sx={style}>
            <h1>Make Payment</h1>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {deliveryOption === "DELIVERY"
                  ? stepsDelivery.map((label, index) => {
                      const stepProps: { completed?: boolean } = {};
                      const labelProps: {
                        optional?: React.ReactNode;
                      } = {};
                      // if (isStepOptional(index)) {
                      //   labelProps.optional = (
                      //     <Typography variant="caption">Optional</Typography>
                      //   );
                      // }
                      // if (isStepSkipped(index)) {
                      //   stepProps.completed = false;
                      // }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })
                  : stepsPickUp.map((label, index) => {
                      const stepProps: { completed?: boolean } = {};
                      const labelProps: {
                        optional?: React.ReactNode;
                      } = {};
                      // if (isStepOptional(index)) {
                      //   labelProps.optional = (
                      //     <Typography variant="caption">Optional</Typography>
                      //   );
                      // }
                      // if (isStepSkipped(index)) {
                      //   stepProps.completed = false;
                      // }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
              </Stepper>
              {deliveryOption === "DELIVERY" ? (
                activeStep === stepsDelivery.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Success</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContentDelivery(
                      activeStep,
                      setActiveStep,
                      paymentValue,
                      setPaymentValue
                    )}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                      {/* <Link href={`/orders/${Order.id}`}> */}

                      <Button
                        onClick={
                          activeStep === stepsDelivery.length - 1
                            ? handleFinish
                            : handleNextDelivery
                        }
                      >
                        {activeStep === stepsDelivery.length - 1
                          ? "Finish"
                          : "Next"}
                      </Button>
                      {/* </Link> */}
                    </Box>
                  </React.Fragment>
                )
              ) : activeStep === stepsPickUp.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Success</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContentPickUp(
                    activeStep,
                    setActiveStep,
                    paymentValue,
                    setPaymentValue
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                    {/* <Link href={`/orders/${Order.id}`}> */}

                    <Button
                      onClick={
                        activeStep === stepsPickUp.length - 1
                          ? handleFinish
                          : activeStep === 0
                          ? handleCheckout
                          : handleNextPickUp
                      }
                    >
                      {activeStep === stepsPickUp.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                    {/* </Link> */}
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
