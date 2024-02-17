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
  Modal,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import Availability from "./Availability";
import Link from "next/link";
import { Product } from "@/types/Product.type";
import useSession from "@/lib/useSession";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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

export default function ItemManagement() {
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([] as Product[]);
  const router = useRouter();
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
  const user = useSession();
  const store = useStore();

  const getData = async () => {
    store.setRequestLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/product?cafe=${user?.cafe?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Screwed up");
    }
    setProducts(await res.json());
    store.setRequestLoading(false);
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProduct = async (product: Product) => {
    try {
      store.setRequestLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/product/${product.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        toast.success("Item deleted.");
        return getData(); //will refresh and get updated data
      }
    } catch (error) {
      console.error(error);
    } finally {
      store.setRequestLoading(false);
    }
  };
  const changeAvailability = async (product: Product) => {
    if (product.availability) {
      try {
        store.setRequestLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/product/changeUnavailable/${product.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("Item is unavailable now.");
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
          `http://localhost:3000/api/product/changeAvailable/${product.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success("Item is available now.");
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

  function compare(a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  return (
    <div className="flex flex-col justify-center gap-5">
      <div className="justify-center items-center ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Desc</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Keywords</TableCell>
                <TableCell align="center">Product Availability</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.sort(compare).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <img
                      src={`https://res.cloudinary.com/devlognxn/image/upload/v1699984254/${row.img}.jpg`}
                      alt={row.name}
                      width={100}
                      height={100}
                    />
                  </TableCell>
 
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.productCategory}</TableCell>
                  <TableCell align="center">{row.desc}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>

                  <TableCell align="center">
                    {row.keywords.map((keyword) => `${keyword},`)}
                  </TableCell>
                  <TableCell align="center">
                    <Availability availability={row.availability} />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          router.push(
                            `/userCafe/management/item/editItem/${row.id}`
                          );
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Availability">
                      <IconButton
                        onClick={() => {
                          changeAvailability(row);
                        }}
                      >
                        <LoopOutlinedIcon />
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
                            deleteProduct(row);
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
        <Link href={`/userCafe/management/item/newItem`}>
          <Button
            variant="contained"
            style={selectedStyle}
            className=" bg-[#778ccc] text-white"
          >
            Add Item
          </Button>
        </Link>
        {/* <Button
          variant="contained"
          style={selectedStyle}
          className=" bg-[#778ccc] text-white"
        >
          Save
        </Button> */}
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
