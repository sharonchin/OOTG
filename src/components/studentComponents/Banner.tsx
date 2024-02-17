"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import chef from "./../../../public/assets/chef.png";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import useSession from "@/lib/useSession";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const user = useSession();
  const [search, setSearch] = React.useState<string>("-");
  const router = useRouter();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearch("");
      router.push(`/userStudent/searchResult?search=${search}`);
    }
  };
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
                <IconButton
                  onClick={() => {
                    setSearch("");
                    router.push(`/userStudent/searchResult?search=${search}`);
                  }}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            onKeyDown: handleKeyDown,
          }}
          sx={{ bgcolor: "white", width: 1 / 5 }}
          variant="filled"
        />
      ) : null}
      <Image src={chef} alt="chef logo" className="p-20" />
    </div>
  );
}
