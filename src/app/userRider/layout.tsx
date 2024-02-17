"use client";

import USERTYPE from "@/constants/USERTYPE";
import useSession from "@/lib/useSession";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();
  const router = useRouter();
  const [socket, setSocket] = useState<any>(undefined);
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("notify_rider", (id, order) => {
      if (id === user?.rider?.id) {
        toast.custom(
          <div className="flex flex-col p-10 bg-white rounded-lg">
            <h1 className="text-2xl pb-5">🎉 You have order</h1>
            <Button
              variant="contained"
              onClick={() => {
                toast.remove();
                router.push(`/userRider/order/${order.id}`);
              }}
              style={{ backgroundColor: "#778CCC" }}
            >
              Go to order
            </Button>
          </div>,
          {
            duration: Infinity,
            position: "bottom-right",
            id: "notification",
          }
        );
      }
    });

    setSocket(socket);
  }, []);

  return (
    <>
      {user?.userType === ("RIDER" as USERTYPE) || !user ? (
        <>{children}</>
      ) : (
        <div>Access Denied</div>
      )}
    </>
  );
}
