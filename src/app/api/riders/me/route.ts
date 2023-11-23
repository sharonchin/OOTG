import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST,PUT",
//   "Access-Control-Allow-Headers":
//     "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
//   "Access-Control-Allow-Credentials": "false",
// };

// export async function OPTIONS(req: NextRequest) {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

export async function GET(req: NextRequest) {
  const riderId = req.cookies.get("X-USER-ID")?.value;

  if (!riderId) {
    return getErrorResponse(
      401,
      "ahhhh You are not logged in, please provide token to gain access"
    );
  }

  const rider = await prisma.rider.findUnique({ where: { id: riderId } });

  return NextResponse.json({
    status: "success",
    data: { rider: { ...rider, password: undefined } },
  });
}
