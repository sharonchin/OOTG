"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
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
  const [page, setPage] = React.useState(0);

  const getOrder = async () => {
    const res = await fetch(
      `http://localhost:3000/api/orders?student=${user?.student?.id}`,
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

  function compare(a: any, b: any) {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  }

  const visibleRows = React.useMemo(
    () => orders?.sort(compare).slice(page * 8, page * 8 + 8),
    [getOrder, page]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="px-5 w-full h-3/4 justify-center items-center pt-10">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Order Created</TableCell>
              <TableCell align="center">Order Type</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">#{row.id.slice(-5)}</TableCell>
                <TableCell align="center">
                  {moment(row.createdAt).format("DD/MM/YYYY hh:mma")}
                </TableCell>
                <TableCell align="center">{row.deliveryOption}</TableCell>
                <TableCell align="center">{row.cafe.loc.location}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      router.push(`/userStudent/orders/${row.id}`);
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
        <TablePagination
          count={orders.length}
          rowsPerPage={8}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </div>
  );
}
