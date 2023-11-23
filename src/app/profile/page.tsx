import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">My Profile</h1>

        <div className="flex justify-center h-full w-full flex-col items-center gap-2 text-[#778ccc]">
          <div className="w-full">
            <h1>First Name</h1>
            <TextField
              id="First Name"
              variant="outlined"
              fullWidth
              className="bg-[#C2D7F3]/[0.25]"
            />
          </div>
          <div className="w-full">
            <h1>Last Name</h1>
            <TextField
              id="Last Name"
              variant="outlined"
              fullWidth
              className="bg-[#C2D7F3]/[0.25]"
            />
          </div>

          <div className="w-full">
            <h1>Mobile Number</h1>
            <TextField
              id="Mobile Number"
              variant="outlined"
              fullWidth
              className="bg-[#C2D7F3]/[0.25]"
            />
          </div>
          <div className="w-full">
            <h1>Email Address</h1>
            <TextField
              id="Email"
              variant="outlined"
              fullWidth
              className="bg-[#C2D7F3]/[0.25]"
            />
          </div>

          <Button
            variant="outlined"
            fullWidth
            className="normal-case bg-[#778ccc] text-white hover:bg-[#492cb1]"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
