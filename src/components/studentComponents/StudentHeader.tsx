"use client";
import ootg from "./../../../public/assets/ootg.png";
import Image from "next/image";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import Loading from "../shared/Loading";
import useStore from "@/store";
import { apiLogoutStudent } from "@/lib/api-requests";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/cart";
import GradingIcon from "@mui/icons-material/Grading";

export default function Header() {
  const store = useStore();
  const router = useRouter();
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutStudent();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("halo");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="fixed w-full h-20 z-[100] bg-[#778CCC]">
      <div className="flex justify-between items-center w-full h-full px-20">
        <div>
          <Link href="/userStudent">
            <Image src={ootg} alt="ootg logo" />
          </Link>
        </div>

        <div>
          <ul className="flex">
            <Link href="/userStudent">
              <li className="ml-10 text-lg text-white">Home</li>
            </Link>

            <Link href="/userStudent/cafe">
              <li className="ml-10 text-lg text-white">Find a Cafe</li>
            </Link>

            <Link href="/userStudent/faq">
              <li className="ml-10 text-lg text-white">FAQs</li>
            </Link>
          </ul>
        </div>

        <div className="flex">
          <Link href={`/userStudent/orders`}>
            <Tooltip title="Orders">
              <IconButton color="secondary">
                <GradingIcon className=" text-white" />
              </IconButton>
            </Tooltip>
          </Link>

          <Link href={`/userStudent/cart`}>
            <Tooltip title="Cart">
              <IconButton color="secondary" aria-label="add to shopping cart">
                <Badge
                  badgeContent={totalItems}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  color="error"
                >
                  <ShoppingBagOutlinedIcon className=" text-white" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>

          <Link href={`/userStudent/profile/foodiepassport`}>
            <Tooltip title="Foodie Passport">
              <IconButton color="secondary">
                <StarBorderIcon className=" text-white" />
              </IconButton>
            </Tooltip>
          </Link>

          <IconButton onClick={handleClick}>
            <PersonOutlineOutlinedIcon className=" text-white" />
          </IconButton>
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link href={`/userStudent/profile`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {store.requestLoading && <Loading />}
    </div>
  );
}
