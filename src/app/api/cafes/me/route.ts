import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cafeId = req.cookies.get("X-USER-ID")?.value;

  if (!cafeId) {
    return getErrorResponse(
      401,
      "ahhhh You are not logged in, please provide token to gain access"
    );
  }

  const cafe = await prisma.cafe.findUnique({ where: { id: cafeId } });

  return NextResponse.json({
    status: "success",
    data: { cafe: { ...cafe, password: undefined } },
  });
}
