"use client";
import { InputAdornment, TextField } from "@mui/material";
import chef from "./../../public/assets/chef.png";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import useSession from "@/lib/useSession";

export default function Banner() {
  const user = useSession();

  return (
    <div className="pt-20 pl-10 bg-[#C2D7F3] h-auto w-full flex justify-around items-center">
      {user?.student ? (
        <TextField
          id="input-with-icon-textfield"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "white" }}
          variant="filled"
        />
      ) : null}
      <Image src={chef} alt="chef logo" className="p-20" />
    </div>
  );
}
