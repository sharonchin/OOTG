"use client";

import USERTYPE from "@/constants/USERTYPE";
import useSession from "@/lib/useSession";

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();

  return (
    <>
      {user?.userType === ("CAFE" as USERTYPE) || !user ? (
        <>{children}</>
      ) : (
        <div>Access Denied</div>
      )}
    </>
  );
}
