import AVAILABILITY from "@/constants/AVAILABILITY";
import { Chip } from "@mui/material";

interface ProductAvailabilityProps {
  availability: boolean;
}

export default function Availability(props: ProductAvailabilityProps) {
  const { availability } = props;
  switch (availability) {
    case true:
      return <Chip label="Available" color="success" />;
    case false:
      return <Chip label="Unavailable" color="error" />;

    default:
      return null;
  }
}
