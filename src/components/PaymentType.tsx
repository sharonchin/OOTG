import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface PaymentTypeProps{
    paymentValue:number,
    setPaymentValue:(i:number)=>void
}
export default function PaymentType({paymentValue,setPaymentValue}:PaymentTypeProps) {
    const handleRadioChange = (event:any) => {
        if (event.target.value === "cash") {
          setPaymentValue(0); // Skip to the fourth step
        } else {
          setPaymentValue(1); // Proceed to the next step
        }
      };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Payment Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Other"
        name="radio-buttons-group"
      >
        <FormControlLabel  control={<Radio value="cash" onChange={handleRadioChange}/>} label="Cash On Delivery" />
        <FormControlLabel  control={<Radio value="online" onChange={handleRadioChange}/>} label="Cards and Online Banking" />
      </RadioGroup>
    </FormControl>
  );
}