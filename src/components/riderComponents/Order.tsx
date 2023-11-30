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
import { Tooltip, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function createData(
  id: string,
  created: string,
  orderedby: string,
  pickup: string,
  dropoff: string,
  paymentType: string,
  status: string,
  remark: string
) {
  return {
    id,
    created,
    orderedby,
    pickup,
    dropoff,
    paymentType,
    status,
    remark,
  };
}

const rows = [
  createData(
    "1",
    "2/11/2023",
    "Sharon",
    "KKE - Elemental Cafe",
    "Library",
    "C.O.D",
    "Completed",
    "Meet at lobby"
  ),
  createData(
    "2",
    "2/11/2023",
    "Wayne",
    "KKE - Elemental Cafe",
    "FKI",
    "C.O.D",
    "Canceled",
    "-"
  ),
];

export default function Order() {
  return (
    <div className="pt-20 px-10 w-full h-20 justify-center items-center ">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
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
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.created}</TableCell>
                <TableCell align="center">{row.orderedby}</TableCell>
                <TableCell align="center">{row.pickup}</TableCell>
                <TableCell align="center">{row.dropoff}</TableCell>
                <TableCell align="center">{row.paymentType}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.remark}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Set as paid">
                    <IconButton>
                      <PaidOutlinedIcon />
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
