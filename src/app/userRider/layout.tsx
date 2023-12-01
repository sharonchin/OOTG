"use client";

import USERTYPE from "@/constants/USERTYPE";
import useSession from "@/lib/useSession";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();

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
