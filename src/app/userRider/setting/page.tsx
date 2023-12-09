"use client";

import { apiLogoutRider } from "@/lib/api-requests";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import Loading from "@/components/shared/Loading";

const selectedStyle = {
  backgroundColor: "#778CCC",
};

export default function Setting() {
  const store = useStore();
  const router = useRouter();

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutRider();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  };
  return (
    <div className="h-3/4 w-full flex justify-center pt-20">
      <div className="flex justify-center h-full w-1/4 flex-col items-center gap-2 text-[#778ccc]">
        <Button variant="contained" style={selectedStyle} fullWidth>
          Remove Business Account
        </Button>
        <Button
          variant="contained"
          style={selectedStyle}
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
