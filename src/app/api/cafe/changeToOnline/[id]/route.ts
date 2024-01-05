import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const cafeId = params.id;
    const cafe = await prisma.cafe.update({
      where: {
        id: cafeId,
      },
      data: {
        status: true,
      },
    });
    return new NextResponse(JSON.stringify(cafe), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
