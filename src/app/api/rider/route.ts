import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const active = searchParams.get("active");
  try {
    const rider = await prisma.rider.findMany({
      where: {
        ...(active ? { status: true } : {}),
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
