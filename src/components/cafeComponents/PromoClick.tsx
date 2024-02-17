"use client";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
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
import { Promo } from "@/types/Promo.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSession from "@/lib/useSession";
import useStore from "@/store";
import Loading from "../shared/Loading";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PromoManagement() {
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(true);
  const [promos, setPromos] = React.useState<Promo[]>([] as Promo[]);
  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const handleCheck = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setCheck(!check);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const user = useSession();
  const store = useStore();

  const getData = async () => {
    store.setRequestLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/promo?cafe=${user?.cafe?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setPromos(await res.json());
    store.setRequestLoading(false);
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatus = async (promo: Promo) => {
    if (promo.status) {
      try {
        store.setRequestLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/promo/changeNotApplied/${promo.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("Promo is not applied now.");
          store.setRequestLoading(false);
          return getData(); //will refresh and get updated data
        }
      } catch (error) {
        console.error(error);
      } finally {
        store.setRequestLoading(false);
      }
    } else {
      try {
        store.setRequestLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/promo/changeApplied/${promo.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("Promo is applied now.");
          store.setRequestLoading(false);
          return getData(); //will refresh and get updated data
        }
      } catch (error) {
        console.error(error);
      } finally {
        store.setRequestLoading(false);
      }
    }
  };

  const deletePromo = async (promo: Promo) => {
    try {
      store.setRequestLoading(true);
      const res = await fetch(`http://localhost:3000/api/promo/${promo.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        toast.success("Promo deleted.");
        store.setRequestLoading(false);
        return getData(); //will refresh and get updated data
      }
    } catch (error) {
      console.error(error);
    } finally {
      store.setRequestLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <div className="justify-center items-center ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Promo Name</TableCell>
                <TableCell align="center">Promo Type</TableCell>
                <TableCell align="center">Discount Percentage</TableCell>
                <TableCell align="center">Min Spend</TableCell>
                <TableCell align="center">Capped Amount</TableCell>

                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promos.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="center">{row.discount}%</TableCell>
                  <TableCell align="center">RM{row.min_spend_amount}</TableCell>
                  <TableCell align="center">RM{row.capped_amount}</TableCell>
                  <TableCell align="center">
                    <PromoStatus status={row.status} />
                  </TableCell>
                  <TableCell align="center">
                    {/* <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          router.push(
                            `/userCafe/management/promo/editPromo/${row.id}`
                          );
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Apply">
                      <IconButton
                        onClick={() => {
                          changeStatus(row);
                        }}
                      >
                        <DoneOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          handleOpen();
                        }}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={modalBoxStyle}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Are you sure you want to delete?
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This action cannot be undone.
                      </Typography>
                      <div className="w-full flex justify-end mt-5">
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => {
                            deletePromo(row);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex space-x-4 justify-end">
        <Link href={`/userCafe/management/promo/newPromo`}>
          <Button
            variant="contained"
            style={selectedStyle}
            className=" bg-[#778ccc] text-white"
          >
            Add Promo
          </Button>
        </Link>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
