"use client";
import * as React from "react";
import { Button, Divider, Grid, Modal, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DiscountVoucher from "./DiscountVoucher";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

const NewPromo = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 gap-5">
      <div className=" flex flex-row justify-around items-center bg-[#C2D7F3] p-10 w-full ">
        <FormControl>
          {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Free Delivery Voucher"
              control={<Radio />}
              label="Free Delivery Voucher"
            />

            <FormControlLabel
              value="Discount Voucher"
              control={<Radio />}
              label="Discount Voucher"
            />
          </RadioGroup>
          {value === "Discount Voucher" && <DiscountVoucher />}
        </FormControl>
      </div>

      <div className="flex flex-col justify-center w-1/2 gap-3">
        <Button
          variant="contained"
          style={selectedStyle}
          className=" bg-[#778ccc] text-white"
        >
          Save
        </Button>
        <Button
          variant="contained"
          style={selectedStyle}
          className=" bg-[#778ccc] text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewPromo;
