import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const orderId = params.id;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "PICKUP",
      },
    });
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
