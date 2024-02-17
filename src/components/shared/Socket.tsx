"use client";

import useSession from "@/lib/useSession";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function Socket({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>(undefined);
  useEffect(() => {
    const socket = io("http://localhost:3001");

    setSocket(socket)
  }, []);

  return <>{children}</>;
}
