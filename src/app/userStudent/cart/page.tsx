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
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useCartStore } from "@/cart";
import { useEffect } from "react";
import useSession from "@/lib/useSession";
import PAYMENT_TYPE from "@/constants/PAYMENT_TYPE";
import PayPage from "@/components/studentComponents/Pay";
import { compare } from "bcryptjs";
import { Promo } from "@/types/Promo.type";
import PROMO_TYPE from "@/constants/PROMO_TYPE";
import DELIVERY_OPTION from "@/constants/DELIVERY_OPTION";
import { io } from "socket.io-client";
import { FilteredRider } from "@/types/Rider.type";
import toast from "react-hot-toast";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const selectedStyle = {
  backgroundColor: "#778CCC",
};

export default function Cart() {
  const store = useStore();
  const [selectedButton, setSelectedButton] = React.useState<DELIVERY_OPTION>(
    "DELIVERY" as DELIVERY_OPTION
  ); // State to manage the selected button

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const notSelectedStyle = {
    backgroundColor: "transparent",
  };

  const handleButtonClick = (button: DELIVERY_OPTION) => {
    setSelectedButton(button === selectedButton ? selectedButton : button);
    selectDeliveryOption(button);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
    handleReset();
  };
  const [shippingFee, setShippingFee] = React.useState(2);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [order, setOrder] = React.useState<Order>({} as Order);
  const [note, setNote] = React.useState<string>("-");
  const [address, setAddress] = React.useState<string>("ANJUNG SISWA");
  const [promos, setPromos] = React.useState<Promo[]>([] as Promo[]);
  const [riders, setRiders] = React.useState<FilteredRider[]>(
    [] as FilteredRider[]
  );
  const [promo, setPromo] = React.useState<Promo>({} as Promo);
  const [applied, setApplied] = React.useState<boolean>(false);
  const [foodiePassport, setFoodiePassport] = React.useState<Promo[]>(
    [] as Promo[]
  );
  const [socket, setSocket] = React.useState<any>(undefined);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    setSocket(socket);
  }, []);

  const {
    products,
    totalItems,
    totalPrice,
    deliveryOption,
    selectDeliveryOption,
    removeFromCart,
    reset,
  } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const stepsPickUp = ["Select Payment Type", "Stripe", "Order Sent"];

  const stepsDelivery = [
    "Select delivery address",
    "Select Payment Type",
    "Stripe",
    "Order Sent",
  ];

  const getData = async () => {
    store.setRequestLoading(true);
    const res1 = await fetch(
      `http://localhost:3000/api/promo?cafe=${products[0]?.cafeId}&status=true`,
      {
        cache: "no-store",
      }
    );
    const res2 = await fetch(
      `http://localhost:3000/api/foodiePassport?student=${user?.student?.id}&active=true`,
      {
        cache: "no-store",
      }
    );
    const res3 = await fetch(`http://localhost:3000/api/rider?active=true`, {
      cache: "no-store",
    });

    if (!res1.ok || !res2.ok || !res3.ok) {
      throw new Error("Something went wrong!");
    }

    setPromos(await res1.json());
    setFoodiePassport(await res2.json());
    setRiders(await res3.json());
    store.setRequestLoading(false);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (deliveryOption === "PICKUP") {
      setShippingFee(0);
    } else {
      setShippingFee(2);
    }
  }, [deliveryOption]);

  const handlePromoChange = (event: SelectChangeEvent) => {
    setPromo(JSON.parse(event.target.value));
  };

  const getStepContentDelivery = (
    step: number,
    setActiveStep: (i: number) => void,
    paymentValue: number,
    setPaymentValue: (i: number) => void
  ) => {
    switch (step) {
      case 0:
        return (
          <DeliveryOption
            address={address}
            setAddress={setAddress}
            note={note}
            setNote={setNote}
          />
        );
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
            <Button
              variant="contained"
              style={selectedStyle}
              onClick={() => {
                router.push(`/userStudent/pay/${order?.id}`);
              }}
            >
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
    handleSocket();
    router.push(`/userStudent/orders/${order?.id}`);
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const [paymentValue, setPaymentValue] = React.useState(1);
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleTest = () => {
    console.log("halo");
    handleNextPickUp();
  };
  const handleNextDelivery = () => {
    if (activeStep === 1 && paymentValue === 0) {
      setActiveStep(3);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleNextPickUp = () => {
    if (activeStep === 0 && paymentValue === 0) {
      setActiveStep(2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setActiveStep(0);
    setPaymentValue(1);
  };

  const calculateTotal = () => {
    if (promo.type === ("DISCOUNT_VOUCHER" as PROMO_TYPE) && applied) {
      if (totalPrice >= promo.min_spend_amount) {
        if ((totalPrice * promo.discount) / 100 < promo.capped_amount) {
          return (
            totalPrice -
            (totalPrice * promo.discount) / 100 +
            Number(shippingFee)
          );
        } else {
          return totalPrice - promo.capped_amount + Number(shippingFee);
        }
      } else {
        return totalPrice + Number(shippingFee);
      }
    } else if (promo.type === ("DELIVERY_VOUCHER" as PROMO_TYPE) && applied) {
      return totalPrice;
    } else if (promo.type === ("FOODIE_PASSPORT" as PROMO_TYPE) && applied) {
      if (totalPrice + Number(shippingFee) < promo.capped_amount) {
        return 0;
      } else {
        return totalPrice - (promo.amount as number) + Number(shippingFee);
      }
    } else {
      return totalPrice + Number(shippingFee);
    }
  };

  const handleSocket = () => {
    socket.emit("receive_order", order);
  };

  const handlePickUpCheckout = async () => {
    try {
      if (promo.type === ("FOODIE_PASSPORT" as PROMO_TYPE)) {
        const foodiePassportId = foodiePassport[0]?.id;
        const setInactive = await fetch(
          `http://localhost:3000/api/foodiePassport/setToInactive/${foodiePassportId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice: calculateTotal() as number,
          products,
          status: "DRAFT" as STATUS,
          studentId: user?.student?.id,
          cafeId: products[0]?.cafeId,
          deliveryOption,
          deliveryFee: 0,
          paymentType:
            paymentValue === 0
              ? ("CASH" as PAYMENT_TYPE)
              : ("ONLINE" as PAYMENT_TYPE),
        }),
      });

      setOrder(await res.json());
      reset();
      handleNextPickUp();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeliveryCheckout = async () => {
    if (riders.length < 1) {
      return toast.error(
        "Sorry, there are no available riders now. Please try again later."
      );
    }
    try {
      if (promo.type === ("FOODIE_PASSPORT" as PROMO_TYPE)) {
        const foodiePassportId = foodiePassport[0]?.id;
        const setInactive = await fetch(
          `http://localhost:3000/api/foodiePassport/setToInactive/${foodiePassportId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice: calculateTotal() as number,
          products,
          status: "DRAFT" as STATUS,
          studentId: user?.student?.id,
          cafeId: products[0]?.cafeId,
          deliveryAddress: address,
          noteToRider: note,
          deliveryOption,
          deliveryFee:
            promo.type === ("DELIVERY_VOUCHER" as PROMO_TYPE) ? 0 : 2,
          paymentType:
            paymentValue === 0
              ? ("CASH" as PAYMENT_TYPE)
              : ("ONLINE" as PAYMENT_TYPE),
        }),
      });
      setOrder(await res.json());
      reset();
      handleNextDelivery();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-20 flex flex-col justify-center">
      <div className="flex flex-row justify-between items-center pb-10">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => handleButtonClick("DELIVERY" as DELIVERY_OPTION)}
            variant={deliveryOption === "DELIVERY" ? "contained" : "outlined"}
            style={
              deliveryOption === "DELIVERY" ? selectedStyle : notSelectedStyle
            }
          >
            Delivery
          </Button>
          <Button
            onClick={() => handleButtonClick("PICKUP" as DELIVERY_OPTION)}
            variant={deliveryOption === "PICKUP" ? "contained" : "outlined"}
            style={
              deliveryOption === "PICKUP" ? selectedStyle : notSelectedStyle
            }
          >
            Pick Up
          </Button>
        </ButtonGroup>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/userStudent" className="[#778CCC]">
            <h1>Home</h1>
          </Link>

          <h1>Checkout</h1>
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
      {products.length > 0 ? (
        <div className="flex w-full justify-end py-5">
          <Link href={`/userStudent/cafe/${products[0]?.cafeId}`}>
            <h1 className="text-[#778CCC] pl-2 font-semibold">
              Click to add more item
            </h1>
          </Link>
        </div>
      ) : null}
      <Grid container spacing={4}>
        <Grid item xs={6} sx={{ alignItems: "center" }}>
          <div className="flex flex-col pt-5 gap-5 w-1/2">
            <h1>You have available voucher,do you wish to apply?</h1>
            <div className="flex flex-row gap-10">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Voucher to apply
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={JSON.stringify(promo)}
                  label="Voucher"
                  onChange={handlePromoChange}
                >
                  {foodiePassport.length < 1 ? null : (
                    <MenuItem
                      id={"foodiePassport"}
                      value={JSON.stringify(foodiePassport[0])}
                    >
                      <em>Foodie Passport - RM5 off</em>
                    </MenuItem>
                  )}
                  {promos.map((row) => (
                    <MenuItem id={row.id} value={JSON.stringify(row)}>
                      <em>
                        {row.type === ("DELIVERY_VOUCHER" as PROMO_TYPE)
                          ? `Free Delivery`
                          : `${row.discount}% off with minimum spend of RM${row.min_spend_amount} capped at RM${row.capped_amount}`}
                      </em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                style={selectedStyle}
                onClick={() => setApplied(true)}
              >
                APPLY
              </Button>
            </div>
          </div>
        </Grid>

        <Grid item xs={6} sx={{ justifyContent: "center", display: "flex" }}>
          <div className="flex flex-col pt-5 gap-5">
            <h1>
              Subtotal ({totalItems} items) - RM{totalPrice}
            </h1>

            {applied ? (
              <>
                <h1>
                  Shipping Fee: RM
                  {promo.type === ("FOODIE_PASSPORT" as PROMO_TYPE)
                    ? shippingFee
                    : promo.type === ("DELIVERY_VOUCHER" as PROMO_TYPE)
                    ? "0"
                    : shippingFee}
                </h1>
                <h1>
                  Voucher Applied:{" "}
                  {promo.type === ("FOODIE_PASSPORT" as PROMO_TYPE)
                    ? `RM${promo.amount} off, min spend RM${promo.min_spend_amount}, capped RM${promo.capped_amount}`
                    : promo.type === ("DELIVERY_VOUCHER" as PROMO_TYPE)
                    ? `Free Delivery`
                    : `${promo.discount}% off, min spend RM${promo.min_spend_amount}, capped RM${promo.capped_amount}`}
                </h1>

                <Divider />
                <h1>
                  TOTAL : RM
                  {calculateTotal()}
                </h1>
              </>
            ) : (
              <>
                <h1>Shipping Fee: RM{shippingFee}</h1>
                <h1>Voucher Applied: - </h1>

                <Divider />
                <h1>TOTAL : RM{calculateTotal()}</h1>
              </>
            )}
            <Button
              variant="contained"
              style={selectedStyle}
              onClick={handleOpen}
              disabled={products.length < 1}
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
                        disabled={activeStep === 2 || activeStep === 3}
                        onClick={handleCancel}
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button
                        disabled={activeStep === 2}
                        onClick={
                          activeStep === stepsDelivery.length - 1
                            ? handleFinish
                            : activeStep === 1
                            ? handleDeliveryCheckout
                            : handleNextDelivery
                        }
                      >
                        {activeStep === stepsPickUp.length - 1
                          ? "Finish"
                          : "Next"}
                      </Button>
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
                      disabled={activeStep === 1 || activeStep === 2}
                      onClick={handleCancel}
                      sx={{ mr: 1 }}
                    >
                      Cancel
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      disabled={activeStep === 1}
                      onClick={
                        activeStep === stepsPickUp.length - 1
                          ? handleFinish
                          : activeStep === 0
                          ? handlePickUpCheckout
                          : handleNextPickUp
                      }
                    >
                      {activeStep === stepsPickUp.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Modal>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
