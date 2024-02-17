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
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { Tooltip, IconButton, TablePagination } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useRouter } from "next/navigation";
import { Order } from "@/types/Order.type";
import useSession from "@/lib/useSession";
import moment from "moment";
import useStore from "@/store";
import Loading from "../shared/Loading";

export default function Order() {
  const user = useSession();
  const router = useRouter();
  const [orders, setOrders] = React.useState<Order[]>([] as Order[]);
  const [page, setPage] = React.useState(0);
  const store = useStore();

  const getOrder = async () => {
    store.setRequestLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/orders?rider=${user?.rider?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setOrders(await res.json());
    store.setRequestLoading(false);
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
    () => orders?.slice(page * 8, page * 8 + 8),
    [getOrder, page]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="pt-20 px-10 w-full h-20 justify-center items-center ">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Ordered by</TableCell>
              <TableCell align="center">Pick Up Point</TableCell>
              <TableCell align="center">Drop Off Point </TableCell>
              <TableCell align="center">Payment Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Remarks</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.sort(compare).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {moment(row.createdAt).format("DD/MM/YYYY hh:mma")}
                </TableCell>
                <TableCell align="center">{`${row.student.firstName} ${row.student.lastName}`}</TableCell>
                <TableCell align="center">{`${row.cafe.loc.location}, ${row.cafe.name}`}</TableCell>
                <TableCell align="center">{row.deliveryAddress}</TableCell>
                <TableCell align="center">{row.paymentType}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.noteToRider}</TableCell>

                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton
                      onClick={() => {
                        router.push(`/userRider/order/${row.id}`);
                      }}
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Set as paid">
                    <IconButton
                      onClick={() => {
                        router.push(`/userRider/order/${row.id}`);
                      }}
                    >
                      <PaidOutlinedIcon />
                    </IconButton>
                  </Tooltip> */}
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
      {store.requestLoading && <Loading />}
    </div>
  );
}
