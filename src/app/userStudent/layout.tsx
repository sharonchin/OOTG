"use client";

import USERTYPE from "@/constants/USERTYPE";
import useSession from "@/lib/useSession";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();

  return (
    <>
      {user?.userType === ("STUDENT" as USERTYPE) || !user ? (
        <>{children}</>
      ) : (
        <div>Access Denied</div>
      )}
    </>
  );
}
