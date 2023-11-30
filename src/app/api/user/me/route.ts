import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "ahhhh You are not logged in, please provide token to gain access"
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      student: true,
      cafe: true,
      rider: true,
    },
  });
  console.log(userId);
  return NextResponse.json({
    status: "success",
    data: { user: user },
  });
}
