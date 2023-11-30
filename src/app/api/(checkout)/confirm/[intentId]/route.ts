import STATUS from "@/constants/STATUS";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { intentId: string } }
) => {
  const { intentId } = params;

  try {
    const order = await prisma.order.update({
      where: {
        intentId: intentId,
      },
      data: { status: "PREPARING" as STATUS },
    });
    return new NextResponse(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
