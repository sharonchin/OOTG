import { Chip } from "@mui/material";

interface PromoStatusProps {
  status: boolean;
}

export default function PromoStatus(props: PromoStatusProps) {
  const { status } = props;
  if (status) {
    return <Chip label="Active" color="success" />;
  } else {
    return <Chip label="Inactive" color="error" />;
  }
}
