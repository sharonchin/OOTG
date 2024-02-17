import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const riderId = params.id;
    const rider = await prisma.rider.update({
      where: {
        id: riderId,
      },
      data: {
        status: true,
      },
    });
    return new NextResponse(JSON.stringify(rider), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
