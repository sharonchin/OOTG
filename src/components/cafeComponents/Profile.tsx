"use client";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Link from "next/link";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

// const [loc, setLoc] = React.useState('');

// const handleChange = (event: SelectChangeEvent) => {
//   setLoc(event.target.value as string);
// };

const selectedStyle = {
  backgroundColor: "#778CCC",
};

export default function Profile() {
  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-4xl pb-5">Cafe Information</h1>
        <div className="flex justify-center h-full w-full flex-col items-center gap-2 text-[#778ccc]">
          <TextField
            id="Cafe name"
            label="Cafe name"
            variant="outlined"
            fullWidth
            className="bg-[#C2D7F3]/[0.25]"
          />
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            fullWidth
            className="bg-[#C2D7F3]/[0.25]"
          />
          <TextField
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="bg-[#C2D7F3]/[0.25]"
          />

          <TextField
            id="Contact Number"
            label="Contact Number"
            variant="outlined"
            fullWidth
            className="bg-[#C2D7F3]/[0.25]"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={loc}
              label="Location"
              //   onChange={handleChange}
            >
              <MenuItem value={"KKE"}>KKE</MenuItem>
              <MenuItem value={"KKTM"}>KKTM</MenuItem>
              <MenuItem value={"Library"}>Library</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="Opening hour"
            label="Opening hour"
            variant="outlined"
            fullWidth
            className="bg-[#C2D7F3]/[0.25]"
          />
          <TextField
            id="Joined Date"
            label="Joined Date"
            variant="outlined"
            fullWidth
            className="bg-[#C2D7F3]/[0.25]"
          />

          <span>Currently rating: </span>

          <Button
            variant="contained"
            style={selectedStyle}
            fullWidth
            className="normal-case bg-[#778ccc] text-white"
          >
            Save
          </Button>
          <div className="flex justify-center items-center flex-row pt-10"></div>
        </div>
      </div>
    </div>
  );
}
