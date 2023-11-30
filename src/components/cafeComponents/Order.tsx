"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Order } from "@/types/Order.type";
import useSession from "@/lib/useSession";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function OrderPage() {
  const user = useSession();
  const [orders, setOrders] = React.useState<Order[]>([] as Order[]);
  const router = useRouter();

  const getOrder = async () => {
    const res = await fetch(
      `http://localhost:3000/api/orders?cafe=${user?.cafe?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setOrders(await res.json());
  };

  React.useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="px-5 w-full h-20 justify-center items-center ">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order Created</TableCell>
              <TableCell align="center">Order Type</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {moment(row.createdAt).format("DD/MM/YYYY hh:mma")}
                </TableCell>
                <TableCell align="center">{row.deliveryOption}</TableCell>
                <TableCell align="center">{row.cafe.loc.location}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      router.push(`/order/${row.id}`);
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                  {/* <IconButton>
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
