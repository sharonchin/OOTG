"use client";
import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import CustomizedSwitches from "./Switch";
import Image from "next/image";
import currychicken from "../../public/assets/currychicken.jpg";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import Availability from "./Availability";
import Link from "next/link";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import PromoStatus from "./PromoStatus";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

function createData(
  id: string,
  discountPercentage: number,
  cappedAmount: number,
  status: boolean
) {
  return { id, discountPercentage, cappedAmount, status };
}

const rows = [createData("1", 20, 2, true), createData("2", 10, 2, false)];

export default function PromoManagement() {
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleCheck = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setCheck(!check);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col justify-center gap-5">
      <div className="justify-center items-center ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Promo ID</TableCell>
                <TableCell align="center">Discount Percentage</TableCell>
                <TableCell align="center">Capped Amount</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">
                    {row.discountPercentage}%
                  </TableCell>
                  <TableCell align="center">{row.cappedAmount}</TableCell>
                  <TableCell align="center">
                    <PromoStatus status={row.status} />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Apply">
                      <IconButton>
                        <DoneOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex space-x-4 justify-end">
        <Link href={`/management/promo/newPromo`}>
          <Button
            variant="contained"
            style={selectedStyle}
            className=" bg-[#778ccc] text-white"
          >
            Add Promo
          </Button>
        </Link>
        <Button
          variant="contained"
          style={selectedStyle}
          className=" bg-[#778ccc] text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
