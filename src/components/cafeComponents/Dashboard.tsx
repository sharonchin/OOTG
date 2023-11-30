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
import Order from "./Order";
import useSession from "@/lib/useSession";
import { Order as OrderType } from "@/types/Order.type";
import STATUS from "@/constants/STATUS";

export default function Dashboard() {
  const [online, setOnline] = React.useState(true);

  const selectedStyle = {
    backgroundColor: "#778CCC",
  };

  const handleButtonClick = () => {
    setOnline(!online);
  };

  const user = useSession();
  const [orders, setOrders] = React.useState<OrderType[]>([] as OrderType[]);

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

  const activeOrder = orders.filter(
    (order) => order.status !== ("COMPLETED" as STATUS)
  );

  const completedOrder = orders.filter(
    (order) => order.status === ("COMPLETED" as STATUS)
  );

  return (
    <div>
      <span className="flex justify-center font-bold text-2xl ">
        Welcome Back {user?.cafe?.name}!
      </span>
      <div className="flex flew-row justify-between gap-20 pt-10">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Active Order</span>
              <span>{activeOrder.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">Completed Order</span>
              <span>{completedOrder.length}</span>
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

      <div className="flex flex-row justify-between pt-10">
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

        <Order />
      </div>

      {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    </div>
  );
}
