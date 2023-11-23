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
import DeliveryOption from "@/components/DeliveryOption";
import PaymentType from "@/components/PaymentType";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { Payment } from "@mui/icons-material";
import Order from "../orders/[id]/page";

function createData(
  product: string,
  unitPrice: number,
  quantity: number,
  price: number
) {
  return { product, unitPrice, quantity, price };
}

const rows = [
  createData("Laksa", 12, 1, 12),
  createData("Curry Chicken", 10, 1, 10),
];

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

const steps = [
  "Select Delivery Address",
  "Select Payment Type",
  "Stripe",
  "Order Sent",
];

const getStepContent = (
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
      return <div>Stripe</div>;
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

export default function Cart() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleReset();
  };
  const router = useRouter();
  const handleFinish = () => {
    router.push(`/orders/1`);
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

  const handleNext = () => {
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
              <TableCell>Product</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.product}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.product}
                </TableCell>
                <TableCell align="center">{row.unitPrice}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={4}>
        <Grid item xs={6} sx={{ alignItems: "center" }}>
          <div className="flex flex-col pt-5 gap-5 w-1/2">
            <TextField label="Note to Cafe" />
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
            <h1>Subtotal: RM22.00</h1>
            <h1>Shipping Fee: RM2.00</h1>
            <h1>Discount Applied: RM0.80</h1>
            <Divider />
            <h1>TOTAL : RM23.20</h1>
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
        >
          <Box sx={style}>
            <h1>Make Payment</h1>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
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
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Success</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(
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
                        activeStep === steps.length - 1
                          ? handleFinish
                          : handleNext
                      }
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
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

// const CartPage = () =>{
//     return(
//         <div>Cart Page</div>
//     )
// }

// export default CartPage
