"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function Dashboard() {
  const [online, setOnline] = React.useState(true);

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const handleButtonClick = () => {
    setOnline(!online);
  };

  return (
    <div>
      <span className="flex justify-center font-bold text-2xl ">
        Welcome Back Rider A!
      </span>
      <div className="flex flew-row justify-between gap-20 pt-10">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Completed Order</span>
              <span>12</span>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Total Earning</span>
              <span>Rm200</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flew-row justify-between gap-20 pt-10">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 0,
              width: 275,
              height: 128,
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <div className="flex flex-col justify-center gap-2 items-center">
              <span>{`You're ${online ? "online" : "offline"}`}</span>
              <Button
                onClick={handleButtonClick}
                variant="contained"
                style={selectedStyle}
              >
                Change Status
              </Button>
            </div>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 0,
              width: 275,
              height: 250,
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <div className="flex flex-col justify-center gap-2 items-center">
              <h1 className="font-bold text-2xl">Active Order</h1>
              <span>Pick Up : KKE - Elemental Cafe</span>
              <span>Drop off: Library</span>
              <span>Note from Student: Meet at lobby</span>

              <Link href={`/order/1`}>
                <Button variant="contained" style={selectedStyle}>
                  View Your Order
                </Button>
              </Link>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
}
