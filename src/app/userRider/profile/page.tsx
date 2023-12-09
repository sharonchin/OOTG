"use client";

import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Link from "next/link";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import FormInput from "@/components/shared/FormInput";

export default function Profile() {
  return (
    <div className="h-auto w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">My Profile</h1>

        <div className="flex justify-center h-full w-full flex-col items-center gap-2 text-[#778ccc]">
          <form className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5">
            <FormInput label="First Name" name="firstName" />
            <FormInput label="Last Name" name="lastName" />
            <FormInput label="Email" name="email" />
            <FormInput label="Password" name="password" />
            <FormInput label="Contact Number" name="contactNo" />
            <div>
              <label
                htmlFor={"deliveryMode"}
                className="block text-ct-blue-600 mb-3"
              >
                Delivery Mode
              </label>
              <select className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]">
                <option value="" selected disabled hidden>
                  Select one
                </option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="foot">By foot</option>
              </select>
            </div>
            <FormInput label="Vehicle number (if any)" name="vehicleNo" />

            <Button
              variant="outlined"
              fullWidth
              className="normal-case bg-[#778ccc] text-white hover:bg-[#492cb1]"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
