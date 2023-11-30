import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DeliveryOption(){
    const [address, selectAddress] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      selectAddress(event.target.value);
    };
 
  return (
    <div>
       <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-standard-label">Address to deliver</InputLabel>
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
          <MenuItem value={10}>Library</MenuItem>
          <MenuItem value={20}>FKI</MenuItem>
          <MenuItem value={30}>FMSP</MenuItem>
        </Select>
      </FormControl>

      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Note to rider" variant="standard" />
    </Box>

    </div>
  );
}



