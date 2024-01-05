"use client";
import { InputAdornment, TextField } from "@mui/material";
import chef from "./../../../public/assets/chef.png";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import useSession from "@/lib/useSession";
import Link from "next/link";
import React from "react";

export default function Banner() {
  const user = useSession();
  const [search, setSearch] = React.useState<string>("-");

  return (
    <div className="pt-20 bg-[#C2D7F3] h-auto w-full flex justify-between items-center px-20">
      {user?.student ? (
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          value={search}
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Link href={`/userStudent/searchResult?search=${search}`}>
                  <SearchOutlinedIcon />
                </Link>
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "white", width: 1 / 5 }}
          variant="filled"
        />
      ) : null}
      <Image src={chef} alt="chef logo" className="p-20" />
    </div>
  );
}
