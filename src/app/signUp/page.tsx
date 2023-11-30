"use client";
import { Paper, styled } from "@mui/material";
import React from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import Link from "next/link";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 300,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    boxShadow: 20,
  },
}));

const UserSignUp = () => {
  return (
    <div className="h-auto w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <h1 className="text-6xl text-[#778ccc] py-10 justify-center items-center">
          Sign up as?
        </h1>
        <div className="flex flex-row gap-20">
          <Link href={`/userStudent/signUp`}>
            <div className="flex justify-center items-center ">
              <DemoPaper
                className="flex flex-col justify-center items-center "
                square={false}
              >
                <LocalLibraryIcon className="text-9xl text-[#778ccc] " />
                <h1 className="text-2xl text-[#778ccc]">Student</h1>
              </DemoPaper>
            </div>
          </Link>
          <Link href={`/userCafe/signUp`}>
            <div className="flex justify-center items-center ">
              <DemoPaper
                className="flex flex-col justify-center items-center "
                square={false}
              >
                <LocalCafeIcon className="text-9xl text-[#778ccc] " />
                <h1 className="text-2xl text-[#778ccc]">Cafe</h1>
              </DemoPaper>
            </div>
          </Link>

          <Link href={`userRider/signUp`}>
            <div className="flex justify-center items-center ">
              <DemoPaper
                className="flex flex-col justify-center items-center "
                square={false}
              >
                <DirectionsBikeIcon className="text-9xl text-[#778ccc] " />
                <h1 className="text-2xl text-[#778ccc]">Rider</h1>
              </DemoPaper>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
