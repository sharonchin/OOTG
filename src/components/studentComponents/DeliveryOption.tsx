import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Location } from "@/types/Cafe.type";

interface DeliveryProps {
  address: string;
  setAddress: (i: string) => void;
  note: string;
  setNote: (i: string) => void;
}

export default function DeliveryOption({
  address,
  setAddress,
  note,
  setNote,
}: DeliveryProps) {
  // const [address, selectAddress] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAddress(event.target.value);
  };

  const [locations, setLocations] = useState<Location[]>([] as Location[]);

  //get data from localhost 3000
  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/location", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Something went wrong!");
    }

    setLocations(await res.json());
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function compare(a: any, b: any) {
    if (a.location < b.location) {
      return -1;
    }
    if (a.location > b.location) {
      return 1;
    }
    return 0;
  }

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Address to deliver
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={address}
          onChange={handleChange}
          label="Address"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {locations.sort(compare).map((loc) => (
            <MenuItem id={loc.id} value={loc.location}>
              <em>{loc.location}</em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNote(event.target.value);
          }}
          value={note}
          id="standard-basic"
          label="Note to rider"
          variant="standard"
        />
      </Box>
    </div>
  );
}
